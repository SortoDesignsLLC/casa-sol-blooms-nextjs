// Update your menu here — add, edit or remove drinks and they update on the site.
export type MenuItem = { name: string; description: string };

export const menu: { title: string; note: string; items: MenuItem[] }[] = [
  {
    title: "Matcha",
    note: "All matcha is made with oat milk.",
    items: [
      { name: "Fresa Fresca", description: "Strawberry matcha" },
      { name: "Garden Glow", description: "Pineapple matcha" },
      { name: "Tropical Bloom", description: "Piña colada matcha" },
    ],
  },
  {
    title: "Cold Brew",
    note: "Smooth, slow-steeped and topped by hand.",
    items: [
      {
        name: "Nube de Caramelo",
        description: "Cold brew topped with homemade cold foam + dulce de leche caramel",
      },
    ],
  },
];

// Seasonal flavors — add a few here whenever the season changes.
export const seasonal: MenuItem[] = [];
