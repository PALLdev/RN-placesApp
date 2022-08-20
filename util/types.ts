export type RootStackParamList = {
  AllPlaces: undefined;
  AddPlace: LocationType | undefined;
  Map: undefined;
};

export interface LocationType {
  lat: number;
  lng: number;
}
