export type RootStackParamList = {
  AllPlaces: undefined;
  AddPlace: LocationType | undefined;
  Map: undefined;
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
