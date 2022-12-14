export type RootStackParamList = {
  AllPlaces: undefined;
  AddPlace: LocationType | undefined;
  Map: LocationType | undefined;
  PlaceDetails: { placeId: string };
};

export type LocationType = {
  lat: number;
  lng: number;
};

export type PlaceData = {
  id?: string;
  title: string;
  imageUri: string;
  address: string;
  lat: number;
  lng: number;
};
