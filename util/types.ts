import { Place } from "../models/place";

export type RootStackParamList = {
  AllPlaces: undefined | { place: Place };
  AddPlace: LocationType | undefined;
  Map: undefined;
};

export type LocationType = {
  lat: number;
  lng: number;
};
