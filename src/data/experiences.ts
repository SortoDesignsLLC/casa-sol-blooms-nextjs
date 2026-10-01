export const packages = [
  { id: "mini-sol", name: "Mini Sol", guests: "Up to 20 guests", price: 500, flavors: 1, description: "A little sunshine for your closest people." },
  { id: "sol-social", name: "Sol Social", guests: "21–35 guests", price: 700, flavors: 2, description: "For birthdays, showers, and good company." },
  { id: "casa-sol-celebration", name: "Casa Sol Celebration", guests: "36–50 guests", price: 850, flavors: 3, description: "More people. More reasons to celebrate." },
] as const;

export const enhancements = [
  { title: "A little more time", description: "Additional active beverage service.", price: "$150 / hour" },
  { title: "Another favorite", description: "An additional standard matcha flavor.", price: "$50 / flavor" },
  { title: "The finishing touches", description: "Specialty mocktail rims and garnishes, including chamoy + Tajín.", price: "Personalized quote" },
  { title: "Made yours", description: "Custom menus, signage, branding, additional beverage selections, and event-specific details.", price: "Personalized quote" },
];

export const contactEmail = "casasolmatchacoffee@gmail.com";
