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
  body: "Lynn werkt met ruime tijdsloten, zodat er nooit gehaast wordt. De actuele beschikbare dagen en tijden staan altijd in de online agenda.",
  /** Shown on the price list — the salon's own notice. */
  notice:
    "LET OP: Alleen vaste klanten kunnen momenteel een afspraak inplannen!",
} as const;

/* -------------------------------------------------------------------------- */
/* Navigation                                                                  */
/* -------------------------------------------------------------------------- */

export const navigation = [
  { label: "Behandelingen", href: "/behandelingen" },
  { label: "Prijslijst", href: "/prijslijst" },
  { label: "Gallerij", href: "/gallerij" },
  { label: "Over Lynn", href: "/over-lynn" },
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
  benefits: string[];
  /** Formatted price of the entry-level variant, e.g. "vanaf € 42,50". */
  priceFrom: string;
  /**
   * Indicative appointment length. These were NOT published on the old site;
   * they are sensible estimates for the treatment and still need confirming.
   */
  duration: string;
  durationIsEstimate: true;
  image: ImageKey;
  /** Extra photos used on the treatments page. */
  gallery: ImageKey[];
};

export const treatments: Treatment[] = [
  {
    slug: "biab",
    name: "BIAB",
    kicker: "Builder In A Bottle",
    description:
      "Builder In A Bottle is de perfecte keuze voor sterke en langdurige nagels. Deze flexibele builder biedt stevigheid en heeft een natuurlijke look, ideaal voor iedereen die houdt van mooie en gezonde nagels. BIAB is ideaal voor korte tot medium lange nagels en helpt je nagels op een natuurlijke manier te laten groeien.",
    benefits: [
      "Blijft 4 tot 6 weken mooi zitten",
      "Laat je eigen nagel op een natuurlijke manier doorgroeien",
      "Bij regelmatig gebruik ontstaat een c-curve: steviger en slanker",
      "Vegan, cruelty-free en vrij van schadelijke stoffen",
    ],
    priceFrom: "vanaf € 37,50",
    duration: "ca. 75 min",
    durationIsEstimate: true,
    image: "biab-soft-french",
    gallery: ["biab-mocha-parelmoer", "biab-babyboom", "biab-naturel-roze"],
  },
  {
    slug: "gellak",
    name: "Gellak",
    kicker: "Kleur die weken blijft",
    description:
      "Gellak geeft je nagels een mooie kleur en een glans die wekenlang blijft zitten. Kies uit talloze trendy tinten en geniet van perfect gelakte nagels — van een stille nude tot een diep bordeaux.",
    benefits: [
      "Direct droog, dus geen wachttijd na de afspraak",
      "Houdt zijn hoogglans, ook na afwassen en douchen",
      "Ruime keuze uit trendy en klassieke tinten",
      "Netjes afgewerkte nagelriemen als onderdeel van de behandeling",
    ],
    priceFrom: "€ 32,50",
    duration: "ca. 60 min",
    durationIsEstimate: true,
    image: "gellak-donkerrood",
    gallery: ["gellak-rose-chrome", "gellak-aubergine-chrome", "gellak-pastelgeel"],
  },
  {
    slug: "nail-art",
    name: "Nail art",
    kicker: "Van subtiel tot opvallend",
    description:
      "Van subtiele details naar een opvallend design — in de salon is beide mogelijk. Denk aan een fijn hartje op één nagel, french nails in elke kleur die je maar wilt, of trendy leopard nails. Alles wordt met de hand geschilderd tijdens je afspraak.",
    benefits: [
      "Handgeschilderd, volledig afgestemd op jouw smaak",
      "Level 1 vanaf € 0,50 per nagel, level 2 vanaf € 1,00 per nagel",
      "Ook mogelijk op één of twee accentnagels",
      "Parelmoerpoeder over alle nagels voor € 3,00",
    ],
    priceFrom: "vanaf € 0,50 p/n",
    duration: "reken op 15–30 min extra",
    durationIsEstimate: true,
    image: "nailart-bordeaux-french",
    gallery: ["nailart-bloemen", "nailart-pastel-french", "nailart-bordeaux-mix"],
  },
];

/* -------------------------------------------------------------------------- */
/* Price list — exactly as published by the salon                              */
/* -------------------------------------------------------------------------- */

export type PriceRow = { name: string; price: string; note?: string };
export type PriceGroup = {
  title: string;
  intro?: string;
  rows: PriceRow[];
};

