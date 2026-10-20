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
  /**
   * The number is published as WhatsApp, not as a phone line — Lynn asked for
   * fewer calls. Every "contact me" link on the site opens a chat instead.
   */
  whatsappHref: "https://wa.me/31650416005",
  email: "Lynns.nailbar1@gmail.com",
  kvk: "90547659",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Molenveldlaan+270+6523+RR+Nijmegen",
  /** Embed URL for the map iframe on the contact page. */
  mapsEmbedUrl:
    "https://www.google.com/maps?q=Molenveldlaan+270,+6523+RR+Nijmegen&output=embed",
} as const;

/** TikTok was dropped in Oct 2026 — Lynn doesn't use it. */
export const links = {
  booking: "https://lynns-nailbar.salonized.com/widget_bookings/new",
  instagram: "https://www.instagram.com/lynns.nailbar/",
  instagramHandle: "@lynns.nailbar",
  googleReviews:
    "https://www.google.com/maps/search/?api=1&query=Lynn%27s+Nailbar+Molenveldlaan+270+Nijmegen",
} as const;

/**
 * The review total on Google, shown next to the stars. The site only carries a
 * handful of the quotes, so the count is stated separately and links out —
 * update it when the number on Google moves.
 */
export const googleReviewCount = 15;

/**
 * The salon is run from home and works strictly by appointment, so there is no
 * walk-in schedule to publish — live availability lives in the booking system.
 *
 * If Lynn ever wants fixed hours on the site, fill this array in and the footer
 * will render a proper opening-hours table automatically. Format:
 * { day: "Maandag", hours: "09:00 – 17:00" } — use `null` hours for a closed day.
 */
export const openingHours: { day: string; hours: string | null }[] = [];

export const availabilityNote = {
  heading: "Uitsluitend op afspraak",
  body: "Alle beschikbare tijden staan in de online agenda. Zie je geen geschikt moment? Stuur me even een berichtje — ik ben flexibel en kijk met je mee naar de mogelijkheden!",
  /** Shown on the price list — the salon's own notice. */
  notice:
    "LET OP: Alleen vaste klanten kunnen momenteel een afspraak inplannen!",
  /** How to book, in Lynn's words — the booking card on /contact. */
  howTo:
    "Je plant je afspraak eenvoudig online via de knop hieronder. Selecteer de juiste behandeling, zodat er precies genoeg tijd wordt ingepland voor jouw gewenste set. Twijfel je over welke behandeling je moet kiezen of kom je er niet uit? Stuur me gerust een berichtje, dan kijk ik met je mee!",
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
/* Home                                                                        */
/* -------------------------------------------------------------------------- */

/**
 * The hero photographs, shown one after another with a slow crossfade.
 *
 * Lynn couldn't choose between a calm single photo and one that changes, so the
 * hero does both: each set holds for several seconds and the fade is long, and
 * the first one is all a reduced-motion visitor ever sees. Keep the set to calm,
 * nude work — a bright colour in the middle of the cycle reads as an advert.
 */
export const heroImages: ImageKey[] = [
  "biab-roze-gouden-ringen",
  "biab-naturel-kort",
  "biab-naturel-amandel",
];

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
  /** Heading over the benefits list, e.g. "Waarom BIAB?". */
  benefitsTitle?: string;
  benefits?: string[];
  /** What the card leads with, e.g. "€ 35,00" or "vanaf € 45,00". */
  price: string;
  /**
   * Set when a treatment has more than one tariff. Rendered as a small table
   * inside the treatment itself, so the prices stay next to what they buy and
   * there is no second price list further down the page.
   */
  variants?: { name: string; price: string }[];
  /** Appointment length as shown on the page. */
  duration: string;
  /**
   * True where the duration was never published by the salon and is still a
   * sensible estimate waiting for Lynn to confirm it.
   */
  durationIsEstimate: boolean;
  image: ImageKey;
  /** Photos shown in the swipeable strip under the main image. */
  gallery: ImageKey[];
};

