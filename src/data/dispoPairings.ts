export interface DispoPairing {
  strain: string;
  dish: string;
  note?: string;
}

/**
 * Static config for the "Dispo Pairings" block on the homepage.
 * Edit this file to update pairings.
 */
export const dispoPairings: DispoPairing[] = [
  { strain: "OG Kush", dish: "Pepperoni Pizza", note: "Classic comfort" },
  { strain: "Sour Diesel", dish: "Street Tacos", note: "Bright & bold" },
  { strain: "Blue Dream", dish: "Brisket Plate", note: "Sweet & smoky" },
  { strain: "Granddaddy Purple", dish: "Double Cheeseburger", note: "Heavy hitters" },
];
