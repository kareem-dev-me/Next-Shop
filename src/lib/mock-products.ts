export type MockProduct = {
  id: string;
  slug: string;
  nameKey: string;
  descriptionKey: string;
  price: number;
  categoryKey: string;
  accent: string;
};

export const mockProducts: MockProduct[] = [
  {
    id: "1",
    slug: "pulse-headphones",
    nameKey: "pulseHeadphones",
    descriptionKey: "pulseHeadphonesDesc",
    price: 249,
    categoryKey: "audio",
    accent: "#22C55E",
  },
  {
    id: "2",
    slug: "nova-earbuds",
    nameKey: "novaEarbuds",
    descriptionKey: "novaEarbudsDesc",
    price: 129,
    categoryKey: "audio",
    accent: "#1A1A1A",
  },
  {
    id: "3",
    slug: "orbit-speaker",
    nameKey: "orbitSpeaker",
    descriptionKey: "orbitSpeakerDesc",
    price: 179,
    categoryKey: "audio",
    accent: "#6B7280",
  },
  {
    id: "4",
    slug: "flux-watch",
    nameKey: "fluxWatch",
    descriptionKey: "fluxWatchDesc",
    price: 299,
    categoryKey: "wearables",
    accent: "#22C55E",
  },
];

export function getMockProductBySlug(slug: string): MockProduct | undefined {
  return mockProducts.find((product) => product.slug === slug);
}

export const mockCartItems = [
  { productId: "1", quantity: 1 },
  { productId: "2", quantity: 2 },
] as const;