export const treatments: Treatment[] = [
  {
    slug: "biab",
    name: "BIAB",
    kicker: "Builder In A Bottle",
    description:
      "BIAB (Builder in a Bottle) is een versterkende gel die de natuurlijke nagel helpt groeien en optimaal verstevigt. De flexibele formule voorkomt inscheuren en blijft gemiddeld 3 tot 5 weken mooi zitten, afhankelijk van je nagelconditie en dagelijkse bezigheden. Met keuze uit verschillende nudetinten is dit de ideale behandeling voor wie graag sterke en gezonde nagels wil met een natuurlijke uitstraling.",
    extra:
      "De behandeling Herstel & Versterk is voor wie geen zichtbare kunstnagels wil, maar wel wil genieten van sterkere en langere nagels. Bij deze behandeling wordt een transparante BIAB-laag aangebracht en vervolgens afgewerkt met een matte topcoat voor een zo natuurlijk mogelijke look. Dit is ideaal voor nagelbijters, of als je nagels uit zichzelf moeilijk lang worden.",
    benefitsTitle: "Waarom BIAB?",
    benefits: [
      "Blijft gemiddeld 3 tot 5 weken mooi",
      "Geeft (broze) nagels stevigheid en voorkomt dat ze breken",
      "Keuze uit tientallen verschillende nudetinten",
      "Gebruik van het officiële BIAB-merk: The GelBottle",
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
    image: "biab-pastelgeel",
    gallery: [
      "biab-naturel-kort",
      "biab-roze-gouden-ringen",
      "biab-naturel-amandel",
      "biab-lila",
    ],
  },
  {
    slug: "gellak",
    name: "Gellak",
    kicker: "Eindeloos veel kleuren, wekenlang genieten",
    description:
      "Gellak is dunner dan BIAB, maar dikker dan gewone nagellak. De formule geeft een fijne versteviging en blijft gemiddeld 2 tot 4 weken mooi zitten, afhankelijk van je nagelconditie en dagelijkse bezigheden. De gellak wordt aangebracht over een stevige rubber base en hardt uit onder een LED-lamp. Wil je én de stevigheid van BIAB én een leuk kleurtje? Dan is gellak over BIAB ook mogelijk.",
    benefitsTitle: "Waarom gellak?",
    benefits: [
      "Blijft gemiddeld 2 tot 4 weken mooi",
      "Keuze uit talloze kleuren: van subtiele nudetinten en donkere kleuren tot glitters en cat-eye",
      "Ideaal over de natuurlijke nagel óf als extra kleurlaag over BIAB",
    ],
    price: "€ 35,00",
    duration: "ca. 60 min",
    durationIsEstimate: true,
    image: "gellak-rood-armbanden",
    gallery: [
      "gellak-pruim",
      "gellak-bordeaux-lang",
      "gellak-blauw",
      "gellak-rood-amandel",
    ],
  },
  {
    slug: "nail-art",
    name: "Nail art",
    kicker: "Van subtiel tot opvallend",
    description:
      "Van subtiele tot opvallende designs: alles wordt met de hand gelakt. De prijs hangt af van hoeveel werk het design kost, en gaat per nagel — zo betaal je ook alleen extra voor de nagels die je laat doen.",
    price: "vanaf € 0,50 p/n",
    variants: [
      { name: "Level 1", price: "€ 0,50 per nagel" },
      { name: "Level 2", price: "€ 1,00 per nagel" },
      { name: "Chrome, hele set", price: "€ 3,00" },
    ],
    // Lynn's own figure (Oct 2026), so this one is not an estimate.
    duration: "15–45 min extra",
    durationIsEstimate: false,
    image: "nailart-bordeaux-stippen",
    // The extra sets Lynn picked to click through. The main photo above is left
    // out so the strip never opens on the picture already on screen.
    gallery: [
      "nailart-roze-glitter",
      "nailart-roze-strikjes",
      "nailart-rood-sterren",
      "nailart-donkere-stippen-french",
      "nailart-luipaard",
      "nailart-rode-hartjes",
      "nailart-roze-wit",
      "nailart-bruin-schildpad",
      "nailart-rode-stippen",
      "nailart-swirls-kleur",
      "nailart-pastel-steentjes",
      "nailart-grijs-mix",
      "biab-naturel-roze",
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
 * Aftercare only.
 *
 * The treatment prices are NOT repeated here — they sit with the treatment itself
 * on /behandelingen. Lynn asked for one price per thing and no second table
 * saying the same. Chrome used to be an "Extra's" row here; since Oct 2026 it has
 * its own card next to the nail-art levels, so that group is gone.
 */
export const extraPrices: PriceGroup[] = [
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
 * The cards under the treatments: the two nail-art levels and chrome, in Lynn's
 * own words, each with a photo she picked as a real example.
 */
export type NailArtOption = {
  title: string;
  price: string;
  description: string;
  image: ImageKey;
  /** Says what the photo shows, where that isn't obvious from the card. */
  caption?: string;
};

export const nailArtOptions: NailArtOption[] = [
  {
    title: "Level 1",
    price: "€ 0,50 per nagel",
    // Her Oct 2026 text ended on "net dat beetje extra" a second time; the close
    // keeps the "meer" she approved in September so the phrase isn't doubled.
    description:
      "Level 1 is ideaal voor wie houdt van een subtiele look met nét dat beetje extra. Denk aan eenvoudige ontwerpen zoals french, bloemetjes of minimalistische patronen. Deze designs kosten minder tijd, maar geven je nagels net dat beetje meer.",
    image: "nailart-roze-bloemetjes",
  },
  {
    title: "Level 2",
    price: "€ 1,00 per nagel",
    description:
      "Level 2 omvat gedetailleerdere en ingewikkeldere designs, zoals dierenprints, meerdere kleurencombinaties en 3D-decoraties als charms, steentjes of parels. Deze ontwerpen vragen meer tijd, creativiteit en precisie.",
    image: "nailart-stippen-french",
  },
  {
    title: "Chrome",
    price: "€ 3,00 hele set",
    description:
      "Chrome kan in verschillende kleuren gekozen worden, maar de populairste is ‘Iced’ met het parelmoereffect. Hiermee geef je nét die glimmende finishing touch waarmee elke kleur nog mooier uitkomt.",
    image: "chrome-french",
    caption:
      "Op de foto: BIAB met nail art level 1 (french), level 2 (gouden chrome met charms) en chrome over de hele set.",
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
          "Maak tijdig een nieuwe afspraak om zeker te zijn van een plekje. Bij voorkeur minimaal 3–4 weken van tevoren.",
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
          "Annuleer of verzet je afspraak minimaal 24 uur van tevoren, anders ben ik genoodzaakt 50% van de behandeling in rekening te brengen.",
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
/* About Lynn                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * Her story — Lynn's own text, rewritten by her in Oct 2026.
 *
 * It names her in the second line, so the signature at the end of the page does
 * NOT repeat her name and title. It also says everything the home page's old
 * "Waarom Lynn's Nailbar" block said (certified, personal attention, quality),
 * which is why that block was removed rather than moved here.
 */
export const about = {
  intro: "Welkom bij Lynn’s Nailbar!",
  paragraphs: [
    "Mijn naam is Lynn en ik ben een gecertificeerde nagelstyliste in Nijmegen. Sinds ik in 2023 mijn BIAB-certificaat behaalde bij Florence Beauty & Nails, heb ik mijn techniek steeds verder ontwikkeld om strakke en hoogwaardige resultaten te leveren.",
    "Naast het draaien van mijn salon studeer ik ook nog. Het is een uitdagende combinatie, maar het zorgt voor mij juist voor een fijne afwisseling. Hoe druk het soms ook is, ik neem altijd uitgebreid de tijd voor mijn klanten. Kwaliteit, persoonlijke aandacht en een gezellig kletsuurtje staan bij mij op één!",
    "Of je nu komt voor een natuurlijke look, een vrolijk kleurtje of creatieve nail art, met veel aandacht en oog voor detail zorg ik dat je met een glimlach en prachtig verzorgde nagels de deur uit gaat.",
  ],
  closing: "Zien we elkaar snel in de salon?",
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

/**
 * "Wat is BIAB precies?", "Hoe lang blijft BIAB zitten?" and "Kan ik ook nail
 * art laten zetten?" were removed in Oct 2026: the FAQ sits on /behandelingen,
 * directly under the treatments that already answer them.
 */
export type FaqItem = { question: string; answer: string };

export const faq: FaqItem[] = [
  {
    question: "Wat is het verschil tussen BIAB en gellak?",
    answer:
      "Het grootste verschil zit in de stevigheid en het doel. BIAB is een dikkere builder gel die je eigen nagels versterkt en beschermt tegen breken. Gellak is dunner en focust vooral op kleur. Gellak wordt aangebracht over een rubber base of over BIAB. BIAB blijft gemiddeld 3 tot 5 weken mooi zitten en gellak 2 tot 4 weken.",
  },
  {
    question: "Ik wil geen zichtbare kunstnagels. Kan dat?",
    answer:
      "Ja, daar is de behandeling Herstel & Versterk voor. Hierbij wordt een transparante BIAB-laag aangebracht met een matte topcoat, zodat het er zo natuurlijk mogelijk uitziet. Ideaal voor nagelbijters, of als je nagels uit zichzelf moeilijk lang worden.",
  },
  {
    question: "Is BIAB schadelijk voor mijn eigen nagels?",
    answer:
      "Nee. BIAB is juist bedoeld om je eigen nagel te beschermen en te laten groeien. Er wordt gewerkt met The GelBottle, het officiële BIAB-merk. Bij het verwijderen werk ik zorgvuldig, zodat je natuurlijke nagel gezond blijft.",
  },
  {
    question: "Hoe ver van tevoren moet ik een afspraak maken?",
    answer:
      "Plan je afspraak bij voorkeur minimaal 3 weken van tevoren in. De avondplekken zitten snel vol, dus het is verstandig om hiervoor 4 weken van tevoren te boeken.",
  },
  {
    question: "Ik heb nog een set van een andere salon. Kan dat?",
    answer:
      "Dat kan. Geef bij het inplannen van je afspraak wel aan dat je nog een set van een andere salon draagt en om welk product het gaat, zodat er genoeg tijd wordt ingepland. Hiervoor geldt een toeslag van € 5,00.",
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
 * Shown as two slow, opposite-running strips on /galerij: the first half of the
 * list is the top row, the second half the bottom one. Nude and colour alternate
 * all the way down, so each row keeps that rhythm as it drifts past — and the
 * lightbox walks through the sets in this same order.
 *
 * Reworked in Oct 2026. Lynn's newest sets lead; from the older shoot she asked
 * for the dated photos to go (the stars, flowers, kisses, silver heart, black-
 * and-white, long brown set, and both colour-fan and bottle still lifes).
 */
export const galleryImages: ImageKey[] = [
  "biab-roze-gouden-ringen",
  "gellak-rood-armbanden",
  "biab-naturel-kort",
  "nailart-rood-sterren",
  "chrome-french",
  "gellak-blauw",
  "nailart-roze-glitter",
  "nailart-luipaard",
  "biab-pastelgeel",
  "gellak-bordeaux-lang",
  "biab-lila",
  "nailart-swirls-kleur",
  "nailart-pastel-steentjes",
  "nailart-bruin-schildpad",
  "biab-naturel-amandel",
  "gellak-dieprood",
  "nailart-roze-wit",
  "nailart-bordeaux-stippen",
  "nailart-donkere-stippen-french",
  "gellak-pruim",
  "biab-soft-french",
  "gellak-geel-french",
  "nailart-stippen-french",
  "gellak-rood-amandel",
  "nailart-roze-strikjes",
  "nailart-rode-hartjes",
  "biab-naturel-roze",
  "gellak-donkerrood",
  "biab-babyboom",
  "nailart-grijs-mix",
  "nailart-bloemen",
  "gellak-rose-chrome",
  "nailart-rode-stippen",
];