export const priceGroups: PriceGroup[] = [
  {
    title: "BIAB behandelingen",
    intro:
      "Een volledige behandeling, inclusief het in model vijlen van je nagels en het verzorgen van je nagelriemen.",
    rows: [
      { name: "BIAB naturel", price: "€ 42,50" },
      { name: "BIAB babyboom", price: "€ 47,50" },
      { name: "BIAB met gellak", price: "€ 47,50" },
      { name: "BIAB herstel & versterk", price: "€ 37,50" },
    ],
  },
  {
    title: "Gellak behandelingen",
    rows: [{ name: "Gellak", price: "€ 32,50" }],
  },
  {
    title: "Nail art",
    intro:
      "De prijsklasse hangt af van de complexiteit van het ontwerp. Geef je wens vooraf door, dan wordt er extra tijd ingepland.",
    rows: [
      { name: "Nail art level 1", price: "€ 0,50", note: "per nagel" },
      { name: "Nail art level 2", price: "€ 1,00", note: "per nagel" },
      { name: "Parelmoerpoeder", price: "€ 3,00", note: "alle nagels" },
    ],
  },
  {
    title: "Verwijderen",
    rows: [
      { name: "Set verwijderen", price: "€ 10,00" },
      { name: "BIAB verwijderen", price: "€ 10,00" },
      { name: "Gellak verwijderen", price: "€ 5,00" },
      { name: "Set andere salon", price: "+ € 5,00", note: "toeslag" },
    ],
  },
];

