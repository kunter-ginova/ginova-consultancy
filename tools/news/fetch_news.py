#!/usr/bin/env python3
"""Daily sector headlines for the GiNOVA sites. Output: news.json (headline, source, link, time only; no article text).
Run:  python3 fetch_news.py [out.json]     Needs only the Python standard library.
Safety: the output is replaced only when the new run looks healthy (at least MIN_TOTAL items and at least 3 non-empty fields);
otherwise the previous file is kept and the script exits with status 3, so a broken feed never blanks the site.
"health" in the output lists how many items each source gave, so a silent source is visible."""
import urllib.request,xml.etree.ElementTree as ET,sys,json,re,email.utils,datetime,html
FEEDS={
 'food':[('Food Dive','https://www.fooddive.com/feeds/news/'),('AgFunder News','https://agfundernews.com/feed'),('Just Food','https://www.just-food.com/feed/'),('Feed Strategy','https://www.feedstrategy.com/rss'),
         ('Food Business News','https://www.foodbusinessnews.net/rss/articles'),('Food Safety News','https://www.foodsafetynews.com/feed/')],
 'engineering':[('IEEE Spectrum','https://spectrum.ieee.org/feeds/feed.rss'),('Manufacturing Dive','https://www.manufacturingdive.com/feeds/news/'),('Engineering.com','https://www.engineering.com/feed/'),
         ('eeNews Europe','https://www.eenewseurope.com/en/feed/'),('Interesting Engineering','https://interestingengineering.com/feed'),('New Atlas','https://newatlas.com/index.rss'),
         ('TechXplore Engineering','https://techxplore.com/rss-feed/engineering-news/'),('Phys.org Technology','https://phys.org/rss-feed/technology-news/')],
 'decision':[('MIT Technology Review','https://www.technologyreview.com/feed/'),('MIT Sloan Management Review','https://sloanreview.mit.edu/feed/'),('Harvard Business School Working Knowledge','https://hbswk.hbs.edu/rss/'),('Wharton Knowledge','https://knowledge.wharton.upenn.edu/feed/'),('The Register','https://www.theregister.com/software/ai_ml/headlines.atom'),
         ('TechCrunch AI','https://techcrunch.com/category/artificial-intelligence/feed/'),('Wired AI','https://www.wired.com/feed/tag/ai/latest/rss'),('The Economist Business','https://www.economist.com/business/rss.xml'),
         ('AWS Machine Learning','https://aws.amazon.com/blogs/machine-learning/feed/'),('Ars Technica AI','https://arstechnica.com/ai/feed/'),('The Verge AI','https://www.theverge.com/rss/ai-artificial-intelligence/index.xml'),
         ('Stratechery','https://stratechery.com/feed/'),('MIT News AI','https://news.mit.edu/rss/topic/artificial-intelligence2'),('Hugging Face Blog','https://huggingface.co/blog/feed.xml'),('OpenAI News','https://openai.com/news/rss.xml'),('Google AI Blog','https://blog.google/technology/ai/rss/')],
 'media':[('Music Business Worldwide','https://www.musicbusinessworldwide.com/feed/'),('Creative Review','https://www.creativereview.co.uk/feed/'),('Variety','https://variety.com/feed/'),('Deadline','https://deadline.com/feed/'),('CDM','https://cdm.link/feed/'),
         ('Billboard','https://www.billboard.com/feed/'),('Pitchfork News','https://pitchfork.com/feed/feed-news/rss'),('Consequence','https://consequence.net/feed/'),('Stereogum','https://www.stereogum.com/feed/'),('Guardian Music','https://www.theguardian.com/music/rss'),
         ('NME','https://www.nme.com/feed'),('Rolling Stone Music','https://www.rollingstone.com/music/feed/'),('Music Ally','https://musically.com/feed/'),('Hollywood Reporter','https://www.hollywoodreporter.com/feed/'),('IndieWire','https://www.indiewire.com/feed/'),
         ('Animation Magazine','https://www.animationmagazine.net/feed/'),('Creative Bloq','https://www.creativebloq.com/feeds/all')],
}

