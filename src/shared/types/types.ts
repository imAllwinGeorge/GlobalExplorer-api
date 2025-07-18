export interface Filter {
  search: string | undefined;
  category: string | undefined;
  priceRangeMin: number | undefined;
  distance: number | undefined;
  priceRangeMax: number | undefined;
  lat: number | undefined;
  lng: number | undefined;
}
