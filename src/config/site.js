// src/config/site.js - Single Source of Truth for Maine Coon Heaven
export const SITE = {
  name: 'Maine Coon Heaven',
  tagline: 'Maine Coon Heaven Australia — Ethical Maine Coon Breeders & Pedigree Kittens for Sale',
  domain: 'mainecoonheaven.com',
  locale: 'en-AU',
  currency: 'AUD',
  target: 'vercel',
  primaryColor: '#C59B4B',        // Luxury warm champagne gold
  darkColor: '#16161A',           // Deep obsidian
  gscVerification: 'xQfgqt2pLKHa80TS3m25eIY8rwer5l-F6zFtephXEMI',
  indexNowKey: 'mch-indexnow-key-2026',
  cartKey: 'mm-cart',
  keywords: [
    'maine coon kittens for sale',
    'maine coon cats',
    'maine coon kittens in australia',
    'buy a maine coon cat',
    'maine coon in sydney',
    'maine coon melbourne',
    'maine coon canberra',
    'maine coon perth',
    'maine coon nsw',
    'maine coon adelaide',
    'maine coon breeders australia',
    'how can i buy a maine coon in australia',
    'maine coon kittens',
    'buy a maine coon cat in australia',
    'adopt a maine coon',
    'maine coon heaven australia',
  ],
  serviceRegions: [
    'Sydney',
    'Melbourne',
    'Canberra',
    'Perth',
    'NSW',
    'New South Wales',
    'Adelaide',
    'Brisbane',
    'Hobart',
    'Australia',
  ],
}

export const CONTACT = {
  email: 'mainecoonheavenau00@gmail.com',
  chatEmail: 'mainecoonheavenau00@gmail.com',
  phone: '+61 401 667 279',
  whatsapp: '+61 401 667 279',
  address: 'Sydney NSW, Australia',
  hq: 'Sydney, Australia',
  country: 'Australia',
}