/** The two nail-art levels, explained in the salon's own words. */
export const nailArtLevels = [
  {
    level: "Level 1",
    price: "€ 0,50 per nagel",
    description:
      "Heb je een eenvoudige nail art waarvoor slechts één kleur lak nodig is, dan valt dit onder level 1. Denk hierbij aan stijlen zoals french nails of een subtiel hartje op een nagel.",
    image: "nailart-pastel-french" as ImageKey,
  },
  {
    level: "Level 2",
    price: "€ 1,00 per nagel",
    description:
      "Level 2 nail art vereist meerdere lagen lak om het gewenste ontwerp te creëren. Denk aan een variatie op french nails of trendy leopard nails. Deze ontwerpen kosten meer tijd en vereisen meer precisie.",
    image: "nailart-bordeaux-mix" as ImageKey,
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

export const differentiators = [
  {
    title: "Persoonlijke aandacht",
    body: "Eén klant tegelijk, in een rustige salon aan huis. Ruim ingeplande afspraken, zodat er tijd is om te overleggen en niets gehaast hoeft.",
  },
  {
    title: "Gecertificeerd",
    body: "In februari 2023 behaalde Lynn haar certificaat voor de BIAB-opleiding (Builder in a Bottle). Werken volgens de regels van hygiëne en nagelgezondheid staat voorop.",
  },
  {
    title: "Professionele producten",
    body: "Er wordt uitsluitend gewerkt met producten van The Gel Bottle en Pink Gellac — vegan, cruelty-free en vrij van schadelijke stoffen.",
  },
];

/* -------------------------------------------------------------------------- */
/* About Lynn                                                                  */
/* -------------------------------------------------------------------------- */

export const about = {
  intro:
    "Welkom! Ik ben Lynn Lesmeister, trotse eigenaresse van Lynn's Nailbar. Met passie voor nagelverzorging en oog voor detail zorg ik ervoor dat elke klant mijn salon verlaat met mooi verzorgde nagels.",
  paragraphs: [
    "In mijn nagelsalon draait alles om een persoonlijke ervaring. Ik geloof in de kracht van verzorgde handen en dat mooie nagels het zelfvertrouwen een boost kunnen geven. Mijn doel is om hoogwaardige, veilige en duurzame nagelverzorging aan te bieden in een ontspannen en fijne omgeving.",
    "Mijn salon moet niet alleen een plek zijn voor mooie nagels, maar ook een plek waar mijn klanten terecht kunnen voor rust en ontspanning — en even kunnen ontsnappen aan de drukte van de dag.",
    "In februari 2023 heb ik mijn certificaat voor de opleiding BIAB (Builder in a Bottle) behaald. Met dit certificaat bied ik hoogwaardige BIAB-behandelingen aan voor gezonde en sterke nagels. Ik streef ernaar mijn salon te laten groeien en mezelf continu te verbeteren.",
  ],
  pillars: [
    {
      title: "Missie",
      body: "Hoogwaardige, veilige en duurzame nagelverzorging aanbieden in een ontspannen en fijne omgeving, met een unieke en persoonlijke ervaring voor iedere klant.",
    },
    {
      title: "Visie",
      body: "Een salon die niet alleen mooie nagels oplevert, maar ook een plek is voor rust en ontspanning — weg van de drukte van de dag.",
    },
    {
      title: "Certificaat",
      body: "BIAB (Builder in a Bottle) treatment, behaald in februari 2023. De basis voor gezonde, sterke nagels die netjes doorgroeien.",
    },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* Reviews — verbatim from the current site                                    */
/* -------------------------------------------------------------------------- */

export type Review = { author: string; quote: string };

export const reviews: Review[] = [
  {
    author: "S. V.",
    quote:
      "Super fijne service en mooi resultaat! Ben er elke keer weer blij mee!",
  },
  {
    author: "J. T.",
    quote:
      "Super leuke en gezellige plek om je nagels te laten doen! Alles is schoon en er wordt netjes gewerkt. Ik loop altijd tevreden de deur uit!",
  },
  {
    author: "C. V.",
    quote:
      "Professionele salon aan huis. Altijd gezellig en ik hou er elke keer weer prachtige nagels aan over. Tijdens de afspraken wordt er goed voor mij gezorgd en mijn nagels worden heel secuur en met beleid behandeld.",
  },
  {
    author: "L. J.",
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
      "BIAB staat voor Builder In A Bottle: een flexibele gel die als een beschermlaag over je eigen nagel gaat. Het geeft stevigheid met een natuurlijke look en is ideaal voor korte tot medium lange nagels. Bij regelmatig gebruik kan er zelfs een c-curve ontstaan, wat je nagels steviger maakt en er slanker uit laat zien.",
  },
  {
    question: "Hoe lang blijft BIAB zitten?",
    answer:
      "De gel blijft 4 tot 6 weken mooi zitten, afhankelijk van je nagelconditie. Voor het beste resultaat wordt aangeraden de BIAB-behandeling regelmatig te herhalen, zodat je nagels rustig kunnen doorgroeien.",
  },
  {
    question: "Is BIAB schadelijk voor mijn eigen nagels?",
    answer:
      "Nee. BIAB is juist bedoeld om je eigen nagel te beschermen en op een natuurlijke manier te laten groeien. Het product is vegan, cruelty-free en vrij van schadelijke stoffen. Bij het afhalen wordt er zorgvuldig gewerkt, zodat je natuurlijke nagel intact blijft.",
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
      "Zeker. Geef je wens van tevoren door in verband met de benodigde tijd. Level 1 (één kleur lak, bijvoorbeeld french nails of een subtiel hartje) kost € 0,50 per nagel. Level 2 (meerdere lagen, bijvoorbeeld leopard nails) kost € 1,00 per nagel.",
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

/** Ordered for visual rhythm: colour and crop alternate down the columns. */
export const galleryImages: ImageKey[] = [
  "biab-soft-french",
  "gellak-donkerrood",
  "biab-mocha-parelmoer",
  "nailart-bloemen",
  "biab-parelmoer",
  "gellak-aubergine-chrome",
  "nailart-pastel-french",
  "biab-babyboom",
  "gellak-rose-chrome",
  "biab-mocha-naturel",
  "nailart-bordeaux-french",
  "gellak-pastelgeel",
  "biab-parelmoer-detail",
  "gellak-kersenrood",
  "biab-naturel-daglicht",
  "nailart-bordeaux-mix",
  "gellak-fuchsia",
  "biab-roze-parelmoer",
  "biab-naturel-roze",
  "kleurenwaaier",
];

/** A shorter, tighter edit used on the home page. */
export const featuredGallery: ImageKey[] = [
  "biab-soft-french",
  "gellak-donkerrood",
  "biab-mocha-parelmoer",
  "nailart-bloemen",
  "biab-parelmoer",
  "gellak-rose-chrome",
  "nailart-pastel-french",
  "biab-babyboom",
];

/** Used in the Instagram strip. */
export const instagramStrip: ImageKey[] = [
  "biab-babyboom",
  "gellak-aubergine-chrome",
  "nailart-bloemen",
  "biab-mocha-naturel",
  "gellak-kersenrood",
  "biab-parelmoer",
  "nailart-pastel-french",
  "gellak-pastelgeel",
];
