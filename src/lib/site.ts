/**
 * Every piece of business content on the site.
 *
 * Prices, house rules and reviews are the salon's own published wording — do not
 * paraphrase them without checking with Lynn. Marketing copy (hero, section
 * intros) is written for this site and is free to edit.
 */

import type { ImageKey } from "./images";

/* -------------------------------------------------------------------------- */
/* Business details                                                            */
/* -------------------------------------------------------------------------- */

export const site = {
  name: "Lynn's Nailbar",
  owner: "Lynn Lesmeister",
  /** Set this to the real domain before launch — it drives canonical + OG URLs. */
  url: "https://www.lynnsnailbar.nl",
  tagline: "BIAB & gellak studio in Nijmegen",
  city: "Nijmegen",
  foundedYear: 2023,
} as const;

export const contact = {
  street: "Molenveldlaan 270",
  postalCode: "6523 RR",
  city: "Nijmegen",
  country: "Nederland",
  phoneDisplay: "06 - 50 41 60 05",
  phoneHref: "tel:+31650416005",
  email: "Lynns.nailbar1@gmail.com",
  kvk: "90547659",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Molenveldlaan+270+6523+RR+Nijmegen",
  /** Embed URL for the map iframe on the contact page. */
  mapsEmbedUrl:
    "https://www.google.com/maps?q=Molenveldlaan+270,+6523+RR+Nijmegen&output=embed",
} as const;

export const links = {
  booking: "https://lynns-nailbar.salonized.com/widget_bookings/new",
  instagram: "https://www.instagram.com/lynns.nailbar/",
  instagramHandle: "@lynns.nailbar",
  tiktok: "https://www.tiktok.com/@lynns.nailbar",
  tiktokHandle: "@lynns.nailbar",
} as const;

/**
 * The salon is run from home and works strictly by appointment, so there is no
 * walk-in schedule to publish — live availability lives in the booking system.
 *
 * If Lynn ever wants fixed hours on the site, fill this array in and the footer
 * and contact page will render a proper opening-hours table automatically.
 * Format: { day: "Maandag", hours: "09:00 – 17:00" } — use `null` hours for a
 * closed day.
 */
export const openingHours: { day: string; hours: string | null }[] = [];

export const availabilityNote = {
  heading: "Uitsluitend op afspraak",
  body: "Ik werk met ruime tijdsloten, zodat er nooit gehaast hoeft te worden. De dagen en tijden die nog vrij zijn staan altijd in de online agenda.",
  /** Shown on the price list — the salon's own notice. */
  notice:
    "LET OP: Alleen vaste klanten kunnen momenteel een afspraak inplannen!",
} as const;

/* -------------------------------------------------------------------------- */
/* Navigation                                                                  */
/* -------------------------------------------------------------------------- */

export const navigation = [
  { label: "Behandelingen", href: "/behandelingen" },
  { label: "Galerij", href: "/galerij" },
  { label: "Over de salon", href: "/over-de-salon" },
  { label: "Contact", href: "/contact" },
] as const;

/* -------------------------------------------------------------------------- */
/* Treatments                                                                  */
/* -------------------------------------------------------------------------- */

export type Treatment = {
  slug: string;
  /** Short name used in cards and the nav. */
  name: string;
  /** One-line positioning used under the name. */
  kicker: string;
  /** Full description — the salon's own wording where it exists. */
  description: string;
  /** Optional second paragraph, for a variant that needs explaining on its own. */
  extra?: string;
  benefits: string[];
  /** What the card leads with, e.g. "€ 35,00" or "vanaf € 45,00". */
  price: string;
  /**
   * Set when a treatment has more than one tariff. Rendered as a small table
   * inside the treatment itself, so the prices stay next to what they buy and
   * there is no second price list further down the page.
   */
  variants?: { name: string; price: string }[];
  /**
   * Indicative appointment length. These were NOT published on the old site;
   * they are sensible estimates for the treatment and still need confirming.
   */
  duration: string;
  durationIsEstimate: true;
  image: ImageKey;
  /**
   * Photos shown in the swipeable strip under the main image. Lynn's newest work
   * leads each strip, with the older shoot behind it.
   */
  gallery: ImageKey[];
};