# ---- 2026-11-07: two new fields (AI industry; Geopolitics and geoeconomics) and more sources for the old ones ----
_AI_MOVE={'TechCrunch AI','Wired AI','Ars Technica AI','The Verge AI','OpenAI News','Hugging Face Blog','Google AI Blog','MIT News AI'}   # AI-only feeds leave Decision Systems so no headline sits in two fields
_moved=[f for f in FEEDS['decision'] if f[0] in _AI_MOVE]
FEEDS['decision']=[f for f in FEEDS['decision'] if f[0] not in _AI_MOVE]
FEEDS['ai']=_moved+[('The Decoder','https://the-decoder.com/feed/'),('MarkTechPost','https://www.marktechpost.com/feed/'),('Import AI','https://importai.substack.com/feed'),('Nvidia Blog','https://blogs.nvidia.com/feed/'),
  ('SemiAnalysis','https://semianalysis.com/feed/'),('Latent Space','https://www.latent.space/feed'),('Simon Willison','https://simonwillison.net/atom/everything/'),('AI Business','https://aibusiness.com/rss.xml'),
  ('Towards Data Science','https://towardsdatascience.com/feed'),('BAIR Blog','https://bair.berkeley.edu/blog/feed.xml'),('The Register AI','https://www.theregister.com/software/ai_ml/headlines.atom'),
  ("Tom's Hardware",'https://www.tomshardware.com/feeds/all'),('ServeTheHome','https://www.servethehome.com/feed/')]
FEEDS['world']=[('BBC World','http://feeds.bbci.co.uk/news/world/rss.xml'),('Guardian World','https://www.theguardian.com/world/rss'),('Al Jazeera','https://www.aljazeera.com/xml/rss/all.xml'),('The Diplomat','https://thediplomat.com/feed/'),
  ('War on the Rocks','https://warontherocks.com/feed/'),('Foreign Affairs','https://www.foreignaffairs.com/rss.xml'),('Al-Monitor','https://www.al-monitor.com/rss'),('Economist Finance','https://www.economist.com/finance-and-economics/rss.xml'),
  ('Economist International','https://www.economist.com/international/rss.xml'),('Daily Sabah','https://www.dailysabah.com/rssFeed/business'),('Supply Chain Dive','https://www.supplychaindive.com/feeds/news/'),('FreightWaves','https://www.freightwaves.com/news/feed'),
  ('gCaptain','https://gcaptain.com/feed/'),('Splash247','https://splash247.com/feed/'),('Politico Europe','https://www.politico.eu/feed/'),('Euractiv','https://www.euractiv.com/feed/'),('NPR World','https://feeds.npr.org/1004/rss.xml'),
  ('Atlantic Council','https://www.atlanticcouncil.org/feed/'),('Eurasianet','https://eurasianet.org/rss'),('SCMP Economy','https://www.scmp.com/rss/92/feed')]
FEEDS['decision']+=[('McKinsey','https://www.mckinsey.com/insights/rss'),('CIO Dive','https://www.ciodive.com/feeds/news/'),('Cybersecurity Dive','https://www.cybersecuritydive.com/feeds/news/'),('HR Dive','https://www.hrdive.com/feeds/news/'),('Banking Dive','https://www.bankingdive.com/feeds/news/'),
  ('Harvard Law Forum on Corporate Governance','https://corpgov.law.harvard.edu/feed/'),('Farnam Street','https://fs.blog/feed/'),('NBER','https://www.nber.org/rss/new.xml'),('Marginal Revolution','https://marginalrevolution.com/feed'),('Schneier on Security','https://www.schneier.com/feed/atom/'),
  ('Krebs on Security','https://krebsonsecurity.com/feed/'),('Fast Company','https://www.fastcompany.com/latest/rss'),('Fortune','https://fortune.com/feed/'),('Our World in Data','https://ourworldindata.org/atom.xml')]
