// src/lib/artworkData.ts
import type { Artwork } from '../types';

// Artwork definitions
const durgaTeaBranding: Artwork = {
  id: '3',
  title: 'Durga Tea Company',
  imageUrl: '/Images/Durga Tea Pres/D-01.png',
  imageWidth: 1224,
  imageHeight: 792,
  description: "Brand identity guidelines for 'Durga Tea', a conceptual tea company. This project explores the visual identity, color palettes, typography, and packaging concepts inspired by the strength, serenity, and symbolism associated with the deity Durga. The aim is to create a brand that evokes warmth, power, and tranquility, reflecting the essence of both the tea and its divine namesake.",
  tags: ['branding', 'logo design', 'packaging', 'tea', 'India', 'tiger', 'chai'],
  category: 'Branding & Identity',
  creationDate: '2024',
  dimensions: 'Digital',
  medium: 'Adobe Illustrator, Adobe Photoshop',
  toolsUsed: ['Adobe Illustrator', 'Adobe Photoshop'],
  dataAiHint: 'tea branding mockup',
  showMotifSwitcher: true,
  interactiveDisplay: {
    contentImageUrl: '/Images/Durga Tea Pres/D-11.webp'
  },
  additionalImageUrls: [
    '/Images/Durga Tea Pres/D-03.webp', 
    '/Images/Durga Tea Pres/D-04.webp', 
    '/Images/Durga Tea Pres/D-05.webp', 
    '/Images/Durga Tea Pres/D-06.webp', 
    '/Images/Durga Tea Pres/D-07.webp', 
    '/Images/Durga Tea Pres/D-08.webp',
    '/Images/Durga Tea Pres/D-09.webp', 
    '/Images/Durga Tea Pres/D-10.webp'
  ]
};

const kellardenFarm: Artwork = {
  id: '1',
  title: 'Kellarden Farm',
  imageUrl: '/Images/kell/Ygaliatsatos_Kellarden identity proposal_V2_Page_1.jpg',
  imageWidth: 500,
  imageHeight: 700,
  description: 'Brand identity proposal for Kellarden Farm, showcasing logo concepts, typography, color palette, and application mockups.',
  tags: ['branding', 'identity design', 'logo', 'farm', 'agriculture', 'proposal'],
  category: 'Branding & Identity Design',
  creationDate: '2022',
  dimensions: 'Digital',
  medium: 'Digital',
  dataAiHint: 'brand proposal',
  additionalImageUrls: [
    '/Images/kell/5 (Medium).png',
    '/Images/kell/4 (Medium).png',
    '/Images/kell/3 (Medium).png',
    '/Images/kell/2 (Medium).png',
    '/Images/kell/1 (Medium).png'
   
  ],
  toolsUsed: ['Adobe Illustrator', 'Adobe Photoshop', 'Adobe InDesign'],
  showLogoSwitcher: true,
};

const silverScreenZine: Artwork = {
  id: '2',
  title: 'Silver Screen',
  imageUrl: '/Images/silver_screen_zine/ss_p1.webp',
  imageWidth: 1080,
  imageHeight: 864,
  description: "A special edition zine focusing on cinema, featuring an exclusive look at Godzilla. Winter 2023 special, celebrating the upcoming 70th anniversary of the original film's release.",
  imageCaption: "Inspired by my adoration for the legacy of Godzilla, this zine pays homage to the giant in many ways. The first of which being the custom typeface for the title. Taking inspiration from original artwork for the film's Criterion collection",
  tags: ["zine", "movie", "godzilla", "publication", "cinema"],
  category: 'Publication',
  creationDate: '2023',
  dimensions: 'N/A',
  medium: 'Print',
  toolsUsed: ['Adobe Photoshop', 'Adobe Indesign'],
  dataAiHint: 'zine page',
  downloadablePdfUrl: '',
  additionalImageUrls: [
    '/Images/silver_screen_zine/ss_p2.webp',
    '/Images/silver_screen_zine/ss_p3.webp',
    '/Images/silver_screen_zine/ss_p4.webp',
    '/Images/silver_screen_zine/ss_p5.webp',
    '/Images/silver_screen_zine/ss_p6.webp',
	'/Images/silver_screen_zine/ss_p7.webp',
	'/Images/silver_screen_zine/ss_p8.webp',
	'/Images/silver_screen_zine/ss_p9.webp',
	'/Images/silver_screen_zine/ss_p10.webp'
  ],
};