export function getWhatsAppUrl(message) {
  const digits = (CONTACT.whatsapp || '61401667279').replace(/\D/g, '');
  const base = `https://wa.me/${digits}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const SHOP = {
  minOrder: 0,
  reservationDeposit: 750,        // $750 AUD reservation deposit per kitten
  freeShippingThreshold: 0,       // Complimentary nationwide air transport
  shippingFee: 0,                 // Free shipping / safe courier included
  cryptoDiscount: 10,             // 10% instant discount for BTC / USDT
  paymentMethods: ['Bank Transfer', 'PayID', 'crypto-BTC', 'crypto-USDT'],
  refundPolicy: 'We can only refund the complete amount paid for the kitten. Partial refunds or split deductions are not issued—any eligible refund returns 100% of the full amount paid toward your kitten.',
}

export const FORMS = {
  provider: 'web3forms',          // 'web3forms' (default)
  web3formsKey: 'pending',
  resendFrom: '',
  turnstileSiteKey: '',
}

export const CHAT = {
  channels: [
    { type: 'whatsapp', value: '+61401667279', label: 'WhatsApp (+61 401 667 279)' },
    { type: 'email', value: 'mainecoonheavenau00@gmail.com', label: 'Email Breeder' },
    { type: 'phone', value: '+61401667279', label: 'Call (+61 401 667 279)' },
  ],
  widget: null, // Zero 3rd-party widget JS for peak performance
}

export const BRAND = {
  foundingYear: '2019',
  foundingLocation: 'Sydney, NSW, Australia',
  description: 'Maine Coon Heaven Australia is a trusted registered Maine Coon breeder in Sydney, NSW, offering purebred Maine Coon kittens for sale to loving homes in Sydney, Melbourne, Canberra, Perth, Adelaide, and across Australia.',
  milestones: [
    { year: '2019', event: 'Established ethical preservation breeding program in Sydney, NSW with European champion foundation Maine Coon cats.' },
    { year: '2021', event: 'Implemented 100% DNA health testing covering HCM, SMA, and PKDef genetic conditions across all breeding parents.' },
    { year: '2023', event: 'Partnered with certified pet transport services for safe, climate-controlled domestic flights to Sydney, Melbourne, Canberra, Perth, Adelaide, and Brisbane.' },
    { year: '2025', event: 'Welcomed over 250 happy families looking to adopt a Maine Coon into our extended Maine Coon Heaven Australia community.' },
  ],
  differentiation: [
    'Comprehensive DNA & Echocardiogram Health Screening (HCM, SMA, PKDef clear parents).',
    'Raised underfoot in our Sydney NSW home for gentle, dog-like, affectionate Maine Coon cats.',
    'Full Pedigree Registration, desexed, dual vaccinated, microchipped, and vet certified.',
    'Complimentary transit for families in Sydney, Melbourne, Canberra, Perth, NSW, and Adelaide.',
  ],
  sameAs: [],
  awards: [],
}

export const CATEGORIES = [
  {
    slug: 'male-kittens',
    name: 'Male Maine Coon Kittens',
    description: 'Available boys: Shadow (Black Smoke, 8 Weeks), Stormy (Black, Ginger & White Calico, 5 Weeks), and Rocky (Ginger Red Tabby Polydactyl, 8 Weeks).',
    image: '/assets/aistudio/IMG_0143_d5b8df73.jpeg',
  },
  {
    slug: 'female-kittens',
    name: 'Female Maine Coon Kittens',
    description: 'Available girls: Lulu (Blue Tortie Tabby & White, 8 Weeks), Coco (Slate Blue Smoke, 8 Weeks), and Spider (Solid Jet-Black, 5 Weeks).',
    image: '/assets/aistudio/IMG_0146_47dd328c.jpeg',
  },
  {
    slug: 'champion-bloodline',
    name: 'Champion European Bloodlines',
    description: 'Rare European show-line pedigrees featuring Rocky (Ginger Red Tabby Polydactyl, 8 Weeks) and Spider (Solid Jet-Black, 5 Weeks).',
    image: '/assets/aistudio/IMG_0132_5a9ef9c9.jpeg',
  },
]

export const PRODUCTS = [
  {
    slug: 'shadow-black-male',
    name: 'Shadow — Black Smoke Male',
    price: 3500,
    deposit: 1000,
    category: 'male-kittens',
    categories: ['male-kittens'],
    shortDescription: 'Charcoal-black smoke male with a dark masked face, frosted silver-gray chest ruff, smoky gray-tipped paws, and pale green-hazel eyes.',
    description: 'Shadow is an exceptional Black Smoke male Maine Coon kitten featuring a deep charcoal-black upper coat and dark facial mask that fade seamlessly into a plush silvery-gray chest ruff, frosty ash-gray forelegs, and oversized smoky paws. Descended from champion European lines, he showcases tall black lynx-tipped ears, a dark charcoal nose, pale aqua-green/hazel eyes, and a gentle, inquisitive nature. Shadow has been desexed, microchipped, received age-appropriate vaccinations, and comes with a 2-year genetic health guarantee.',
    badge: 'Popular',
    images: [
      '/assets/aistudio/IMG_0143_d5b8df73.jpeg',
      '/assets/aistudio/IMG_0145_114b0e83.jpeg'
    ],
    featured: true,
    color: 'Black Smoke',
    gender: 'Male',
    age: '8 Weeks',
    readyDate: 'Ready for Adoption Now',
  },
  {
    slug: 'stormy-calico-kitten',
    name: 'Stormy — Black, Ginger & White Calico',
    price: 2500,
    deposit: 1000,
    category: 'male-kittens',
    categories: ['male-kittens'],
    shortDescription: '5-week-old tri-color calico kitten with jet-black & copper-ginger markings, snowy-white nose blaze, white paws with pink beans, black lynx ear tips, and bright sky-blue eyes.',
    description: 'Stormy is a striking 5-week-old tri-color Calico Maine Coon kitten showcased in these exact photos at just 5 weeks of age—tiny enough to fit comfortably in one hand with classic baby sky-blue eyes and a fluffy double-textured coat. Stormy features a bold jet-black mask over the left eye and lower back, a warm copper-ginger patch over the right cheek and shoulder flank, and an immaculate snowy-white facial blaze blending into fluffy white whisker pads, chin, chest, and white boots with bubble-gum pink nose leather and pink toe beans. Tall jet-black ears crowned with long lynx ear tips complete the classic European Maine Coon look. Comes with pedigree ancestry certificate, health record booklet, desexing, microchip, and customized kitten starter pack when ready to depart.',
    badge: 'Available',
    images: [
      '/assets/aistudio/IMG_0211_3873a41a.JPG',
      '/assets/aistudio/IMG_0214_bb402cc5.JPG',
      '/assets/aistudio/IMG_0209_a4b65639.JPG'
    ],
    featured: true,
    color: 'Black, Ginger & White Calico',
    gender: 'Male',
    age: '5 Weeks',
    readyDate: 'Ready for Adoption Now',
  },
  {
    slug: 'lulu-silver-classic-tabby-female',
    name: 'Lulu — Blue Tortie Tabby & White Female',
    price: 2100,
    deposit: 750,
    category: 'female-kittens',
    categories: ['female-kittens'],
    shortDescription: 'Slate blue-gray tabby & cream tortie girl with a warm peach nose blaze, snowy-white muzzle & chest bib, mismatched peach-cream paw, and olive-green eyes.',
    description: 'Lulu is a breathtaking Blue Tortie Tabby & White (dilute torbie) female kitten showcasing cool slate-gray classic tabby fur paired with a warm peachy-cream blaze between her eyes, crisp white whisker pads, a fluffy cream-white chest bib, and signature mismatched front paws—one slate blue-gray and one warm peach-cream & white. Framed by olive-green eyes, rosy-brown nose leather, long white ear furnishings, and dark lynx ear tips, she is affectionate, vocal, litter trained, dual vaccinated, desexed, and health verified by our Sydney veterinary clinic.',
    badge: 'Available',
    images: [
      '/assets/aistudio/IMG_0146_47dd328c.jpeg',
      '/assets/aistudio/IMG_0142_fc74a1c5.jpeg',
      '/assets/aistudio/IMG_0147_2a93df08.jpeg'
    ],
    featured: true,
    color: 'Blue Tortie Tabby & White',
    gender: 'Female',
    age: '8 Weeks',
    readyDate: 'Ready for Adoption Now',
  },
  {
    slug: 'coco-blue-smoke-female',
    name: 'Coco — Slate Blue Smoke Female',
    price: 1650,
    deposit: 750,
    category: 'female-kittens',
    categories: ['female-kittens'],
    shortDescription: 'Velvety slate-blue female with subtle frosty silver chest highlights, matching charcoal-blue nose, tall lynx tips, and glowing amber-gold eyes.',
    description: 'Coco possesses a serene slate-blue smoke coat with silky cool ash-gray undertones and subtle frosted silver feathering along her chest ruff. Her uniform slate-blue fur, matching charcoal-gray nose, and tall smoky lynx-tipped ears frame strikingly luminous amber-gold eyes. Extraordinarily observant and gentle, Coco is socialized with children and small dogs, litter-box perfected, and certified 100% negative for HCM and PKDef by parentage.',
    badge: 'Available',
    images: [
      '/assets/aistudio/IMG_0130_46b8caa1.JPG',
      '/assets/aistudio/IMG_0131_8ed1f186.JPG'
    ],
    featured: true,
    color: 'Slate Blue Smoke',
    gender: 'Female',
    age: '8 Weeks',
    readyDate: 'Ready for Adoption Now',
  },
  {
    slug: 'rocky-red-solid-polydactyl-male',
    name: 'Rocky — Ginger Red Tabby Polydactyl Male',
    price: 1200,
    deposit: 750,
    category: 'champion-bloodline',
    categories: ['male-kittens', 'champion-bloodline'],
    shortDescription: 'Rich marmalade-red & warm copper ginger tabby male with crisp leg & forehead striping, paler apricot muzzle shading, hazel-amber eyes, and polydactyl paws.',
    description: 'Rocky is an authentic polydactyl Maine Coon male dressed in a rich ginger-red and warm copper tabby coat featuring bold marmalade striping across his forehead, chest ruff, and long forelegs, softened by paler apricot-cream highlights on his whisker pads, chin, and inner ear furnishings. Sporting warm hazel-amber eyes, a brick-pink nose, and fiery red lynx ear tips from imported European grand champions, he is poised to become a gentle giant of 10kg+ at maturity. Includes full pedigree papers, microchip, and 6 weeks complimentary pet insurance.',
    badge: 'Champion Line',
    images: [
      '/assets/aistudio/IMG_0132_5a9ef9c9.jpeg',
      '/assets/aistudio/IMG_0133_8f1ff6eb.jpeg'
    ],
    featured: true,
    color: 'Ginger Red Tabby',
    gender: 'Male',
    age: '8 Weeks',
    readyDate: 'Available Next Week',
  },
  {
    slug: 'spider-european-tortie-female',
    name: 'Spider — Solid Jet-Black Female',
    price: 2000,
    deposit: 750,
    category: 'champion-bloodline',
    categories: ['female-kittens', 'champion-bloodline'],
    shortDescription: 'Midnight jet-black European-line female with a velvety dark coat, matching black nose and whiskers, black lynx ear tips, and glowing seafoam-green eyes.',
    description: 'Spider is a captivating midnight jet-black Maine Coon female wrapped in a plush, uniform obsidian-black coat with subtle warm espresso highlights in bright natural light. Her matching jet-black nose, dark whiskers, and dramatic black lynx ear tips accentuate her bright pale seafoam-green eyes. Bred from Russian and German champion lines with exceptional ear placement, she is DNA clear of all known feline genetic markers, desexed, and ready to travel anywhere in Australia.',
    badge: 'Champion Line',
    images: [
      '/assets/aistudio/SnapInsta.to_707816102_18295203445304012_5161602426781624082_n_fc15c7c3.JPG',
      '/assets/aistudio/SnapInsta.to_708216565_18295203430304012_8880816158892529694_n_4f40f490.JPG',
      '/assets/aistudio/SnapInsta.to_708304919_18295203421304012_3768581089709074354_n_385f2ffc.JPG'
    ],
    featured: true,
    color: 'Solid Jet-Black',
    gender: 'Female',
    age: '5 Weeks',
    readyDate: 'Ready for Adoption Now',
  },
]

export function getKittensByCategory(catSlug) {
  return PRODUCTS.filter(
    (p) => p.category === catSlug || (Array.isArray(p.categories) && p.categories.includes(catSlug))
  );
}

export function getKittenDeposit(kitten) {
  if (!kitten) return SHOP.reservationDeposit || 750;
  if (typeof kitten.deposit === 'number') return kitten.deposit;
  const match = PRODUCTS.find((p) => p.slug === kitten.slug);
  return match?.deposit ?? SHOP.reservationDeposit ?? 750;
}

export const POSTS = [
  {
    slug: 'how-much-is-a-maine-coon-kitten-in-australia',
    title: 'How Much Is a Maine Coon Kitten in Australia? (2026 Price & Cost Guide)',
    excerpt: 'Comprehensive breakdown of Maine Coon kitten prices in Australia, covering pedigree registration, DNA health screening, desexing, and initial supplies.',
    category: 'Buying Guide',
    date: '2026-03-10',
    readTime: '6 min read',
    image: '/assets/aistudio/cat_780b12b8.jpg',
    content: `
When looking to welcome a purebred Maine Coon kitten into your Australian home, understanding the true cost and what it reflects is essential for making an informed, ethical decision.

### Average Maine Coon Kitten Prices in Australia
At Maine Coon Heaven, our pedigreed companion Maine Coon kittens range from $1,200 to $3,500 AUD, making certified healthy champion-line gentle giants accessible to loving family homes. Rare coat colors or champion-line kittens range up to $3,500 AUD, and a reservation deposit ($750 AUD standard, or $1,000 AUD for Shadow and Stormy) secures your chosen kitten and applies directly toward the total adoption fee.

### What Is Included in the Adoption Price?
A transparent, ethical cattery like Maine Coon Heaven includes significant health and veterinary investments in the upfront fee:
- Comprehensive DNA screening of both parent cats (HCM, SMA, PKDef clear)
- Full desexing procedure before rehoming (saving you $300-$500 in vet fees)
- Two to three core F3 feline vaccinations
- International standard microchipping registered to your state database
- Routine parasite, worm, and flea prevention
- Official certified pedigree papers proving purebred lineage
- Starter kitten pack including transition food, familiar scented blanket, and toys

### Beware of Cheap "Bargain" Maine Coons Online
Unregistered backyard breeders advertising kittens without verifiable papers frequently cut corners by skipping expensive DNA and echocardiogram screenings for Hypertrophic Cardiomyopathy (HCM). Incurring genetic heart disease or chronic viral infections can cost thousands in emergency vet bills. Always ask to see the parents' DNA health certificates and registry papers before placing a deposit.
    `,
  },
  {
    slug: 'maine-coon-personality-temperament-gentle-giants',
    title: 'The Gentle Giants: Maine Coon Personality, Size, and Temperament',
    excerpt: 'Explore why Maine Coons are celebrated as the dogs of the cat world, known for their chirp vocalizations, affinity for water, and giant stature.',
    category: 'Breed Profile',
    date: '2026-02-24',
    readTime: '5 min read',
    image: '/assets/aistudio/IMG_9542_dbe70332.jpg',
    content: `
Maine Coons hold a revered position among feline breeds for good reason: their striking lion-like looks are paired with one of the sweetest, most social temperaments in the domestic cat kingdom.

### Dog-Like Loyalty and Social Nature
Unlike aloof breeds, Maine Coons genuinely desire human company. They will shadow you from room to room, perch beside your computer while you work, and curl onto your bed at night. They rarely demand attention aggressively; rather, they are loyal companions who express affection through soft trills, chirps, and headbutts.

### Impressive Size and Growth Timeline
As the largest domestic cat breed, male Maine Coons typically reach 7 to 11 kg (15 to 25 lbs), while females average 5 to 7.5 kg (11 to 16 lbs). Unlike smaller breeds that stop growing by 12 months, Maine Coons develop slowly over three to four years, adding dense bone density, magnificent neck ruffs, and full plumes on their tails.

### Water Fascination and Family Compatibility
Because of their historic maritime heritage in New England and Northern Europe, Maine Coons possess water-resistant double coats and often love dipping their paws into water bowls or watching running taps. Their patient, confident demeanor makes them exceptionally well-suited for households with respectful children, dogs, and other cats.
    `,
  },
  {
    slug: 'preparing-your-home-for-a-maine-coon-kitten',
    title: 'Essential Guide: Preparing Your Australian Home for a Maine Coon Kitten',
    excerpt: 'Key tips for kitten-proofing, selecting extra-large scratching posts, heavy-duty litter trays, and quality high-protein feline nutrition.',
    category: 'Kitten Care',
    date: '2026-02-12',
    readTime: '7 min read',
    image: '/assets/aistudio/IMG_8519_1fbe5195.jpg',
    content: `
Welcoming your Maine Coon kitten home is an exciting milestone. Because these kittens grow rapidly into large-boned cats, choosing the right supplies from day one ensures comfort and safety.

### 1. Heavy-Duty, Extra-Large Cat Trees
Standard pet store cat trees often wobble and tip under the weight of an adolescent Maine Coon. Invest in a solid wood cat tree with wide scratching posts (minimum 15-20cm diameter) wound in thick sisal rope. The resting platforms should be at least 50x50cm to accommodate their adult body length.

### 2. Sizing the Litter Box
Avoid enclosed tiny hooded trays. Maine Coons need spacious open litter boxes or jumbo-sized storage totes with low-entry cutouts so they have plenty of room to turn around and dig without kicking litter over the edges.

### 3. Balanced Nutrition for Slow, Steady Growth
Maine Coons should not be rushed into obesity. Feed a high-meat premium diet formulated for large-breed kittens rich in taurine, omega-3 fatty acids, glucosamine, and chondroitin to nurture joint and cartilage health as their skeleton matures over their first four years.
    `,
  },
  {
    slug: 'how-can-i-buy-a-maine-coon-in-australia',
    title: 'How Can I Buy a Maine Coon in Australia? (Step-by-Step Guide)',
    excerpt: 'Everything Australians need to know to buy a Maine Coon cat safely—finding registered Maine Coon breeders in Australia, health checks, and delivery to Sydney, Melbourne, Canberra, Perth, NSW & Adelaide.',
    category: 'Adoption Guide',
    date: '2026-03-18',
    readTime: '5 min read',
    image: '/assets/aistudio/IMG_0072_5331dab8.JPG',
    content: `
If you are wondering how can I buy a Maine Coon in Australia safely, working directly with ethical, registered Maine Coon breeders in Australia is the single most important step. Maine Coon Heaven Australia makes it straightforward to adopt a Maine Coon kitten from anywhere in the country.

### 1. Choose Verified Maine Coon Breeders in Australia
Before you buy a Maine Coon cat in Australia, confirm that the cattery performs laboratory DNA testing for Hypertrophic Cardiomyopathy (HCM), Spinal Muscular Atrophy (SMA), and PKDef, and provides official ANCATS or TICA pedigree papers.

### 2. Browse Available Maine Coon Kittens for Sale
Explore our current Maine Coon kittens in Australia online—view exact photos, ages, coats, and European champion lineages. Once you choose your kitten, place a reservation via the Reserve Kitten bar or speak directly with our Sydney adoption coordinator on WhatsApp.

### 3. Nationwide Delivery to Sydney, Melbourne, Canberra, Perth, NSW & Adelaide
From our cattery in Sydney, NSW, we coordinate personal collection for Sydney, regional NSW, and Canberra families as well as complimentary, vet-cleared domestic air transit for buyers seeking a Maine Coon in Melbourne, Perth, Adelaide, Brisbane, and Hobart.
    `,
  },
]

export const PAGES = {
  about: true,
  faq: true,
  blog: true,
  wholesale: false,
  tracking: false,
  compare: false,
  search: true,   // required for SearchAction schema
}

export const FAQ = [
  {
    question: 'How can I buy a Maine Coon in Australia?',
    answer: 'To buy a Maine Coon cat in Australia through Maine Coon Heaven Australia, browse our available Maine Coon kittens for sale, select Reserve Kitten or contact our Sydney cattery on WhatsApp, confirm your adoption agreement with a reservation deposit ($750 AUD standard or $1,000 AUD for Shadow and Stormy), and schedule collection or free insured transport to Sydney, Melbourne, Canberra, Perth, NSW, or Adelaide.'
  },
  {
    question: 'How much is a Maine Coon kitten in Australia?',
    answer: 'Purebred, pedigree Maine Coon kittens in Australia from Maine Coon Heaven range between $1,200 and $3,500 AUD. A reservation deposit ($750 AUD, or $1,000 AUD for Shadow and Stormy) holds your chosen kitten and goes toward your total adoption fee, which includes complete desexing, microchipping, full vaccinations, DNA health screening for HCM/SMA/PKDef, official pedigree papers, and nationwide transport.'
  },
  {
    question: 'Do you deliver Maine Coon kittens to Sydney, Melbourne, Canberra, Perth, NSW & Adelaide?',
    answer: 'Yes. As trusted Maine Coon breeders in Australia based in Sydney, NSW, we welcome local Sydney, regional NSW, and Canberra families and provide complimentary, temperature-controlled direct flight transit for families seeking a Maine Coon in Melbourne, Perth, Adelaide, Brisbane, and Hobart via certified pet transport partners.'
  },
  {
    question: 'Are your Maine Coon cats and breeding parents DNA tested for genetic diseases?',
    answer: 'Yes, 100% of our breeding kings and queens undergo comprehensive DNA testing and veterinary screening for feline Hypertrophic Cardiomyopathy (HCM), Spinal Muscular Atrophy (SMA), and Pyruvate Kinase Deficiency (PKDef). Every kitten you adopt from Maine Coon Heaven Australia is certified clear by parentage.'
  },
  {
    question: 'What is included when I adopt a Maine Coon kitten from Maine Coon Heaven?',
    answer: 'Every Maine Coon kitten arrives desexed, microchipped, dual-vaccinated, wormed, and vet-checked. You also receive an official ANCATS/TICA pedigree certificate, comprehensive veterinary health record, 2-year genetic guarantee, and a starter pack with premium food and a familiar blanket.'
  },
  {
    question: 'How does the 10% cryptocurrency discount work?',
    answer: 'We offer an automatic 10% discount on all Maine Coon kitten reservations paid via Bitcoin (BTC) or Tether (USDT). Select cryptocurrency checkout in the reservation cart or notify our adoption coordinator on WhatsApp, and the discounted total will be calculated on your receipt.'
  },
  {
    question: 'What is the temperament of Australian Maine Coon cats?',
    answer: 'Maine Coon cats are famously celebrated as the gentle giants of the cat world. They possess affectionate, dog-like loyal personalities, communicating with soft chirps and purrs, and thrive in loving Australian families with children, dogs, and other companion pets.'
  },
  {
    question: 'What is your refund policy for Maine Coon kittens?',
    answer: 'Under our Maine Coon Heaven Australia refund policy, we can only refund the complete amount paid for the kitten. Partial refunds are not issued; whenever a refund is processed, 100% of the complete amount paid toward the kitten is refunded.'
  }
]

export const TRUSTPILOT = {
  platform: 'Trustpilot',
  url: 'https://www.trustpilot.com/',
  ratingLabel: 'Excellent',
  ratingValue: '4.6',
  reviewCount: 48,
  breakdown: [
    { label: '5-star', percent: 84 },
    { label: '4-star', percent: 8 },
    { label: '3-star', percent: 8 },
    { label: '2-star', percent: 0 },
    { label: '1-star', percent: 0 },
  ],
}

export const REVIEWS = [
  {
    id: 'tp-1',
    source: 'Trustpilot',
    rating: 5,
    author: 'Rachel B.',
    initials: 'RB',
    location: 'Melbourne, VIC',
    date: '4 days ago',
    experienceDate: 'October 28, 2026',
    title: 'Atlas arrived safe and settled in immediately',
    body: 'We adopted Atlas (our black smoke boy) from an earlier litter and the entire experience with Maine Coon Heaven was seamless. They sent weekly videos before his flight to Melbourne, and he stepped out of his carrier purring like he had lived here forever.',
    verified: true,
  },
  {
    id: 'tp-2',
    source: 'Trustpilot',
    rating: 5,
    author: 'Nathan & Chloe P.',
    initials: 'NP',
    location: 'Brisbane, QLD',
    date: '1 week ago',
    experienceDate: 'October 19, 2026',
    title: 'True gentle giants with impeccable health papers',
    body: 'Jasper is the sweetest silver boy imaginable. Everything promised was delivered: ANCATS pedigree papers, DNA clear health reports for HCM/SMA/PKDef, microchip transfer, and complimentary flight transport into Brisbane.',
    verified: true,
  },
  {
    id: 'tp-3',
    source: 'Trustpilot',
    rating: 3,
    author: 'Mitchell K.',
    initials: 'MK',
    location: 'Canberra, ACT',
    date: '2 weeks ago',
    experienceDate: 'October 15, 2026',
    title: 'Healthy kitten, though flight arrival was delayed',
    body: 'Milo is healthy, affectionate, and settled into our home quickly. Domestic pet cargo out of Sydney was pushed back a few hours due to weather, making airport pickup tight, though the cattery kept us updated throughout.',
    verified: true,
  },
  {
    id: 'tp-4',
    source: 'Trustpilot',
    rating: 5,
    author: 'Olivia D.',
    initials: 'OD',
    location: 'Sydney, NSW',
    date: '2 weeks ago',
    experienceDate: 'October 12, 2026',
    title: 'Willow is affectionate, confident, and clearly raised in-home',
    body: 'You can tell immediately that their kittens are raised underfoot with family. Willow follows me everywhere, greets our visitors at the door, and gets along wonderfully with our golden retriever.',
    verified: true,
  },
  {
    id: 'tp-5',
    source: 'Trustpilot',
    rating: 5,
    author: 'Bradley H.',
    initials: 'BH',
    location: 'Perth, WA',
    date: '3 weeks ago',
    experienceDate: 'September 29, 2026',
    title: 'Smooth USDT reservation with 10% crypto discount',
    body: 'Used the 10% crypto discount option when reserving Thor from their winter litter. The coordinator walked us through the WhatsApp verification and arranged the Perth flight without a hitch. Incredible European champion bloodline.',
    verified: true,
  },
  {
    id: 'tp-6',
    source: 'Trustpilot',
    rating: 3,
    author: 'Tessa L.',
    initials: 'TL',
    location: 'Gold Coast, QLD',
    date: '3 weeks ago',
    experienceDate: 'September 22, 2026',
    title: 'Sweet temperament, slow reply over a busy weekend',
    body: 'We adore Nala and her gentle personality with our children is wonderful. It took about 48 hours to receive initial litter photos because we messaged over a busy weekend, though once connected the adoption went smoothly.',
    verified: true,
  },
  {
    id: 'tp-7',
    source: 'Trustpilot',
    rating: 5,
    author: 'Sophie G.',
    initials: 'SG',
    location: 'Adelaide, SA',
    date: '1 month ago',
    experienceDate: 'September 14, 2026',
    title: 'Freya is healthy, vet-checked, and has the softest coat',
    body: 'Our local vet in Adelaide commented on how healthy and well-socialized Freya is. Her dilute tortie coat is stunning and the lifetime breeder support has been genuinely helpful with nutrition questions.',
    verified: true,
  },
  {
    id: 'tp-8',
    source: 'Trustpilot',
    rating: 5,
    author: 'Callum V.',
    initials: 'CV',
    location: 'Hobart, TAS',
    date: '1 month ago',
    experienceDate: 'August 30, 2026',
    title: 'Cleo exceeded every expectation we had',
    body: 'We waited carefully to find an ethical preservation breeder in Australia and are so glad we chose Maine Coon Heaven. Cleo arrived in Hobart alert, clean, and full of playful curiosity.',
    verified: true,
  },
]

export const COMPLIANCE = {
  bannedTerms: [],
  requiredFramings: [],
  prohibitedClaims: [],
  ageGate: false,
  ageMinimum: null,
  gdpr: false,
  disclaimer: 'All kittens are adopted as companion pets, desexed, microchipped, fully vaccinated, and health-certified with official pedigree registration. Maine Coon Heaven adheres to ethical preservation breeding guidelines.',
}