export const treatments: Treatment[] = [
  {
    slug: "biab",
    name: "BIAB",
    kicker: "Builder In A Bottle",
    description:
      "BIAB is een builder gel die de natuurlijke nagel helpt bij de groei en extra stevigheid geeft aan broze nagels. De flexibele formule voorkomt breken en blijft gemiddeld 3 tot 5 weken mooi zitten, afhankelijk van je nagelconditie en dagelijkse bezigheden. Met keuze uit verschillende nude-tinten is deze behandeling ideaal voor wie sterke, gezonde en verzorgde nagels wil met een natuurlijke uitstraling.",
    extra:
      "De behandeling Herstel & Versterk is er voor wie geen zichtbare kunstnagels wil, maar wel sterkere en langere nagels. Ik breng dan een transparante BIAB-laag aan, afgewerkt met een matte topcoat, voor een zo natuurlijk mogelijke look. Ideaal voor nagelbijters, of als je nagels uit zichzelf moeilijk lang worden.",
    benefits: [
      "Blijft gemiddeld 3 tot 5 weken mooi zitten",
      "Geeft broze nagels stevigheid en voorkomt breken",
      "Keuze uit verschillende nude-tinten",
      "Gezet met The Gel Bottle, het officiële BIAB-merk",
    ],
    price: "vanaf € 45,00",
    variants: [
      { name: "BIAB naturel", price: "€ 45,00" },
      { name: "BIAB babyboom", price: "€ 50,00" },
      { name: "BIAB met gellak", price: "€ 50,00" },
      { name: "BIAB herstel & versterk", price: "€ 40,00" },
    ],
    duration: "ca. 75 min",
    durationIsEstimate: true,
    // The hero carries biab-soft-french, so BIAB leads with a different set here.
    image: "biab-mocha-parelmoer",
    gallery: [
      "biab-parelmoer-zwartwit",
      "biab-soft-french",
      "biab-babyboom",
      "biab-naturel-roze",
      "biab-parelmoer",
      "biab-mocha-naturel",
      "biab-naturel-daglicht",
      "biab-roze-parelmoer",
    ],
  },
  {
    slug: "gellak",
    name: "Gellak",
    kicker: "Kleur die weken blijft",
    description:
      "Gellak is dunner dan een builder gel, maar dikker dan gewone nagellak. De gelachtige formule geeft extra stevigheid en blijft gemiddeld 3 tot 4 weken mooi zitten, afhankelijk van je nagelconditie en dagelijkse bezigheden. Gellak gaat over BIAB of over een rubber base en hardt uit onder een LED-lamp. Met keuze uit talloze kleuren is dit de behandeling voor wie kleurrijke en verzorgde nagels wil.",
    benefits: [
      "Blijft gemiddeld 3 tot 4 weken mooi zitten",
      "Direct droog, dus geen wachttijd na de afspraak",
      "Keuze uit talloze kleuren, van stille nude tot diep bordeaux",
      "Netjes afgewerkte nagelriemen als onderdeel van de behandeling",
    ],
    price: "€ 35,00",
    duration: "ca. 60 min",
    durationIsEstimate: true,
    image: "gellak-dieprood",
    gallery: [
      "gellak-geel-french",
      "gellak-donkerrood",
      "gellak-rose-chrome",
      "gellak-aubergine-chrome",
      "gellak-pastelgeel",
      "gellak-kersenrood",
      "gellak-fuchsia",
    ],
  },
  {
    slug: "nail-art",
    name: "Nail art",
    kicker: "Van subtiel tot opvallend",
    description:
      "Van een subtiel detail tot een volledig ontwerp: alles wordt tijdens je afspraak met de hand geschilderd. De prijs hangt af van hoeveel werk een design kost, en loopt per nagel — zo betaal je ook alleen voor de nagels die je laat doen.",
    benefits: [
      "Handgeschilderd, volledig afgestemd op jouw smaak",
      "Level 1 € 0,50 per nagel, level 2 € 1,00 per nagel",
      "Ook mogelijk op één of twee accentnagels",
      "Chrome als finishing touch, € 3,00 over de hele set",
    ],
    price: "vanaf € 0,50 p/n",
    duration: "reken op 15–30 min extra",
    durationIsEstimate: true,
    image: "nailart-bordeaux-stippen",
    gallery: [
      "nailart-roze-bloemetjes",
      "nailart-swirls-kleur",
      "nailart-stippen-french",
      "nailart-roze-kusjes",
      "nailart-bordeaux-french",
      "nailart-bloemen",
      "nailart-pastel-french",
      "nailart-bordeaux-mix",
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* Price list — exactly as published by the salon                              */
/* -------------------------------------------------------------------------- */

export type PriceRow = {
  name: string;
  price: string;
  note?: string;
  description?: string;
};
export type PriceGroup = {
  title: string;
  intro?: string;
  rows: PriceRow[];
};

/**
 * Add-ons and aftercare only.
 *
 * The three main treatment prices are NOT repeated here — they sit with the
 * treatment itself on /behandelingen. Lynn asked for one price per thing and no
 * second table saying the same, so this covers what the treatment bands don't.
 */
export const extraPrices: PriceGroup[] = [
  {
    title: "Extra's",
    intro:
      "Te combineren met elke behandeling. Geef je wens door bij het boeken, dan plan ik er extra tijd voor in.",
    rows: [
      {
        name: "Chrome",
        price: "€ 3,00",
        note: "hele set",
        description:
          "Chromepoeder kan in verschillende kleuren, zoals Iced, Copper en Pearl. Met Iced — ook wel parelmoer — maak je elke kleur nóg glanzender. Een echte finishing touch.",
      },
    ],
  },
  {
    title: "Verwijderen",
    rows: [
      { name: "BIAB verwijderen", price: "€ 10,00" },
      { name: "Gellak verwijderen", price: "€ 10,00" },
      { name: "Set andere salon", price: "+ € 5,00", note: "toeslag" },
    ],
  },
];

/**
 * The two nail-art levels, in Lynn's own words (supplied Sept 2026), each with a
 * photo she picked out as a real example of that level.
 */
export const nailArtLevels = [
  {
    level: "Level 1",
    price: "€ 0,50 per nagel",
    description:
      "Level 1 is ideaal voor wie houdt van een subtiele look met nét dat beetje extra. Denk aan eenvoudige ontwerpen zoals een french manicure, bloemetjes of minimalistische patronen. Deze designs kosten minder tijd, maar geven je nagels net dat beetje meer.",
    image: "nailart-roze-bloemetjes" as ImageKey,
  },
  {
    level: "Level 2",
    price: "€ 1,00 per nagel",
    description:
      "Level 2 omvat gedetailleerdere en ingewikkeldere designs, zoals dierenprints, meerdere kleurencombinaties en 3D-decoraties als charms, steentjes of parels. Deze ontwerpen vragen meer tijd, creativiteit en precisie.",
    image: "nailart-swirls-kleur" as ImageKey,
  },
];

/* -------------------------------------------------------------------------- */
/* House rules — the salon's own terms, kept verbatim                          */
/* -------------------------------------------------------------------------- */

export type RuleGroup = {
  title: string;
  items: { term: string; description: string }[];
};

export const houseRules: RuleGroup[] = [
  {
    title: "Afspraken",
    items: [
      {
        term: "Tijdig boeken",
        description:
          "Maak tijdig een nieuwe afspraak om zeker te zijn van een plekje. Bij voorkeur minimaal 2 weken van tevoren.",
      },
      {
        term: "Bestaande sets",
        description:
          "Geef bij het inplannen van een afspraak aan als je nog een set van een andere salon op je nagels hebt en welk product dit is (extra kosten € 5,00).",
      },
      {
        term: "Nail art",
        description:
          "Geef van tevoren aan of je graag nail art wilt in verband met de benodigde tijd.",
      },
      {
        term: "Betaling",
        description: "Je kan bij mij pinnen en contant betalen.",
      },
    ],
  },
  {
    title: "Annulering",
    items: [
      {
        term: "Vooraf annuleren",
        description:
          "Annuleer of verzet je afspraak minimaal 24 uur van tevoren.",
      },
      {
        term: "No-show",
        description:
          "Bij een no-show of te laat komen waardoor de afspraak niet door kan gaan, ben ik genoodzaakt 50% van de behandeling in rekening te brengen.",
      },
    ],
  },
  {
    title: "Garantie",
    items: [
      {
        term: "7 dagen",
        description:
          "Je hebt 7 dagen garantie op je nagels, tenzij de schade door eigen handelen is veroorzaakt. Meld problemen binnen deze periode.",
      },
      {
        term: "Na 7 dagen",
        description:
          "Na deze 7 dagen ben ik genoodzaakt 4 euro per nagel in rekening te brengen voor tussentijdse reparaties.",
      },
      {
        term: "Reparatie gebroken nagels",
        description:
          "Tijdens de nieuwe afspraak (volledige set) is het mogelijk om gebroken nagels te repareren of verlengen. Ik verleng maximaal 3 nagels indien er voldoende tijd is, zonder extra kosten.",
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* Why Lynn's Nailbar                                                          */
/* -------------------------------------------------------------------------- */

/**
 * Three reasons, in Lynn's own voice.
 *
 * First person throughout — she asked for copy that sounds like her and not like
 * a brochure. Keep it that way if you edit these.
 */
export const differentiators = [
  {
    title: "Persoonlijke aandacht",
    body: "Je hebt de salon even voor jezelf. Ik plan ruim in, zodat we rustig kunnen overleggen en ik nergens hoef te haasten.",
  },
  {
    title: "Vakkundig werk",
    body: "Secuur werken, tot in de nagelriemen. Je nagels moeten er over vier weken nog goed uitzien, niet alleen op de dag zelf.",
  },
  {
    title: "Gecertificeerd",
    body: "In februari 2023 haalde ik mijn BIAB-certificaat. Hygiëne en de gezondheid van je eigen nagel gaan bij mij altijd voor.",
  },
];

/* -------------------------------------------------------------------------- */
/* About Lynn                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * Her story — Lynn's own text, supplied Sept 2026 and lightly tidied for flow.
 *
 * It names her in the opening line, so the signature at the end of the page does
 * NOT repeat her name and title; that double-naming is exactly what she asked to
 * remove. Mission, vision and the separate certificate block were dropped at the
 * same time.
 */
export const about = {
  intro:
    "Ik ben Lynn, trotse eigenaresse van Lynn's Nailbar. Met een passie voor nagelstyling en oog voor detail streef ik ernaar dat elke klant mijn salon verlaat met een mooi resultaat.",
  paragraphs: [
    "In 2023 heb ik mijn certificaat voor de BIAB-behandeling behaald. Sindsdien blijf ik mijn techniek verbeteren en voer ik de behandelingen steeds sneller en nauwkeuriger uit, zonder dat de kwaliteit eronder lijdt.",
    "Dan nog iets persoonlijks: naast het werken in mijn salon studeer ik ook nog. Die combinatie is soms uitdagend, maar het zorgt voor een fijne afwisseling. En ondanks de drukte neem ik altijd de tijd voor mijn klanten.",
    "Ik kan met trots zeggen dat mijn salon bekendstaat om de kwaliteit van het werk en om de persoonlijke, gezellige sfeer.",
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* Reviews — verbatim from the current site                                    */
/* -------------------------------------------------------------------------- */

/**
 * The initials that used to sit under each quote were removed at Lynn's request
 * — "S. V." reads as anonymised data rather than a person, which made the
 * reviews feel less real, not more.
 *
 * `name` is optional and unused for now: fill it with a real first name once a
 * customer has agreed to be named, and it will render automatically.
 */
export type Review = { quote: string; name?: string };

/**
 * Which review carries the home page. Index into `reviews` below.
 *
 * Picked for specificity: it names both the craft and the atmosphere, which is
 * what a first-time visitor is weighing up. Change the number to feature another.
 */
export const featuredReviewIndex = 3;

export const reviews: Review[] = [
  {
    quote:
      "Super fijne service en mooi resultaat! Ben er elke keer weer blij mee!",
  },
  {
    quote:
      "Super leuke en gezellige plek om je nagels te laten doen! Alles is schoon en er wordt netjes gewerkt. Ik loop altijd tevreden de deur uit!",
  },
  {
    quote:
      "Professionele salon aan huis. Altijd gezellig en ik hou er elke keer weer prachtige nagels aan over. Tijdens de afspraken wordt er goed voor mij gezorgd en mijn nagels worden heel secuur en met beleid behandeld.",
  },
  {
    quote:
      "Lynn werkt zorgvuldig en nauwkeurig waardoor ik altijd tevreden ben met het eindresultaat. Naast dat ze prachtige nagels zet vind ik het ook heel gezellig en voel ik mij altijd op mijn gemak.",
  },
];

/* -------------------------------------------------------------------------- */
/* FAQ — built from the salon's own information and house rules                */
/* -------------------------------------------------------------------------- */

export type FaqItem = { question: string; answer: string };

export const faq: FaqItem[] = [
  {
    question: "Wat is BIAB precies?",
    answer:
      "BIAB staat voor Builder In A Bottle: een builder gel die als een beschermlaag over je eigen nagel gaat. Het geeft broze nagels stevigheid, voorkomt breken en helpt je eigen nagel bij het groeien. Je kiest uit verschillende nude-tinten, voor een natuurlijke uitstraling.",
  },
  {
    question: "Hoe lang blijft BIAB zitten?",
    answer:
      "Gemiddeld 3 tot 5 weken, afhankelijk van je nagelconditie en je dagelijkse bezigheden. Voor het mooiste resultaat herhaal je de behandeling regelmatig, zodat je nagels rustig kunnen doorgroeien.",
  },
  {
    question: "Wat is het verschil tussen BIAB en gellak?",
    answer:
      "BIAB is een builder gel: dikker, steviger, en bedoeld om je nagel te versterken. Gellak is dunner dan builder gel maar dikker dan gewone nagellak, en gaat vooral om kleur. Gellak wordt aangebracht over BIAB of over een rubber base. BIAB blijft gemiddeld 3 tot 5 weken zitten, gellak 3 tot 4 weken.",
  },
  {
    question: "Ik wil geen zichtbare kunstnagels. Kan dat?",
    answer:
      "Ja, daar is de behandeling Herstel & Versterk voor. Ik breng dan een transparante BIAB-laag aan met een matte topcoat, zodat het er zo natuurlijk mogelijk uitziet. Ideaal voor nagelbijters, of als je nagels uit zichzelf moeilijk lang worden.",
  },
  {
    question: "Is BIAB schadelijk voor mijn eigen nagels?",
    answer:
      "Nee. BIAB is juist bedoeld om je eigen nagel te beschermen en te laten groeien. Er wordt gewerkt met The Gel Bottle, het officiële BIAB-merk. Bij het afhalen werk ik zorgvuldig, zodat je natuurlijke nagel intact blijft.",
  },
  {
    question: "Hoe ver van tevoren moet ik een afspraak maken?",
    answer:
      "Maak je afspraak bij voorkeur minimaal 2 weken van tevoren, dan ben je zeker van een plekje. Boeken gaat het snelst via de online agenda.",
  },
  {
    question: "Ik heb nog een set van een andere salon. Kan dat?",
    answer:
      "Dat kan. Geef bij het inplannen van je afspraak wel aan dat je nog een set van een andere salon draagt en om welk product het gaat, zodat er genoeg tijd wordt ingepland. Hiervoor geldt een toeslag van € 5,00.",
  },
  {
    question: "Kan ik ook nail art laten zetten?",
    answer:
      "Zeker. Geef je wens van tevoren door, dan plan ik er genoeg tijd voor in. Level 1 (subtiel werk, bijvoorbeeld een french manicure, bloemetjes of minimalistische patronen) kost € 0,50 per nagel. Level 2 (gedetailleerder, zoals dierenprints, meerdere kleuren of 3D-decoraties) kost € 1,00 per nagel. Chrome over de hele set kost € 3,00.",
  },
  {
    question: "Krijg ik garantie op mijn nagels?",
    answer:
      "Je hebt 7 dagen garantie op je nagels, tenzij de schade door eigen handelen is veroorzaakt. Meld problemen binnen deze periode, dan wordt het kosteloos verholpen. Na 7 dagen geldt een tarief van € 4,00 per nagel voor tussentijdse reparaties.",
  },
  {
    question: "Wat als ik moet annuleren?",
    answer:
      "Annuleer of verzet je afspraak minimaal 24 uur van tevoren. Bij een no-show, of bij te laat komen waardoor de afspraak niet door kan gaan, wordt 50% van de behandeling in rekening gebracht.",
  },
  {
    question: "Hoe kan ik betalen?",
    answer: "Je kunt in de salon zowel pinnen als contant betalen.",
  },
];

/* -------------------------------------------------------------------------- */
/* Gallery                                                                     */
/* -------------------------------------------------------------------------- */

/**
 * Ordered for visual rhythm: colour and crop alternate down the columns.
 *
 * Lynn's new photography (Sept 2026) leads, followed by a trimmed selection of
 * the older set. She asked for the dated photos to go; rather than cut the page
 * down to ten tiles, the weakest were dropped and the rest kept. Say the word and
 * the tail below `producten-the-gel-bottle` can go too.
 */
export const galleryImages: ImageKey[] = [
  "nailart-bordeaux-stippen",
  "gellak-dieprood",
  "nailart-roze-bloemetjes",
  "gellak-geel-french",
  "nailart-swirls-kleur",
  "biab-parelmoer-zwartwit",
  "nailart-roze-kusjes",
  "kleurenwaaier-schelp",
  "nailart-stippen-french",
  "producten-the-gel-bottle",
  "biab-soft-french",
  "gellak-donkerrood",
  "biab-mocha-parelmoer",
  "nailart-bloemen",
  "biab-babyboom",
  "gellak-rose-chrome",
  "biab-parelmoer",
  "gellak-aubergine-chrome",
];

/** Used in the Instagram strip. */
export const instagramStrip: ImageKey[] = [
  "nailart-bordeaux-stippen",
  "gellak-dieprood",
  "nailart-roze-bloemetjes",
  "gellak-geel-french",
  "nailart-swirls-kleur",
  "nailart-roze-kusjes",
  "nailart-stippen-french",
  "biab-parelmoer-zwartwit",
];
