export const LANGUAGES = [
  { code: 'en', label: 'English', dir: 'ltr' },
  { code: 'ar', label: 'العربية', dir: 'rtl' },
  { code: 'ur', label: 'اردو', dir: 'rtl' },
  { code: 'id', label: 'Bahasa Indonesia', dir: 'ltr' },
  { code: 'tr', label: 'Türkçe', dir: 'ltr' },
]

const cars = {
  gmc: { name: 'GMC', desc: 'Premium SUV for families and groups' },
  sedan: { name: 'Sedan (Camry / Sonata)', desc: 'Comfortable sedan for couples and small families' },
  staria: { name: 'Staria', desc: 'Spacious modern van for medium groups' },
  h1: { name: 'Hyundai H1', desc: 'Reliable passenger van for group travel' },
  hiace: { name: 'Toyota Hiace', desc: 'Trusted Hiace for larger pilgrim groups' },
}

const carsAr = {
  gmc: { name: 'GMC', desc: 'سيارة SUV فاخرة للعائلات والمجموعات' },
  sedan: { name: 'سيدان (كامري / سوناتا)', desc: 'سيدان مريحة للأزواج والعائلات الصغيرة' },
  staria: { name: 'ستاريا', desc: 'فان حديث وواسع للمجموعات المتوسطة' },
  h1: { name: 'هيونداي H1', desc: 'فان ركاب موثوق للسفر الجماعي' },
  hiace: { name: 'تويوتا هايس', desc: 'هايس موثوق للمجموعات الكبيرة من الحجاج' },
}

const carsUr = {
  gmc: { name: 'GMC', desc: 'خاندانوں اور گروپس کے لیے پریمیم SUV' },
  sedan: { name: 'سیڈان (کیمری / سوناٹا)', desc: 'جوڑوں اور چھوٹے خاندانوں کے لیے آرام دہ سیڈان' },
  staria: { name: 'سٹاریا', desc: 'درمیانے گروپس کے لیے وسیع جدید وین' },
  h1: { name: 'ہنڈائی H1', desc: 'گروپ سفر کے لیے قابل اعتماد مسافر وین' },
  hiace: { name: 'ٹویوٹا ہائس', desc: 'بڑے حاجی گروپس کے لیے قابل اعتماد ہائس' },
}

const carsId = {
  gmc: { name: 'GMC', desc: 'SUV premium untuk keluarga dan grup' },
  sedan: { name: 'Sedan (Camry / Sonata)', desc: 'Sedan nyaman untuk pasangan dan keluarga kecil' },
  staria: { name: 'Staria', desc: 'Van modern luas untuk grup menengah' },
  h1: { name: 'Hyundai H1', desc: 'Van penumpang andal untuk perjalanan grup' },
  hiace: { name: 'Toyota Hiace', desc: 'Hiace terpercaya untuk grup jamaah besar' },
}

const carsTr = {
  gmc: { name: 'GMC', desc: 'Aileler ve gruplar için premium SUV' },
  sedan: { name: 'Sedan (Camry / Sonata)', desc: 'Çiftler ve küçük aileler için konforlu sedan' },
  staria: { name: 'Staria', desc: 'Orta gruplar için geniş modern van' },
  h1: { name: 'Hyundai H1', desc: 'Grup seyahati için güvenilir yolcu vanı' },
  hiace: { name: 'Toyota Hiace', desc: 'Büyük hacı grupları için güvenilir Hiace' },
}

