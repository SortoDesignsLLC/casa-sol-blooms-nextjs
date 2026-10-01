// Update your menu here — add, edit or remove drinks and they update on the site.
export type MenuItem = { name: string; description: string; category?: string };

export const menu: { title: string; note: string; items: MenuItem[] }[] = [
  {
    title: "Matcha",
    note: "Made with oat milk and our house-made fruit purées where applicable.",
    items: [
      { name: "Sol Verde", description: "Classic matcha" },
      { name: "Fresa Fresca", description: "Strawberry matcha" },
      { name: "Sol de Piña", description: "Pineapple matcha" },
      { name: "Nube de Coco", description: "Coconut matcha" },
      { name: "Isla Sol", description: "Piña colada matcha" },
    ],
  },
  {
    title: "Cold Brew",
    note: "Our house blend of coffees from El Salvador. Smooth, slow-steeped, topped by hand.",
    items: [
      {
        name: "Nube de Caramelo",
        description: "Cold brew topped with homemade cold foam + dulce de leche caramel",
      },
    ],
  },
  {
    title: "Mocktails",
    note: "Bright fruit and fresh lime. Ask about chamoy + Tajín rims.",
    items: [
      { name: "Sol Rosado", description: "Strawberry · Guava · Fresh lime" },
      { name: "Mango Sol", description: "Mango · Passion fruit · Fresh lime" },
      { name: "Flor de Sol", description: "Pineapple · Hibiscus · Fresh lime" },
    ],
  },
];

// Seasonal flavors — add a few here whenever the season changes.
export const seasonal: MenuItem[] = [
  { name: "Pumpkin Dulce Matcha", category: "Matcha", description: "A cozy blend of matcha, pumpkin, panela, cinnamon, nutmeg, and vanilla." },
  { name: "Pumpkin Dulce Cloud", category: "Cold Brew", description: "Cold brew with pumpkin spice and signature cream." },
  { name: "Solchata Matcha", category: "Matcha", description: "A house-made horchata-inspired blend with cinnamon, vanilla, and panela." },
  { name: "Flan de Sol Matcha", category: "Matcha", description: "Creamy vanilla-caramel matcha with cream cheese vanilla cold foam and caramel." },
];

export const drinkChoices = [...menu.flatMap((group) => group.items), ...seasonal].map((item) => item.name);