FEEDS['food']+=[('Feedstuffs','https://www.feedstuffs.com/rss.xml'),('Packaging Dive','https://www.packagingdive.com/feeds/news/'),('Grocery Dive','https://www.grocerydive.com/feeds/news/'),('Restaurant Dive','https://www.restaurantdive.com/feeds/news/')]
FEEDS['engineering']+=[('Electronics Weekly','https://www.electronicsweekly.com/feed/'),('The Robot Report','https://www.therobotreport.com/feed/'),('Utility Dive','https://www.utilitydive.com/feeds/news/'),('Energy Storage News','https://www.energy-storage.news/feed/')]
FEEDS['media']+=[('Complete Music Update','https://completemusicupdate.com/feed/'),('Cartoon Brew','https://www.cartoonbrew.com/feed'),('Create Digital Music','https://cdm.link/feed/')]
# Relevance: general feeds must match their field's words (specialist feeds are kept as they come).
KEYS={
 'decision':re.compile(r'\b(AI|A\.I\.|LLM|agent|agents|model|models|data|analytics|decision|forecast|strategy|enterprise|risk|board|governance|automation|compute|chip|cyber|regulat|workforce|productivity|software)',re.I),
 'media':re.compile(r'(\bdeals?\b|acqui|streaming|\blabels?\b|rights|licens|catalog|royalt|copyright|\bAI\b|production|studio|festival|campaign|\bbrand|advertis|soundtrack|\bscore\b|\bsync\b|animation|VFX|design|creative|award|box office|\bseries\b|\bfilms?\b|documentary|streamer|netflix|disney|spotify|platform|market|industry|business)',re.I),
 'engineering':re.compile(r'(manufactur|factory|factories|\bplants?\b|industrial|industry|robot|automation|process|supply chain|machine|equipment|engineer|energy|batter|materials?|production|3D.print|additive|semiconductor|\bchips?\b|drone|aerospace|aviation|marine|\bships?\b|infrastructure|construction|\bgrid\b|hydrogen|\bAI\b|digital twin)',re.I),
}
GENERAL={'decision':{'MIT Technology Review','The Register','The Economist Business','Wired AI','TechCrunch AI','Ars Technica AI','The Verge AI','OpenAI News','Google AI Blog','MIT News AI'},
         'engineering':{'New Atlas','TechXplore Engineering','Phys.org Technology','Interesting Engineering'},
         'media':{'Hollywood Reporter','Variety','Deadline','NME','Consequence','Billboard','Stereogum','Pitchfork News','Rolling Stone Music','Guardian Music','IndieWire'}}
# 2026-11-12 (Kunter Bey): keep all publishers; headline + link sends readers to them. Remove one only if it asks.
PER_SOURCE=8      # most headlines one source may give a field; CAP overrides it for noisy feeds
CAP={'OpenAI News':5,'Hugging Face Blog':5,'Google AI Blog':3,'AWS Machine Learning':5,'Ars Technica AI':5,'The Verge AI':5,'TechCrunch AI':7,'Wired AI':5,'The Economist Business':5,'MIT News AI':4,'Stratechery':4,'MIT Technology Review':6,'The Register':5,
     'New Atlas':8,'TechXplore Engineering':7,'Phys.org Technology':6,'Interesting Engineering':6,'Variety':5,'Deadline':5,'Stereogum':5,'Pitchfork News':6,'Guardian Music':5,'NME':5,'Rolling Stone Music':5,'Consequence':5,'Billboard':5,'Music Ally':5,'Hollywood Reporter':5,'IndieWire':5,'Animation Magazine':5,'Creative Bloq':5,'Creative Review':5,'Music Business Worldwide':6,'CDM':5}
LANE_MAX={'food':70,'engineering':65,'decision':65,'media':55}   # a pool of about 250 relevant headlines; the desk draws the 150 highest scoring and offers "show all"

