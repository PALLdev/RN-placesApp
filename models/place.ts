import { LocationType } from "../util/types";

export class Place {
  id: string;
  title: string;
  address: string;
  imageUri: string;
  location: LocationType;

  constructor(
    title: string,
    address: string,
    imageUri: string,
    location: LocationType
  ) {
    this.title = title;
    this.address = address;
    this.imageUri = imageUri;
    this.location = location;
    this.id = new Date().toLocaleDateString() + Math.random().toString();
  }
}
