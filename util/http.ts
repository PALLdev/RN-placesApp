import axios from "axios";
import { Place } from "../models/place";
import { PlaceData } from "./types";

const BACKEND_URL = "https://secret-canyon-359912-default-rtdb.firebaseio.com";

export function storePlaceOnDb(placeData: PlaceData) {
  axios.post<PlaceData>(`${BACKEND_URL}/places.json`, placeData);
}

export async function getPlacesFromDb() {
  const places: Place[] = [];

  const response = await axios.get<PlaceData[]>(`${BACKEND_URL}/places.json`);
  for (const key in response.data) {
    places.push(
      new Place(
        response.data[key].title,
        response.data[key].imageUri,
        {
          address: response.data[key].address,
          lat: response.data[key].lat,
          lng: response.data[key].lng,
        },
        key
      )
    );
  }
  return places;
}

export async function getPlaceFromDb(key: string) {
  const response = await axios.get<PlaceData>(
    `${BACKEND_URL}/places/${key}.json`
  );
  const dbPlace = response.data;
  const place = new Place(
    dbPlace.title,
    dbPlace.imageUri,
    { address: dbPlace.address, lat: dbPlace.lat, lng: dbPlace.lng },
    dbPlace.id
  );
  return place;
}