const youthSocietyEmblem: Artwork = {
  id: '7',
  title: 'Youth Society Emblem',
  imageUrl: 'https://firebasestorage.googleapis.com/v0/b/artfolio-lg8he.firebasestorage.app/o/Youth%20Society%20Logo%2FYS_Logos-01.svg?alt=media&token=8ffc95ed-babc-42b6-9b44-86dbbc7a1c6d',
  imageWidth: 258,
  imageHeight: 258,
  description: 'A collection of emblem designs for "Youth Society," exploring variations in color and style. These logos aim to convey energy, community, and modern appeal. The primary emblem utilizes a circular motif with dynamic internal elements. Color variations include white on black, gold on black, and red on white.',
  tags: ['logo design', 'branding', 'emblem', 'youth', 'community', 'vector', 'SVG'],
  category: 'Logo Design',
  creationDate: '2025',
  dimensions: 'Digital (Vector SVG)',
  medium: 'Adobe Illustrator',
  dataAiHint: 'youth emblem',
  additionalImageUrls: [
    'https://firebasestorage.googleapis.com/v0/b/artfolio-lg8he.firebasestorage.app/o/Youth%20Society%20Logo%2FYS_Logos-02.svg?alt=media&token=029a887c-b8ef-405c-bb7b-8af87d14b55b',
    'https://firebasestorage.googleapis.com/v0/b/artfolio-lg8he.firebasestorage.app/o/Youth%20Society%20Logo%2FYS_Logos-03.svg?alt=media&token=5aff2202-02a8-4c03-b801-8dbe6046baf8',
    'https://firebasestorage.googleapis.com/v0/b/artfolio-lg8he.firebasestorage.app/o/Youth%20Society%20Logo%2FYS_Logos-04.svg?alt=media&token=8e1a5bb5-b775-4fee-9cf3-0fe384711a07',
    'https://firebasestorage.googleapis.com/v0/b/artfolio-lg8he.firebasestorage.app/o/Youth%20Society%20Logo%2FYS_Logos-05.svg?alt=media&token=b7dcccdb-47dc-4f2b-ad11-ea4482ca8de0',
    'https://firebasestorage.googleapis.com/v0/b/artfolio-lg8he.firebasestorage.app/o/Youth%20Society%20Logo%2FYS_Logos-06.svg?alt=media&token=06315cfb-99ef-4d93-9fd8-67150b32b2b3'
  ],
  toolsUsed: ['Adobe Illustrator'],
};

const threeDWork: Artwork = {
  id: '9',
  title: '3D',
  imageUrl: 'https://firebasestorage.googleapis.com/v0/b/artfolio-lg8he.firebasestorage.app/o/type%2Faw4.png?alt=media&token=a5273e57-d6bc-4a0d-8a50-bf17012322f3',
  imageWidth: 800,
  imageHeight: 800,
  description: 'A collection of my 3D works.',
  imageCaption: "A start to my 3D rendering. Artwork sourced from https://www.thecoverproject.net/ of course being covers of Pokémon Red and The Legend of Zelda: Links Awakening for the Gameboy.",
  tags: ["3D", "digital art", "Blender", "rendering", "sculpting"],
  category: '3D Modeling',
  creationDate: '2024',
  dimensions: 'Digital',
  medium: 'Digital',
  toolsUsed: ['Blender', 'Adobe Photoshop'],
  dataAiHint: '3d abstract render',
  additionalImageUrls: [],
};

const universityWork: Artwork = { // Renamed from miscUniversityWork
  id: '10',
  title: 'University', // Changed title
  imageUrl: 'https://firebasestorage.googleapis.com/v0/b/artfolio-lg8he.firebasestorage.app/o/type%2Fpshakes.jpg?alt=media&token=16affebe-7736-4a51-af1f-d3eb83b170d3',
  specialDetailImage: 'https://firebasestorage.googleapis.com/v0/b/artfolio-lg8he.firebasestorage.app/o/type%2Fwcu%20icon-01.svg?alt=media&token=8a14407d-d89a-4003-a949-f1551a102e37',
  imageWidth: 600,
  imageHeight: 800,
  description: 'A collection of design projects completed during university studies, showcasing a range of skills and concepts.', // Adjusted description
  tags: ["university", "student work", "graphic design", "concepts", "academic", "3D"],
  category: 'Academic Projects',
  creationDate: '2019-2024',
  dimensions: 'Digital & Print',
  medium: 'Various Digital Tools, Mixed Media',
  toolsUsed: ['Adobe Creative Suite', 'Blender', 'Cut Paper'],
  dataAiHint: 'university project design',
  additionalImageUrls: [
    ,
  ],
  additionalImageCaptions: [
    "This is a project created for a 3D art class. The objective was to design and construct a wood-cut food puzzle. I completed the design and construction of the puzzle with ease and wanted to create a real-world mockup of potential packaging. Inspired by Pulp Fiction I recreated the McDonald's burger container to fit the full built puzzle. The bottom of the packaging lists the film's cast as well as various facts and references.",
    undefined,
    undefined,
    undefined,
    undefined,
    undefined, // Caption for new_img_A (optional)
    undefined, // Caption for new_img_B (optional)
  ],
};


const artworks: Artwork[] = [
  durgaTeaBranding, // ID '3'
  kellardenFarm, // ID '1'
  silverScreenZine, // ID '2'
  youthSocietyEmblem, // ID '7'
  threeDWork, // ID '9'
  universityWork, // ID '10' - Updated
];

export async function getArtworks(): Promise<Artwork[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 50));
  // Filter out any invalid entries but do not sort, to respect the defined order.
  const validArtworks = artworks.filter(artwork => artwork && artwork.id && artwork.creationDate && artwork.title && artwork.imageUrl);
  return validArtworks;
}

export async function getArtworkById(id: string): Promise<Artwork | undefined> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 50));
  return artworks.find(artwork => artwork.id === id);
}















