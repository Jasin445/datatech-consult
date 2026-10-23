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
  boardroom: unsplash("boardroom", 1800, 1202, "A team meeting around a long boardroom table with laptops open", "https://unsplash.com/photos/group-of-people-sitting-beside-rectangular-wooden-table-with-laptops-faEfWCdOKIg", "Christina @ wocintechchat.com"),
  teamOffice: unsplash("team-office", 1800, 1202, "Colleagues working together at a table in a bright office", "https://unsplash.com/photos/photography-of-people-inside-room-during-daytime-rg1y72eKw6o", "Christina @ wocintechchat.com"),
  threeColleagues: unsplash("three-colleagues", 1800, 1202, "Three colleagues talking across a desk with laptops", "https://unsplash.com/photos/photography-of-three-women-sits-beside-table-inside-room-during-daytime-UcZcsHSp8o4", "Christina @ wocintechchat.com"),
  oneToOne: unsplash("one-to-one", 1800, 1202, "Two people in a quiet one-to-one working session beside tall windows", "https://unsplash.com/photos/two-women-sits-of-padded-chairs-while-using-laptop-computers-HocFQHhGjDE", "Christina @ wocintechchat.com"),
  analystWindow: unsplash("analyst-window", 1800, 1202, "A woman working on a laptop in a chair by a window", "https://unsplash.com/photos/woman-sits-on-padded-chair-while-using-macbook-during-daytime-vLwH8bWoi_8", "Christina @ wocintechchat.com"),
  collaborationCouch: unsplash("collaboration-couch", 1800, 1200, "Three women reviewing work together on a laptop", "https://unsplash.com/photos/a-group-of-people-sitting-on-a-couch-looking-at-a-laptop-M7ALc3UuX_g", "Iwaria Inc."),
  conversation: unsplash("conversation", 1800, 1200, "A woman explaining something during a conversation in an open office", "https://unsplash.com/photos/shallow-focus-photo-of-woman-in-white-sleeveless-shirt-ddkuU4eocK8", "AllGo - An App For Plus Size People"),
  teamCasual: unsplash("team-casual", 1800, 1350, "A small team in an informal discussion in a meeting room", "https://unsplash.com/photos/man-in-orange-polo-shirt-sitting-on-brown-wooden-armchair-xIH6XLSc9JM", "john amachaab"),
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
} as const satisfies Record<string, Photo>;

export type PhotoId = keyof typeof photos;
