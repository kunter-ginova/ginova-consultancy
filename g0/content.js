/* Public demonstration copy. Historical reconstruction prepared 22 October 2026. */
window.G0DATA = {
  tr: {
    trace: [
      {
        label: '01 · Kaynak',
        title: 'Bir sayı. Önce neyi ölçtüğünü soruyoruz.',
        body: 'EDF, 12 Mayıs 2016’da nominal £18 milyar bütçe ve gerektiğinde kullanılabilecek ek %15 özkaynak kapasitesi açıkladı. Bu, yatırımcının tarihli beyanıdır.',
        source: 'https://www.edf.fr/en/the-edf-group/dedicated-sections/journalists/all-press-releases/clarification-on-the-hinkley-point-c-project',
        sourceLabel: 'EDF · 12 Mayıs 2016'
      },
      {
        label: '02 · İddia',
        title: 'Kapasite beyanı, yeterlilik kanıtı değildir.',
        body: 'Ek %15, maliyet aşımı olasılığı anlamına gelmez. Rezervin erişilebilirliği ve stres altında yeterliliği, bu açıklamayla belirlenemez. Kaynağın söylediği ile bizim çıkardığımız sonucu ayrı tutuyoruz.'
      },
      {
        label: '03 · Yorum',
        title: 'Bir beyanı daha geniş bağlamına yerleştiriyoruz.',
        body: 'Finansman kapasitesi; zaman, teslimat, tüketici ödemeleri ve kamu yükümlülükleriyle birlikte anlam kazanır. NAO’nun değerlendirmesi bu farklı risk kanallarını görünür kılar. Bunları birbirine bağlayan yorum, kaynak beyanından ayrı tutulur.',
        source: 'https://www.nao.org.uk/wp-content/uploads/2016/07/Nuclear-power-in-the-UK.pdf',
        sourceLabel: 'NAO · §§3.19–3.25'
      },
      {
        label: '04 · Sınır',
        title: 'Bildiğimiz alanın kenarını açıkça çiziyoruz.',
        body: 'Nihai sözleşme, finansman stresleri ve bağımsız teslimat incelemesi bu kaynak paketinde yoktur. Bu nedenle erişilebilir fon, yeterli fon ve nihai risk paylaşımı aynı şeymiş gibi anlatılamaz. Boşluk, hangi yorumu sınırladığıyla birlikte kaydedilir.'
      },
      {
        label: '05 · Açık bağlam sorusu',
        title: 'Bu resmi tamamlamak için neyi öğrenmeliyiz?',
        body: 'Finansmanı, teslimatı ve kamu yükümlülüklerini hangi ilişkiler bağlıyor? Benzer görünen tutarlar aynı şeyi mi ölçüyor? Alternatif enerji bileşimlerinin farklı ön koşulları neler? G-0 bu soruları ve öğrenilmesi gereken alanı görünür tutar.'
      }
    ],
    case2016: {
      title: '27 Temmuz 2016 · Bağlam penceresi',
      intro: 'Hinkley Point C’yi anlamak için hangi ekonomik, teknik, kurumsal ve zamansal ilişkileri birlikte görmeliyiz? Bilgi sınırı: 27 Temmuz 2016 ve öncesinde yayımlanmış seçili kamu kaynakları.',
      facts: [
        {
          label: 'Proje bütçesi beyanı',
          value: '£18 milyar',
          unit: 'Nominal sterlin · Mayıs 2016',
          note: 'EDF’nin risk ve ihtiyat payı içerdiğini belirttiği bütçe. Gerçekleşmiş toplam maliyet değildir.',
          source: 'https://www.edf.fr/en/the-edf-group/dedicated-sections/journalists/all-press-releases/clarification-on-the-hinkley-point-c-project',
          sourceLabel: 'EDF açıklaması'
        },
        {
          label: 'Üretim başlangıcı beklentisi',
          value: '2025',
          unit: 'NAO raporunda aktarılan hedef yıl',
          note: '13 Temmuz 2016 tarihli raporda aktarılan beklenti; gerçekleşmiş üretim başlangıcı değildir.',
          source: 'https://www.nao.org.uk/wp-content/uploads/2016/07/Nuclear-power-in-the-UK.pdf',
          sourceLabel: 'NAO · §3.18'
        },
        {
          label: 'Fark ödemesi projeksiyonu',
          value: '£29,7 milyar',
          unit: '2015–16 fiyatları · %0,7 iskonto ile bugünkü değer',
          note: 'Santralin yapım maliyetinden farklı bir nakit akımıdır. Gerçekleşmiş ödeme değildir; nominal bütçeye doğrudan eklenemez.',
          source: 'https://www.nao.org.uk/wp-content/uploads/2016/07/Nuclear-power-in-the-UK.pdf',
          sourceLabel: 'NAO · §3.17 / Şekil 20'
        }
      ],
      lesson: 'Aynı projeye ait sayılar farklı ilişkileri anlatabilir. G-0, beyanları, aktörleri, bağımlılıkları ve bilinmeyenleri birlikte göstererek operasyonun üzerinde yükseleceği bağlamı kurar.'
    },
    case2026: {
      title: '20 Şubat 2026 · Sonraki kayıt',
      intro: 'Bu katman, ilk bilgi kümesinden ayrı tutulur. EDF’nin 20 Şubat 2026 açıklaması, önceki beklentileri nasıl karşılaştırmamız gerektiğini gösterir. Burada verilen tarihler ve maliyetler güncellenmiş tahminlerdir; nihai gerçekleşmeler değildir.',
      facts: [
        {
          label: 'Ünite 1 üretim beklentisi',
          value: '2030',
          unit: 'Şubat 2026’da açıklanan hedef yıl',
          note: '2016’daki ilk üretim beklentisi ile 2026’daki Ünite 1 hedefinin kapsamları açık tutulmalıdır. İki hedefin karşılaştırması, gerçekleşmiş gecikme ölçümü değildir.',
          source: 'https://www.edf.fr/en/2025-annual-results',
          sourceLabel: 'EDF · 2025 yıllık sonuçları'
        },
        {
          label: 'Tamamlama maliyeti tahmini',
          value: '£35 milyar',
          unit: '2015 fiyatlarıyla sterlin',
          note: 'Nominal £18 milyar ile fiyat bazı aynı değildir. Kapsam ve fiyat bazı uzlaştırılmadan bir maliyet aşımı yüzdesi çıkarılamaz.',
          source: 'https://www.edf.fr/en/2025-annual-results',
          sourceLabel: 'EDF · Hinkley Point C / dipnot 5'
        }
      ],
      lesson: 'Yeni bilgi, eski bağlamın hangi kısmını genişletiyor veya değiştiriyor? Tarihi, kapsamı ve ölçüyü korumak bu soruyu cevaplanabilir kılar.'
    },
    actors: [
      {
        label: 'Yatırımcı',
        title: 'EDF ve hissedarlar · finansman kapasitesi',
        body: 'EDF, nominal £18 milyar bütçeye ek %15 özkaynak kapasitesi açıkladı. Aynı tutar, finansman hazırlığı ve belirsizliğe karşı tampon olmak üzere farklı açılardan okunabilir.',
        readingA: 'Finansman okuması: Hissedarların gerektiğinde sağlayacağını belirttiği ek kapasite, açıklanan kaynak çerçevesinin parçasıdır.',
        readingB: 'Belirsizlik okuması: Kapasitenin varlığına ilişkin beyan, erişim koşullarını veya farklı gecikmelerde yeterliliği tek başına göstermez.',
        openQuestion: 'Bu kapasite hangi koşullarda erişilebilir ve hangi maliyet ile zaman baskılarını karşılayacak biçimde tanımlanmıştır?',
        source: 'https://www.edf.fr/en/the-edf-group/dedicated-sections/journalists/all-press-releases/clarification-on-the-hinkley-point-c-project',
        sourceLabel: 'EDF · 12 Mayıs 2016'
      },
      {
        label: 'Tüketici',
        title: 'Elektrik tüketicisi · fiyat ve zaman ilişkisi',
        body: 'NAO, inşaat sırasında CfD kapsamında tüketiciden ödeme alınmadığını ve gelecekteki fark ödemelerinin toptan fiyat beklentilerine bağlı olduğunu açıklar.',
        readingA: 'Dönem okuması: İnşaat dönemi ile üretim sonrasındaki destek ödemeleri ayrı zaman katmanlarıdır.',
        readingB: 'Fiyat okuması: Düşen toptan fiyat projeksiyonları, öngörülen fark ödemesini artırabilir. Bu değişim santral yapım bütçesiyle aynı ölçü değildir.',
        openQuestion: 'Toptan fiyat varsayımları, sözleşme süresi ve tüketici ödemeleri farklı geleceklerde nasıl birlikte değişir?',
        source: 'https://www.nao.org.uk/wp-content/uploads/2016/07/Nuclear-power-in-the-UK.pdf',
        sourceLabel: 'NAO · §§3.17–3.20'
      },
      {
        label: 'Enerji sistemi',
        title: 'Kamu · arz, emisyon ve bağımlılıklar',
        body: 'NAO, nükleerin süreklilik ve ölçek gerekçelerini; alternatif teknolojileri ve gecikmenin arz ile emisyon etkilerini aynı bağlamda ele alır.',
        readingA: 'Fırsat okuması: Sürekli, büyük ölçekli düşük karbon üretimi enerji sistemi açısından stratejik bir katkı sunabilir.',
        readingB: 'Bağımlılık okuması: Bu katkının zamanı ve kapsamı teslimata bağlıdır; alternatifleri anlamak için daha geniş sistem maliyetleri ve güvenilirlik gerekir.',
        openQuestion: 'Farklı üretim ve esneklik bileşimleri, aynı arz güvenliği ve emisyon hedeflerinde hangi ön koşullara ihtiyaç duyar?',
        source: 'https://www.nao.org.uk/wp-content/uploads/2016/07/Nuclear-power-in-the-UK.pdf',
        sourceLabel: 'NAO · §§3.23–3.25 / Şekil 12'
      }
    ],
    lenses: [
      { title: 'Stratejik problem çözme', body: 'Misyonu doğru anla; konuyu farklı çerçevelerden araştır. Görünen sorunla varsayılan açıklamayı ayır, bağlamın eksik boyutlarını bul.' },
      { title: 'Finansal sorumluluk', body: 'Değeri kim kazanıyor, kaybı kim taşıyor, sermayeyi kim sağlıyor? Fayda, risk, teşvik ve yetki ilişkilerini aynı çerçevede görünür kıl.' },
      { title: 'Kanıt ve güvence', body: 'Destekleyici ve karşı kanıtı birlikte kaydet. Başka bir yetkin inceleyici, önemli bir yorumun dayanağını ve sınırını izleyebilsin.' },
      { title: 'Sistem bütünlüğü', body: 'Teknik, ekonomik, kurumsal ve insanî bağımlılıkları birlikte sınamaya aç. Bir alandaki iyileşmenin diğerindeki maliyetini gör.' },
      { title: 'İnsan odaklı öğrenme', body: 'Görevi verenin ihtiyacını, operatörün varsayımlarını ve etkilenen insanların deneyimini ayrı gör. Bağlamı gözlem ve geri bildirimle yeniden incele.' }
    ],
    learning: [
      { title: 'Yapılandırılmış bağlam', body: 'Kaynakları, tarihleri, aktörleri, ilişkileri, rakip yorumları ve açık soruları insanın ve makinenin inceleyebileceği bir kayıtta tut.' },
      { title: 'İzinli gözlem', body: 'Yetkilendirilmiş operasyonlardan gelen gözlem ve sonuçları bağlama geri bağla. Müşteri sınırlarını koru; model eğitimi için veri kullanımı ayrıca yetkilendirilir.' },
      { title: 'Yeniden değerlendirme', body: 'Hangi varsayım değişti, hangi bağlantı güçlendi, hangi alan hâlâ eksik? İlk kayıtla yeni bilgiyi zamanını koruyarak karşılaştır; olumsuz bulguları da sakla.' },
      { title: 'Olası makine öğrenmesi', body: 'Yeterli izinli veri ve sınanmış fayda oluşursa bağlam bulma ve eksik ilişki saptama desteği geliştirilebilir. Yapılandırılmış kayıt bu fırsatı açar; eğitilmiş veya devrede bir model iddia etmez.' }
    ],
    dossier: [
      {
        label: 'Misyon',
        title: 'Operasyonun bağlam alanını kur',
        body: 'Örnek görev: HPC’yi çevreleyen teknik, ekonomik, kurumsal, toplumsal ve zamansal ilişkileri anlamak. Konu, tarih, coğrafya, amaç ve açık sınırlar başta belirlenir.',
        bullets: ['İnceleme alanı: elektrik arzı, emisyon, finansman, tüketici ve kamu etkileri.', 'Rakip çerçeveler: tek bir proje, enerji sistemi, yatırım ortaklığı ve uzun vadeli kamu yükümlülüğü.', 'Kapsam: seçili kamu kaynaklarından tarihsel bağlam gösterimi; tüm bağlamın eksiksiz çözüldüğü iddiası yok.']
      },
      {
        label: 'İlişkiler',
        title: 'Aktörleri ve bağımlılıkları birlikte gör',
        body: 'Yatırımcı, hükümet, tüketici, tedarikçi ve düzenleyici farklı teşviklere ve maruziyetlere sahiptir. Birinin açıklaması bütün sistemin gerçeğini tek başına kurmaz.',
        bullets: ['Finansman ile teknik teslimat birbirine bağlıdır; gecikme etkileri farklı taraflara yayılabilir.', 'Sürekli düşük karbon arzı, stratejik fırsat olarak bağlamda yer alır.', 'Esneklik, bağlantı ve depolama farklı ön koşullar taşır; bunlar otomatik ikame sayılmaz.']
      },
      {
        label: 'Kanıt',
        title: 'Rakip okumaları kaynaklarına kadar izle',
        body: 'Beyan, hesap, hipotez ve bilinmeyen ayrı kaydedilir. Aynı kurumun tekrar eden açıklamaları bağımsız doğrulama sayılmaz.',
        bullets: ['Bütçe ile iskonto edilmiş destek ödemesi farklı ölçülerdir.', 'Tek benzer proje, istatistiksel referans sınıfı oluşturmaz.', 'Sözleşme, finansman stresi ve bağımsız teslimat kanıtı bu örnekte eksiktir.']
      },
      {
        label: 'Kapsama',
        title: 'Görünen alanı ve bilinmeyenleri ayır',
        body: 'Bağlam dosyası hangi boyutların incelendiğini, hangi ilişkilerin geçici yorum olduğunu ve neyin öğrenilmesi gerektiğini gösterir. Sonraki GI operasyonuna dürüst bir başlangıç zemini sağlar.',
        bullets: ['Kaynak kapsamı: 27 Temmuz 2016 ve öncesi seçili kamu açıklamaları; özel belgeler yok.', 'Açık alanlar: sözleşme ayrıntıları, finansman dayanıklılığı, teslimat ve alternatiflerin sistem etkileri.', 'G-0 çıktısı: izlenebilir, çok boyutlu bağlam ve açık öğrenme soruları.']
      }
    ]
  },
  en: {
    trace: [
      {
        label: '01 · Source',
        title: 'One number. First, what does it measure?',
        body: 'On 12 May 2016, EDF stated a nominal £18 billion budget and an additional 15% equity capacity available if needed. This is a dated statement by the investor.',
        source: 'https://www.edf.fr/en/the-edf-group/dedicated-sections/journalists/all-press-releases/clarification-on-the-hinkley-point-c-project',
        sourceLabel: 'EDF · 12 May 2016'
      },
      {
        label: '02 · Claim',
        title: 'Stated capacity does not establish adequacy.',
        body: 'The additional 15% is not a probability of a cost overrun. The statement alone cannot establish whether the reserve is accessible or sufficient under stress. We separate what a source says from what we infer.'
      },
      {
        label: '03 · Interpretation',
        title: 'Place a statement in its wider context.',
        body: 'Financing capacity gains meaning alongside timing, delivery, consumer payments and public liabilities. The NAO assessment makes these distinct risk channels visible. An interpretation connecting them remains separate from the source statement.',
        source: 'https://www.nao.org.uk/wp-content/uploads/2016/07/Nuclear-power-in-the-UK.pdf',
        sourceLabel: 'NAO · §§3.19–3.25'
      },
      {
        label: '04 · Boundary',
        title: 'Mark the edge of what we know.',
        body: 'The final contract, financing stress analysis and independent delivery review are absent from this packet. Available funds, sufficient funds and final risk allocation cannot be treated as equivalent. Each gap records which interpretation it limits.'
      },
      {
        label: '05 · Open context question',
        title: 'What must we learn to complete the picture?',
        body: 'How are financing, delivery and public liabilities connected? Do similar-looking figures measure the same thing? What different prerequisites do alternative energy mixes require? G-0 keeps these questions and the learning field visible.'
      }
    ],
    case2016: {
      title: '27 July 2016 · Context window',
      intro: 'Which economic, technical, institutional and temporal relationships must be understood together to make sense of Hinkley Point C? Information boundary: selected public sources published on or before 27 July 2016.',
      facts: [
        {
          label: 'Stated project budget',
          value: '£18 billion',
          unit: 'Nominal sterling · May 2016',
          note: 'EDF stated that the budget included risk and contingency. It is not the final actual cost.',
          source: 'https://www.edf.fr/en/the-edf-group/dedicated-sections/journalists/all-press-releases/clarification-on-the-hinkley-point-c-project',
          sourceLabel: 'EDF statement'
        },
        {
          label: 'Expected generation start',
          value: '2025',
          unit: 'Target year reported by the NAO',
          note: 'An expectation reported on 13 July 2016, not an actual generation start.',
          source: 'https://www.nao.org.uk/wp-content/uploads/2016/07/Nuclear-power-in-the-UK.pdf',
          sourceLabel: 'NAO · §3.18'
        },
        {
          label: 'Projected top-up payments',
          value: '£29.7 billion',
          unit: '2015–16 prices · present value at a 0.7% discount rate',
          note: 'A different cash flow from plant construction cost. These are projected payments and cannot be added directly to the nominal budget.',
          source: 'https://www.nao.org.uk/wp-content/uploads/2016/07/Nuclear-power-in-the-UK.pdf',
          sourceLabel: 'NAO · §3.17 / Figure 20'
        }
      ],
      lesson: 'Figures from the same project can describe different relationships. G-0 brings statements, actors, dependencies and unknowns together to establish the context on which an operation can build.'
    },
    case2026: {
      title: '20 February 2026 · Later record',
      intro: 'This layer remains separate from the original information set. EDF’s 20 February 2026 update illustrates how earlier expectations should be compared. The figures here are revised forecasts, not final observed outcomes.',
      facts: [
        {
          label: 'Expected Unit 1 production',
          value: '2030',
          unit: 'Target year announced in February 2026',
          note: 'Keep the scopes of the 2016 first-generation expectation and the 2026 Unit 1 target explicit. Comparing these targets does not measure an actual completed delay.',
          source: 'https://www.edf.fr/en/2025-annual-results',
          sourceLabel: 'EDF · 2025 annual results'
        },
        {
          label: 'Estimated completion cost',
          value: '£35 billion',
          unit: 'Sterling at 2015 prices',
          note: 'Its price basis differs from the nominal £18 billion figure. A cost-overrun percentage requires the scope and price bases to be reconciled first.',
          source: 'https://www.edf.fr/en/2025-annual-results',
          sourceLabel: 'EDF · Hinkley Point C / footnote 5'
        }
      ],
      lesson: 'Which part of the earlier context does new information extend or change? Preserving dates, scope and units makes that question answerable.'
    },
    actors: [
      {
        label: 'Investor',
        title: 'EDF and shareholders · financing capacity',
        body: 'EDF stated an additional 15% equity capacity alongside a nominal £18 billion budget. The same figure can be read through financing preparedness and the buffer against uncertainty.',
        readingA: 'Financing reading: The additional capacity that shareholders stated they would provide if needed forms part of the announced funding framework.',
        readingB: 'Uncertainty reading: A statement that capacity exists does not establish its access conditions or adequacy under different delays.',
        openQuestion: 'Under what conditions is this capacity accessible, and which cost and time pressures is it intended to cover?',
        source: 'https://www.edf.fr/en/the-edf-group/dedicated-sections/journalists/all-press-releases/clarification-on-the-hinkley-point-c-project',
        sourceLabel: 'EDF · 12 May 2016'
      },
      {
        label: 'Consumer',
        title: 'Electricity consumers · price and time',
        body: 'The NAO explains that consumers make no CfD payments during construction, while projected future top-up payments depend on wholesale-price expectations.',
        readingA: 'Timing reading: The construction period and support payments after generation are separate time layers.',
        readingB: 'Price reading: Falling wholesale-price projections can increase projected top-up payments. This change does not measure the plant’s construction budget.',
        openQuestion: 'How do wholesale-price assumptions, contract duration and consumer payments interact across different futures?',
        source: 'https://www.nao.org.uk/wp-content/uploads/2016/07/Nuclear-power-in-the-UK.pdf',
        sourceLabel: 'NAO · §§3.17–3.20'
      },
      {
        label: 'Energy system',
        title: 'The public · supply, emissions and dependencies',
        body: 'The NAO considers nuclear power’s continuity and scale, alternative technologies, and the supply and emissions effects of delay within the same context.',
        readingA: 'Opportunity reading: Continuous, large-scale low-carbon generation could make a strategic contribution to the energy system.',
        readingB: 'Dependency reading: The timing and scope of that contribution depend on delivery; understanding alternatives requires wider system costs and reliability.',
        openQuestion: 'What prerequisites do different generation and flexibility mixes require under the same supply-reliability and emissions objectives?',
        source: 'https://www.nao.org.uk/wp-content/uploads/2016/07/Nuclear-power-in-the-UK.pdf',
        sourceLabel: 'NAO · §§3.23–3.25 / Figure 12'
      }
    ],
    lenses: [
      { title: 'Strategic problem solving', body: 'Understand the mission and investigate through different frames. Separate the visible problem from an assumed explanation; identify missing dimensions of context.' },
      { title: 'Financial responsibility', body: 'Who gains value, carries losses and provides capital? Make relationships between benefits, risks, incentives and authority visible together.' },
      { title: 'Evidence and assurance', body: 'Preserve supporting and contradictory evidence. Enable another competent reviewer to trace the basis and limits of an important interpretation.' },
      { title: 'System integration', body: 'Test technical, economic, institutional and human dependencies together. See when a gain in one domain creates a cost in another.' },
      { title: 'Human-centred learning', body: 'Distinguish the commissioning party’s needs, the operator’s assumptions and affected people’s experience. Re-examine context through observation and feedback.' }
    ],
    learning: [
      { title: 'Structured context', body: 'Record sources, dates, actors, relationships, rival interpretations and open questions in a form that people and machines can examine.' },
      { title: 'Authorised observations', body: 'Connect observations and outcomes from authorised operations back to their context. Preserve client boundaries; authorise data use for model training separately.' },
      { title: 'Re-evaluation', body: 'Which assumption changed, which relationship strengthened and which field remains incomplete? Compare the original record with new information while preserving time; retain contrary findings.' },
      { title: 'Possible machine learning', body: 'With sufficient authorised data and tested benefit, support for context retrieval and missing-relationship detection could be developed. Structured records open this possibility; they do not establish a trained or deployed model.' }
    ],
    dossier: [
      {
        label: 'Mission',
        title: 'Establish the operation’s context field',
        body: 'Example mission: Understand the technical, economic, institutional, social and temporal relationships surrounding HPC. Establish the subject, date, geography, purpose and boundaries first.',
        bullets: ['Field: electricity supply, emissions, financing, consumer and public effects.', 'Rival frames: a single project, an energy system, an investment partnership and a long-term public liability.', 'Scope: selected public sources in a historical demonstration; no claim that the entire context has been resolved.']
      },
      {
        label: 'Relationships',
        title: 'See actors and dependencies together',
        body: 'Investors, government, consumers, suppliers and regulators have different incentives and exposures. One actor’s statement does not establish the reality of the entire system.',
        bullets: ['Financing and technical delivery are connected; delay can affect different parties in different ways.', 'Continuous low-carbon supply belongs in the context as a strategic opportunity.', 'Flexibility, interconnection and storage have different prerequisites; they are not automatically equivalent substitutes.']
      },
      {
        label: 'Evidence',
        title: 'Trace rival readings to their sources',
        body: 'Record statements, calculations, hypotheses and unknowns separately. Repeated announcements from one institution are not independent verification.',
        bullets: ['A budget and discounted support payments measure different things.', 'One comparable project does not constitute a statistical reference class.', 'Contract, financing-stress and independent delivery evidence are missing from this example.']
      },
      {
        label: 'Coverage',
        title: 'Separate the visible field from the unknown',
        body: 'The context dossier shows which dimensions were examined, which relationships remain provisional interpretations and what must be learned. It provides an honest starting point for the next GI operation.',
        bullets: ['Source coverage: selected public statements on or before 27 July 2016; private documents are absent.', 'Open fields: contract detail, financing resilience, delivery and system effects of alternatives.', 'G-0 output: traceable, multidimensional context and open learning questions.']
      }
    ]
  }
};