KEYS['ai']=re.compile(r"(\bAI\b|A\.I\.|LLM|\bGPU|Nvidia|OpenAI|Anthropic|Gemini|Claude|GPT|model|agent|chip|data cent|compute|inference|robot|semiconductor|machine learning|neural|\bTPU|foundation)",re.I)
KEYS['world']=re.compile(r"(trade|tariff|sanction|export|import|embargo|\boil\b|\bgas\b|energy|\bwar\b|ceasefire|treaty|summit|china|russia|ukraine|turk|iran|israel|gaza|nato|\bEU\b|\bUS-|currency|dollar|inflation|central bank|econom|shipping|red sea|strait|supply chain|minerals|rare earth|semiconductor|geopolit|diplomat|alliance|brics|opec|debt|\bG7\b|\bG20\b|imf|world bank)",re.I)
GENERAL['ai']={"Tom's Hardware",'ServeTheHome','The Register AI','AI Business','Towards Data Science','Nvidia Blog','Simon Willison','TechCrunch AI','Wired AI','The Verge AI','Ars Technica AI','MIT News AI','Google AI Blog','OpenAI News'}
GENERAL['world']={'BBC World','Guardian World','Al Jazeera','NPR World','Daily Sabah','Politico Europe','Euractiv','SCMP Economy','Eurasianet','Al-Monitor','Atlantic Council','Economist International','Splash247','gCaptain','FreightWaves'}
GENERAL['decision']|={'Fast Company','Fortune','Marginal Revolution','Banking Dive','HR Dive','Our World in Data','NBER','Krebs on Security','Schneier on Security'}
GENERAL['engineering']|={'Energy Storage News','Utility Dive','Electronics Weekly'}
CAP.update({'Energy Storage News':5,'Economist International':5,'Economist Finance':5,'BBC World':5,'Guardian World':5,'Al Jazeera':5,'NPR World':4,'SCMP Economy':4,'Euractiv':5,'Atlantic Council':5,'Tom\'s Hardware':5,'Simon Willison':3,'Towards Data Science':4,'AI Business':5,'The Register AI':5})
LANE_MAX.update({'ai':60,'world':60})
CAP.update({'McKinsey':5,'Fast Company':4,'Fortune':4,'Marginal Revolution':4,'NBER':4,'Farnam Street':3})
MIN_TOTAL=80
UA='Mozilla/5.0 (compatible; GiNOVA-news/1.0; +https://ginova.org)'
A='{http://www.w3.org/2005/Atom}'
def when(s):
    if not s:return None
    try:d=email.utils.parsedate_to_datetime(s)
    except Exception:
        try:d=datetime.datetime.fromisoformat(s.strip().replace('Z','+00:00'))
        except Exception:return None
    return d if d.tzinfo else d.replace(tzinfo=datetime.timezone.utc)
def txt(e):return html.unescape(re.sub(r'\s+',' ',(e.text or '').strip())) if e is not None else ''
def pull(name,url):
    out=[]
    try:root=ET.fromstring(urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':UA}),timeout=15).read())
    except Exception as ex:print('skip',name,type(ex).__name__,file=sys.stderr);return out
    for it in root.findall('.//item')+root.findall('.//'+A+'entry'):
        t=txt(it.find('title')) or txt(it.find(A+'title'))
        l=txt(it.find('link'))
        if not l:
            le=it.find(A+'link');l=le.get('href') if le is not None else ''
        d=when(txt(it.find('pubDate')) or txt(it.find(A+'updated')) or txt(it.find(A+'published')) or txt(it.find('{http://purl.org/dc/elements/1.1/}date')))
        if t and l.startswith('http') and d:out.append({'t':t,'s':name,'u':l,'d':d})
    return out
now=datetime.datetime.now(datetime.timezone.utc);res={};health={}
for sec,lst in FEEDS.items():
    items=[]
    for n,u in lst:
        got=pull(n,u);health[n]=len(got);items+=got
    items=[i for i in items if now-datetime.timedelta(days=7)<=i['d']<=now+datetime.timedelta(hours=2)]
    if sec in KEYS:items=[i for i in items if i['s'] not in GENERAL.get(sec,()) or KEYS[sec].search(i['t'])]   # general feeds must match the field's words
    items.sort(key=lambda i:i['d'],reverse=True)
    seen=set();per={};keep=[]
    for i in items:   # dedupe by normalised title, at most 3 per source so no single feed dominates
        k=re.sub(r'[^a-z0-9]+',' ',i['t'].lower()).strip()[:60]
        if k in seen or per.get(i['s'],0)>=CAP.get(i['s'],PER_SOURCE):continue
        seen.add(k);per[i['s']]=per.get(i['s'],0)+1;keep.append({'t':i['t'],'s':i['s'],'u':i['u'],'d':i['d'].isoformat()})
        if len(keep)==LANE_MAX[sec]:break
    res[sec]=keep
res['updated']=now.isoformat()
res['health']=health
out=sys.argv[1] if len(sys.argv)>1 else 'news.json'
total=sum(len(v) for k,v in res.items() if k in FEEDS);lanes=sum(1 for k in FEEDS if res[k])
if total<MIN_TOTAL or lanes<3:
    print('UNHEALTHY run: %d items, %d fields. Previous %s kept.'%(total,lanes,out),file=sys.stderr);sys.exit(3)
import os
tmp=out+'.tmp';json.dump(res,open(tmp,'w'),ensure_ascii=False,indent=1);os.replace(tmp,out)
for sname,v in res.items():
    if sname in FEEDS:print(sname,len(v),'items, newest',v[0]['d'][:16] if v else '-')
print('total',total,'| silent sources:',[n for n,c in health.items() if c==0] or 'none')
