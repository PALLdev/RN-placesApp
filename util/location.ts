import { LocationType } from "./types";

const MAPS_K = "AIzaSyDRHCbo6IfSUY8TnkfzZWfl3iqggjpgdrI";

export const getMapPreview = ({ lat, lng }: LocationType) => {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=15&size=500x200&maptype=roadmap&markers=color:red%7Clabel:U%7C${lat},${lng}&key=${MAPS_K}`;
  return imagePreviewUrl;
};

export const getAddress = async ({ lat, lng }: LocationType) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${MAPS_K}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Error al intentar obtener info de geocode");
  }
  const data = await response.json();
  return data.results[0].formatted_address as string;
};
