export interface Destination {
  name: string;
  slug?: string;
  image?: string;
  description?: string;
}

/**
 * Static config for "Top Destinations" tiles on the homepage.
 * Edit this file to update destinations.
 */
export const destinations: Destination[] = [
  { name: "Los Angeles", slug: "los-angeles", description: "Tacos & sun" },
  { name: "Austin", slug: "austin", description: "BBQ capital" },
  { name: "New York", slug: "new-york", description: "Pizza & slices" },
  { name: "Denver", slug: "denver", description: "Elevation & eats" },
  { name: "Chicago", slug: "chicago", description: "Deep dish & more" },
];
