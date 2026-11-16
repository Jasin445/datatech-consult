/**
 * Photography registry. Every file in public/images/photos must be listed here (tests/photos.test.ts enforces it).
 *
 * All current photos are stock images used under the Unsplash License (free commercial use, no attribution
 * required; https://unsplash.com/license), downloaded and served from our own domain.
 * They are ILLUSTRATIVE: alt text describes the scene only and must never imply that the people shown are
 * Datatechhub staff, clients or project participants. Do not name a place unless the source confirms it.
 * Replace with commissioned photography when available (see RELEASE_CHECKLIST.md).
 */
export type PhotoLicense = "Unsplash License";

export type Photo = {
  src: string;
  width: number;
  height: number;
  alt: string;
  license: PhotoLicense;
  sourceUrl: string;
  /** Photographer as credited on the source page; null when it could not be read. */
  photographer: string | null;
};

const unsplash = (file: string, width: number, height: number, alt: string, sourceUrl: string, photographer: string | null): Photo => ({
  src: `/images/photos/${file}.jpg`,
  width,
  height,
  alt,
  license: "Unsplash License",
  sourceUrl,
  photographer,
});

export const photos = {
  teamOffice: unsplash("team-office", 1800, 1202, "Colleagues working together at a table in a bright office", "https://unsplash.com/photos/photography-of-people-inside-room-during-daytime-rg1y72eKw6o", "Christina @ wocintechchat.com"),
  threeColleagues: unsplash("three-colleagues", 1800, 1202, "Three colleagues talking across a desk with laptops", "https://unsplash.com/photos/photography-of-three-women-sits-beside-table-inside-room-during-daytime-UcZcsHSp8o4", "Christina @ wocintechchat.com"),
  oneToOne: unsplash("one-to-one", 1800, 1202, "Two people in a quiet one-to-one working session beside tall windows", "https://unsplash.com/photos/two-women-sits-of-padded-chairs-while-using-laptop-computers-HocFQHhGjDE", "Christina @ wocintechchat.com"),
  analystWindow: unsplash("analyst-window", 1800, 1202, "A woman working on a laptop in a chair by a window", "https://unsplash.com/photos/woman-sits-on-padded-chair-while-using-macbook-during-daytime-vLwH8bWoi_8", "Christina @ wocintechchat.com"),
  collaborationCouch: unsplash("collaboration-couch", 1800, 1200, "Three women reviewing work together on a laptop", "https://unsplash.com/photos/a-group-of-people-sitting-on-a-couch-looking-at-a-laptop-M7ALc3UuX_g", "Iwaria Inc."),
  conversation: unsplash("conversation", 1800, 1200, "A woman explaining something during a conversation in an open office", "https://unsplash.com/photos/shallow-focus-photo-of-woman-in-white-sleeveless-shirt-ddkuU4eocK8", "AllGo - An App For Plus Size People"),
  executives: unsplash("executives", 1261, 1800, "Two men in suits walking and talking outside an office building", "https://unsplash.com/photos/man-in-blue-suit-standing-beside-man-in-gray-suit-vM01WKm5v-E", "Khalid Boutchich"),
  smeDesk: unsplash("sme-desk", 1800, 1013, "A young woman working at a desk in a small office", "https://unsplash.com/photos/young-woman-working-at-a-desk-in-an-office--ZRtrH-RubE", "Vitaly Gariev"),
  laptopFocus: unsplash("laptop-focus", 1201, 1800, "A woman typing on a laptop at a wooden bench", "https://unsplash.com/photos/woman-typing-on-laptop-at-workspace-RMK8Lt3Ac2s", "FOTOGRAFÍA EDITORIAL"),
  codeLaptop: unsplash("code-laptop", 1200, 1800, "Hands typing code on a laptop", "https://unsplash.com/photos/person-using-black-laptop-computer-Esu7vO5THyE", null),
  bridgeNight: unsplash("lekki-bridge-night", 1800, 1201, "A cable-stayed bridge lit up at night over dark water", "https://unsplash.com/photos/a-large-bridge-over-a-body-of-water-at-night-Ww2j734hEcA", "Opeyemi Adisa"),
  bridgePylon: unsplash("bridge-pylon", 1292, 1800, "The pylon and cables of a tall bridge against a pale sky", "https://unsplash.com/photos/a-very-tall-bridge-over-a-large-body-of-water-kF0-RhpHhRA", "Tunde Buremo"),
  riverCity: unsplash("lagos-river", 1800, 1350, "Boats on a wide river beside a city and a long bridge, seen from above", "https://unsplash.com/photos/boats-navigate-a-wide-river-beside-a-modern-city-bridge-EMjpo0YjHPw", "Malik Buraimoh"),
  skyline: unsplash("lagos-skyline", 1012, 1800, "A city skyline and highway beside the water under a blue sky", "https://unsplash.com/photos/city-skyline-under-blue-sky-during-daytime-9ySEZ-ugtJA", "Nupo Deyon Daniel"),
  marketAerial: unsplash("market-aerial", 1200, 1800, "A busy street market with colourful umbrellas, seen from above", "https://unsplash.com/photos/aerial-view-of-a-bustling-street-market-with-colorful-umbrellas-IWMQ5P9HxYM", "Fahd Aminu"),
  streetAerial: unsplash("street-aerial", 1200, 1800, "A crowded city street full of traffic and people, seen from above", "https://unsplash.com/photos/bustling-city-street-with-dense-traffic-and-pedestrians-from-above-et46vZKo6HQ", "Fahd Aminu"),
  workshop: unsplash("workshop", 1800, 1200, "A man talking a small team through something at a meeting table with laptops", "https://unsplash.com/photos/a-group-of-people-sitting-around-a-table-with-laptops-YDEiseFR_Q8", "UK Black Tech"),
  pairWorking: unsplash("pair-working", 1800, 1200, "Two colleagues working through something together at a table", "https://unsplash.com/photos/a-man-and-a-woman-sitting-at-a-table-R5_hobznBfY", "The Jopwell Collection"),
  roundtable: unsplash("roundtable", 1800, 1200, "Five people talking around a meeting table", "https://unsplash.com/photos/five-people-sitting-at-table-and-talking-jzonFmreWok", "Christina @ wocintechchat.com"),
  whiteboardLaptop: unsplash("whiteboard-laptop", 1800, 1200, "A man holding a laptop beside a whiteboard covered in notes", "https://unsplash.com/photos/man-wearing-gray-polo-shirt-beside-dry-erase-board-3V8xo5Gbusk", "Kaleidico"),
  skylineWide: unsplash("city-skyline-two", 1800, 1200, "A city skyline of tall buildings under a pale sky", "https://unsplash.com/photos/a-city-skyline-with-tall-buildings-in-the-background-MYtooZT15SA", "Tedd_"),
  focusedWork: unsplash("focused-work", 1800, 1200, "A man working on a laptop at a table by a window", "https://unsplash.com/photos/a-man-sitting-at-a-table-using-a-laptop-computer-xXY14yB1JWA", "Sweet Life"),
  shopPhone: unsplash("shop-phone", 1800, 1200, "A shopkeeper in an apron checking his phone behind the counter", "https://unsplash.com/photos/a-man-in-an-apron-looking-at-a-cell-phone-uk3ey_vhDKA", "Ali Mkumbwa"),
  stallRecords: unsplash("stall-records", 1800, 1286, "A stallholder with her phone beside a board of handwritten figures", "https://unsplash.com/photos/a-woman-standing-in-front-of-a-fruit-stand-holding-a-cell-phone-5dFuO02OHh0", "Ali Mkumbwa"),
  storeCounter: unsplash("store-counter", 1800, 1200, "A woman at the counter of a well-stocked shop", "https://unsplash.com/photos/a-woman-sitting-at-a-counter-in-a-store-EOkN2pRjFsg", "Ali Mkumbwa"),
  fieldPhone: unsplash("field-phone", 1200, 1800, "A man crouching in a field, entering something on his phone", "https://unsplash.com/photos/man-crouching-in-grass-looking-at-phone-CdqIYbGcAJI", "Oswald Elsaboath"),
  farmCrops: unsplash("farm-crops", 1800, 1202, "A farmer checking his crops in a green field", "https://unsplash.com/photos/a-farmer-tends-to-his-crops-in-a-green-field-1AoGjqdyDLU", "Richard Nyoni"),
  colleaguesLaptop: unsplash("two-colleagues-laptop", 1800, 1200, "Two women working through something on a laptop in a bright office", "https://unsplash.com/photos/two-women-sitting-at-a-table-with-a-laptop-P67JZsh6wr0", "Ninthgrid"),
  laptopReview: unsplash("laptop-review", 1800, 1200, "A man and a woman reviewing something together on a laptop", "https://unsplash.com/photos/a-man-and-a-woman-are-looking-at-a-laptop-KljeL88lgkk", "Ninthgrid"),
  tabletProfessional: unsplash("tablet-professional", 1350, 1800, "A smiling woman in a headscarf working on a tablet at a desk", "https://unsplash.com/photos/a-woman-sitting-at-a-table-with-a-tablet-jLKDfxikHzM", "Francis Odeyemi"),
  dataCentre: unsplash("data-centre", 1800, 1010, "Server racks with network cables and indicator lights in a data centre", "https://unsplash.com/photos/cable-network-M5tzZtFCOfs", "Taylor Vick"),
  analyticsDashboard: unsplash("analytics-dashboard", 1800, 1200, "A laptop screen showing performance analytics charts and metrics", "https://unsplash.com/photos/graphs-of-performance-analytics-on-a-laptop-screen-JKUTrJ4vK00", "Luke Chesser"),
  aiRobot: unsplash("ai-robot", 1800, 1200, "A white humanoid robot holding a tablet", "https://unsplash.com/photos/white-robot-near-brown-wall-2EJCSULRwC8", "Alex Knight"),
} as const satisfies Record<string, Photo>;

export type PhotoId = keyof typeof photos;