export const translations = {
  en: {
    nav: { cars: 'Cars', about: 'About Us', offers: 'Our Offers', routes: 'Routes', ziyarat: 'Ziyarat', contact: 'Contact' },
    hero: {
      title: 'Your Trusted Ride for Hajj & Umrah',
      subtitle: 'Safe, comfortable, and reliable transportation across the holy cities of Saudi Arabia.',
      cta: 'Book Now',
    },
    cars: {
      title: 'Our Fleet',
      subtitle: 'Choose from a range of well-maintained vehicles for every group size.',
      items: cars,
    },
    about: {
      title: 'About Us',
      p1: 'SaudiRides is a dedicated taxi and transport service built for pilgrims performing Hajj and Umrah. We understand the spiritual significance of your journey and strive to make every ride safe, punctual, and stress-free.',
      p2: 'Our experienced drivers know the holy cities inside out — from Jeddah airport transfers to intercity travel between Makkah, Madinah, and beyond.',
    },
    offers: {
      title: 'What We Have to Offer',
      items: [
        { title: 'Airport Transfers', desc: 'Pickup and drop-off at Jeddah and Madinah airports.' },
        { title: 'Intercity Travel', desc: 'Comfortable rides between Makkah, Madinah, and Jeddah.' },
        { title: '24/7 Availability', desc: 'Round-the-clock service during your pilgrimage.' },
        { title: 'Multilingual Drivers', desc: 'Drivers who speak Arabic, English, Urdu, and more.' },
        { title: 'Group Packages', desc: 'Special rates for families and large pilgrim groups.' },
        { title: 'AC & Comfort', desc: 'All vehicles are air-conditioned and regularly serviced.' },
      ],
    },
    routes: {
      title: 'Routes Offered',
      subtitle: 'Popular routes we serve across the Kingdom.',
      items: [
        'Jeddah Airport → Makkah',
        'Makkah → Madinah',
        'Madinah → Makkah',
        'Jeddah → Madinah',
        'Makkah ↔ Mina / Arafat / Muzdalifah',
        'Hotel ↔ Haram transfers',
      ],
    },
    ziyarat: {
      title: 'Ziyarat Offered',
      subtitle: 'Guided visits to sacred sites in Makkah and Madinah.',
      makkah: {
        title: 'Makkah Ziyarat',
        items: ['Jabal al-Noor (Cave of Hira)', 'Jabal Thawr', 'Masjid al-Jinn', 'Makkah Museum'],
      },
      madinah: {
        title: 'Madinah Ziyarat',
        items: ['Masjid Quba', 'Mount Uhud', 'Masjid al-Qiblatain', 'Date Market & Baqi'],
      },
    },
    footer: {
      tagline: 'Serving pilgrims with care and dedication.',
      phone: 'Phone',
      email: 'Email',
      whatsapp: 'WhatsApp',
      address: 'Address',
      addressValue: 'Makkah, Kingdom of Saudi Arabia',
      rights: 'All rights reserved.',
    },
    booking: {
      title: 'Book Your Ride',
      subtitle: 'Fill in your details and we will confirm your booking shortly.',
      back: 'Back to Home',
      name: 'Full Name',
      phone: 'Phone Number',
      pickup: 'Pickup Location',
      dropoff: 'Drop-off Location',
      date: 'Travel Date',
      vehicle: 'Select Vehicle',
      submit: 'Submit Booking',
      placeholder: 'Booking form coming soon — contact us via WhatsApp for immediate assistance.',
    },
  },
  ar: {
    nav: { cars: 'السيارات', about: 'من نحن', offers: 'عروضنا', routes: 'المسارات', ziyarat: 'الزيارات', contact: 'تواصل' },
    hero: {
      title: 'رحلتك الموثوقة للحج والعمرة',
      subtitle: 'نقل آمن ومريح وموثوق عبر المدن المقدسة في المملكة العربية السعودية.',
      cta: 'احجز الآن',
    },
    cars: {
      title: 'أسطولنا',
      subtitle: 'اختر من بين مجموعة من المركبات المُصانة جيداً لكل حجم مجموعة.',
      items: carsAr,
    },
    about: {
      title: 'من نحن',
      p1: 'سعودي رايدز هي خدمة تاكسي ونقل مخصصة للحجاج والمعتمرين. نفهم الأهمية الروحية لرحلتكم ونسعى لجعل كل رحلة آمنة وفي الوقت المحدد وخالية من التوتر.',
      p2: 'سائقونا ذوو الخبرة يعرفون المدن المقدسة جيداً — من نقل المطار في جدة إلى السفر بين مكة والمدينة وما بعدها.',
    },
    offers: {
      title: 'ما نقدمه',
      items: [
        { title: 'نقل المطار', desc: 'استقبال وتوديع من مطاري جدة والمدينة.' },
        { title: 'السفر بين المدن', desc: 'رحلات مريحة بين مكة والمدينة وجدة.' },
        { title: 'متاح 24/7', desc: 'خدمة على مدار الساعة خلال رحلتكم الروحية.' },
        { title: 'سائقون متعددو اللغات', desc: 'سائقون يتحدثون العربية والإنجليزية والأردية وغيرها.' },
        { title: 'باقات جماعية', desc: 'أسعار خاصة للعائلات والمجموعات الكبيرة.' },
        { title: 'تكييف وراحة', desc: 'جميع المركبات مكيفة وتُصان بانتظام.' },
      ],
    },
    routes: {
      title: 'المسارات المتاحة',
      subtitle: 'المسارات الشائعة التي نخدمها في المملكة.',
      items: [
        'مطار جدة ← مكة',
        'مكة ← المدينة',
        'المدينة ← مكة',
        'جدة ← المدينة',
        'مكة ↔ منى / عرفات / مزدلفة',
        'الفندق ↔ الحرم',
      ],
    },
    ziyarat: {
      title: 'الزيارات المتاحة',
      subtitle: 'زيارات موجهة للمواقع المقدسة في مكة والمدينة.',
      makkah: {
        title: 'زيارات مكة',
        items: ['جبل النور (غار حراء)', 'جبل ثور', 'مسجد الجن', 'متحف مكة'],
      },
      madinah: {
        title: 'زيارات المدينة',
        items: ['مسجد قباء', 'جبل أحد', 'مسجد القبلتين', 'سوق التمور والبقيع'],
      },
    },
    footer: {
      tagline: 'نخدم الحجاج بعناية وتفانٍ.',
      phone: 'الهاتف',
      email: 'البريد الإلكتروني',
      whatsapp: 'واتساب',
      address: 'العنوان',
      addressValue: 'مكة المكرمة، المملكة العربية السعودية',
      rights: 'جميع الحقوق محفوظة.',
    },
    booking: {
      title: 'احجز رحلتك',
      subtitle: 'أدخل بياناتك وسنؤكد حجزك قريباً.',
      back: 'العودة للرئيسية',
      name: 'الاسم الكامل',
      phone: 'رقم الهاتف',
      pickup: 'موقع الاستلام',
      dropoff: 'موقع التوصيل',
      date: 'تاريخ السفر',
      vehicle: 'اختر المركبة',
      submit: 'إرسال الحجز',
      placeholder: 'نموذج الحجز قريباً — تواصل معنا عبر واتساب للمساعدة الفورية.',
    },
  },
  ur: {
    nav: { cars: 'گاڑیاں', about: 'ہمارے بارے میں', offers: 'ہماری پیشکش', routes: 'راستے', ziyarat: 'زیارت', contact: 'رابطہ' },
    hero: {
      title: 'حج و عمرہ کے لیے آپ کی قابل اعتماد سواری',
      subtitle: 'سعودی عرب کی مقدس شہروں میں محفوظ، آرام دہ اور قابل اعتماد نقل و حمل۔',
      cta: 'ابھی بک کریں',
    },
    cars: {
      title: 'ہمارا بیڑا',
      subtitle: 'ہر گروپ سائز کے لیے اچھی طرح سے دیکھ بھال کی گئی گاڑیوں میں سے انتخاب کریں۔',
      items: carsUr,
    },
    about: {
      title: 'ہمارے بارے میں',
      p1: 'سعودی رائڈز حج و عمرہ کرنے والے زائرین کے لیے مخصوص ٹیکسی اور نقل و حمل کی سروس ہے۔ ہم آپ کے سفر کی روحانی اہمیت سمجھتے ہیں اور ہر سواری کو محفوظ، بروقت اور بے فکر بنانے کی کوشش کرتے ہیں۔',
      p2: 'ہمارے تجربہ کار ڈرائیور مقدس شہروں کو اچھی طرح جانتے ہیں — جدہ ایئرپورٹ ٹرانسفر سے لے کر مکہ، مدینہ اور اس سے آگے کے شہروں کے درمیان سفر تک۔',
    },
    offers: {
      title: 'ہم کیا پیش کرتے ہیں',
      items: [
        { title: 'ایئرپورٹ ٹرانسفر', desc: 'جدہ اور مدینہ ایئرپورٹس پر اٹھانا اور چھوڑنا۔' },
        { title: 'شہروں کے درمیان سفر', desc: 'مکہ، مدینہ اور جدہ کے درمیان آرام دہ سواریاں۔' },
        { title: '24/7 دستیابی', desc: 'آپ کے سفر کے دوران چوبیس گھنٹے سروس۔' },
        { title: 'کثیر لسانی ڈرائیور', desc: 'عربی، انگریزی، اردو اور مزید بولنے والے ڈرائیور۔' },
        { title: 'گروپ پیکجز', desc: 'خاندانوں اور بڑے حاجی گروپس کے لیے خصوصی نرخ۔' },
        { title: 'اے سی اور آرام', desc: 'تمام گاڑیاں ائیر کنڈیشنڈ اور باقاعدگی سے سروس شدہ۔' },
      ],
    },
    routes: {
      title: 'دستیاب راستے',
      subtitle: 'مملکت بھر میں ہماری مقبول خدمات۔',
      items: [
        'جدہ ایئرپورٹ → مکہ',
        'مکہ → مدینہ',
        'مدینہ → مکہ',
        'جدہ → مدینہ',
        'مکہ ↔ منیٰ / عرفات / مزدلفہ',
        'ہوٹل ↔ حرم ٹرانسفر',
      ],
    },
    ziyarat: {
      title: 'دستیاب زیارتیں',
      subtitle: 'مکہ اور مدینہ میں مقدس مقامات کی رہنمائی شدہ زیارتیں۔',
      makkah: {
        title: 'مکہ زیارت',
        items: ['جبل النور (غار حرا)', 'جبل ثور', 'مسجد الجن', 'مکہ میوزیم'],
      },
      madinah: {
        title: 'مدینہ زیارت',
        items: ['مسجد قباء', 'جبل احد', 'مسجد القبلتین', 'کھجور بازار اور بقیع'],
      },
    },
    footer: {
      tagline: 'زائرین کی خدمت میں خلوص اور لگن کے ساتھ۔',
      phone: 'فون',
      email: 'ای میل',
      whatsapp: 'واٹس ایپ',
      address: 'پتہ',
      addressValue: 'مکہ مکرمہ، مملکت سعودی عرب',
      rights: 'جملہ حقوق محفوظ ہیں۔',
    },
    booking: {
      title: 'اپنی سواری بک کریں',
      subtitle: 'اپنی تفصیلات درج کریں اور ہم جلد آپ کی بکنگ کی تصدیق کریں گے۔',
      back: 'ہوم پر واپس',
      name: 'پورا نام',
      phone: 'فون نمبر',
      pickup: 'اٹھانے کی جگہ',
      dropoff: 'اتارنے کی جگہ',
      date: 'سفر کی تاریخ',
      vehicle: 'گاڑی منتخب کریں',
      submit: 'بکنگ جمع کریں',
      placeholder: 'بکنگ فارم جلد آ رہا ہے — فوری مدد کے لیے واٹس ایپ پر رابطہ کریں۔',
    },
  },
  id: {
    nav: { cars: 'Mobil', about: 'Tentang Kami', offers: 'Penawaran', routes: 'Rute', ziyarat: 'Ziyarat', contact: 'Kontak' },
    hero: {
      title: 'Transportasi Terpercaya untuk Haji & Umrah',
      subtitle: 'Transportasi aman, nyaman, dan andal di kota-kota suci Arab Saudi.',
      cta: 'Pesan Sekarang',
    },
    cars: {
      title: 'Armada Kami',
      subtitle: 'Pilih dari berbagai kendaraan terawat untuk setiap ukuran grup.',
      items: carsId,
    },
    about: {
      title: 'Tentang Kami',
      p1: 'SaudiRides adalah layanan taksi dan transportasi khusus untuk jamaah Haji dan Umrah. Kami memahami makna spiritual perjalanan Anda dan berusaha membuat setiap perjalanan aman, tepat waktu, dan bebas stres.',
      p2: 'Pengemudi berpengalaman kami mengenal kota-kota suci dengan baik — dari transfer bandara Jeddah hingga perjalanan antarkota antara Makkah, Madinah, dan sekitarnya.',
    },
    offers: {
      title: 'Apa yang Kami Tawarkan',
      items: [
        { title: 'Transfer Bandara', desc: 'Penjemputan dan pengantaran di bandara Jeddah dan Madinah.' },
        { title: 'Perjalanan Antarkota', desc: 'Perjalanan nyaman antara Makkah, Madinah, dan Jeddah.' },
        { title: 'Tersedia 24/7', desc: 'Layanan sepanjang waktu selama ibadah haji Anda.' },
        { title: 'Pengemudi Multibahasa', desc: 'Pengemudi yang berbicara Arab, Inggris, Urdu, dan lainnya.' },
        { title: 'Paket Grup', desc: 'Tarif khusus untuk keluarga dan grup jamaah besar.' },
        { title: 'AC & Kenyamanan', desc: 'Semua kendaraan ber-AC dan diservis secara rutin.' },
      ],
    },
    routes: {
      title: 'Rute yang Tersedia',
      subtitle: 'Rute populer yang kami layani di seluruh Kerajaan.',
      items: [
        'Bandara Jeddah → Makkah',
        'Makkah → Madinah',
        'Madinah → Makkah',
        'Jeddah → Madinah',
        'Makkah ↔ Mina / Arafah / Muzdalifah',
        'Hotel ↔ transfer Haram',
      ],
    },
    ziyarat: {
      title: 'Ziyarat yang Tersedia',
      subtitle: 'Kunjungan terpandu ke situs suci di Makkah dan Madinah.',
      makkah: {
        title: 'Ziyarat Makkah',
        items: ['Jabal al-Noor (Gua Hira)', 'Jabal Tsur', 'Masjid al-Jinn', 'Museum Makkah'],
      },
      madinah: {
        title: 'Ziyarat Madinah',
        items: ['Masjid Quba', 'Gunung Uhud', 'Masjid al-Qiblatain', 'Pasar Kurma & Baqi'],
      },
    },
    footer: {
      tagline: 'Melayani jamaah dengan penuh perhatian dan dedikasi.',
      phone: 'Telepon',
      email: 'Email',
      whatsapp: 'WhatsApp',
      address: 'Alamat',
      addressValue: 'Makkah, Kerajaan Arab Saudi',
      rights: 'Hak cipta dilindungi.',
    },
    booking: {
      title: 'Pesan Perjalanan Anda',
      subtitle: 'Isi detail Anda dan kami akan segera mengonfirmasi pemesanan.',
      back: 'Kembali ke Beranda',
      name: 'Nama Lengkap',
      phone: 'Nomor Telepon',
      pickup: 'Lokasi Penjemputan',
      dropoff: 'Lokasi Tujuan',
      date: 'Tanggal Perjalanan',
      vehicle: 'Pilih Kendaraan',
      submit: 'Kirim Pemesanan',
      placeholder: 'Formulir pemesanan segera hadir — hubungi kami via WhatsApp untuk bantuan segera.',
    },
  },
  tr: {
    nav: { cars: 'Araçlar', about: 'Hakkımızda', offers: 'Tekliflerimiz', routes: 'Rotalar', ziyarat: 'Ziyaret', contact: 'İletişim' },
    hero: {
      title: 'Hac ve Umre İçin Güvenilir Ulaşım',
      subtitle: 'Suudi Arabistan\'ın kutsal şehirlerinde güvenli, konforlu ve güvenilir ulaşım.',
      cta: 'Şimdi Rezervasyon Yap',
    },
    cars: {
      title: 'Filomuz',
      subtitle: 'Her grup büyüklüğü için bakımlı araçlarımızdan birini seçin.',
      items: carsTr,
    },
    about: {
      title: 'Hakkımızda',
      p1: 'SaudiRides, Hac ve Umre ibadeti için özel taksi ve ulaşım hizmetidir. Yolculuğunuzun manevi önemini anlıyoruz ve her yolculuğu güvenli, zamanında ve stressiz kılmaya çalışıyoruz.',
      p2: 'Deneyimli sürücülerimiz kutsal şehirleri çok iyi biliyor — Cidde havalimanı transferlerinden Mekke, Medine ve ötesi arası şehirlerarası yolculuklara kadar.',
    },
    offers: {
      title: 'Neler Sunuyoruz',
      items: [
        { title: 'Havalimanı Transferi', desc: 'Cidde ve Medine havalimanlarında karşılama ve uğurlama.' },
        { title: 'Şehirlerarası Seyahat', desc: 'Mekke, Medine ve Cidde arasında konforlu yolculuklar.' },
        { title: '7/24 Hizmet', desc: 'İbadet yolculuğunuz boyunca kesintisiz hizmet.' },
        { title: 'Çok Dilli Sürücüler', desc: 'Arapça, İngilizce, Urduca ve daha fazlasını konuşan sürücüler.' },
        { title: 'Grup Paketleri', desc: 'Aileler ve büyük hacı grupları için özel fiyatlar.' },
        { title: 'Klima ve Konfor', desc: 'Tüm araçlar klimalı ve düzenli olarak bakıma alınır.' },
      ],
    },
    routes: {
      title: 'Sunulan Rotalar',
      subtitle: 'Krallık genelinde hizmet verdiğimiz popüler rotalar.',
      items: [
        'Cidde Havalimanı → Mekke',
        'Mekke → Medine',
        'Medine → Mekke',
        'Cidde → Medine',
        'Mekke ↔ Mina / Arafat / Müzdelife',
        'Otel ↔ Haram transferleri',
      ],
    },
    ziyarat: {
      title: 'Sunulan Ziyaretler',
      subtitle: 'Mekke ve Medine\'deki kutsal mekanlara rehberli ziyaretler.',
      makkah: {
        title: 'Mekke Ziyaretleri',
        items: ['Cebel-i Nur (Hira Mağarası)', 'Cebel-i Tur', 'Cin Mescidi', 'Mekke Müzesi'],
      },
      madinah: {
        title: 'Medine Ziyaretleri',
        items: ['Kuba Mescidi', 'Uhud Dağı', 'Kıbleteyn Mescidi', 'Hurma Pazarı ve Bakî'],
      },
    },
    footer: {
      tagline: 'Hacılara özen ve özveriyle hizmet ediyoruz.',
      phone: 'Telefon',
      email: 'E-posta',
      whatsapp: 'WhatsApp',
      address: 'Adres',
      addressValue: 'Mekke, Suudi Arabistan Krallığı',
      rights: 'Tüm hakları saklıdır.',
    },
    booking: {
      title: 'Yolculuğunuzu Rezerve Edin',
      subtitle: 'Bilgilerinizi doldurun, rezervasyonunuzu kısa sürede onaylayacağız.',
      back: 'Ana Sayfaya Dön',
      name: 'Ad Soyad',
      phone: 'Telefon Numarası',
      pickup: 'Alış Noktası',
      dropoff: 'Bırakış Noktası',
      date: 'Seyahat Tarihi',
      vehicle: 'Araç Seçin',
      submit: 'Rezervasyon Gönder',
      placeholder: 'Rezervasyon formu yakında — anında yardım için WhatsApp üzerinden bize ulaşın.',
    },
  },
}

export const CAR_KEYS = ['gmc', 'sedan', 'staria', 'h1', 'hiace']

export const CAR_ICONS = {
  gmc: '🚙',
  sedan: '🚗',
  staria: '🚐',
  h1: '🚌',
  hiace: '🚐',
}
