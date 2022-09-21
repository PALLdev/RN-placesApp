import { LocationType } from "../util/types";

export class Place {
  id?: string;
  title: string;
  address: string;
  imageUri: string;
  location: LocationType;

  constructor(
    title: string,
    imageUri: string,
    location: { address: string; lat: number; lng: number }
  ) {
    this.title = title;
    this.address = location.address;
    this.imageUri = imageUri;
    this.location = { lat: location.lat, lng: location.lng };
    this.id = new Date().toLocaleDateString() + Math.random().toString();
  }
}
