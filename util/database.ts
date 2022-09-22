import * as SQLite from "expo-sqlite";
import { SQLResultSet } from "expo-sqlite";
import { Place } from "../models/place";
import { PlaceData } from "./types";

const database = SQLite.openDatabase("places.db");

export const init = () => {
  const promise = new Promise<void>((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY NOT NULL,
            title TEXT NOT NULL,
            imageUri TEXT NOT NULL,
            address TEXT NOT NULL,
            lat REAL NOT NULL,
            lng REAL NOT NULL
        )`,
        [],
        () => {
          resolve();
        },
        (_, error): any => {
          reject(error);
        }
      );
    });
  });

  return promise;
};

export const insertPlace = (place: Place) => {
  const promise = new Promise<SQLResultSet>((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
        [
          place.title,
          place.imageUri,
          place.address,
          place.location.lat,
          place.location.lng,
        ],
        (_, result) => {
          resolve(result);
        },
        (_, error): any => {
          reject(error);
        }
      );
    });
  });

  return promise;
};

export const fetchAllPlaces = () => {
  const promise = new Promise<Place[]>((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM places`,
        [],
        (_, result) => {
          const places: Place[] = [];

          for (const placeData of result.rows._array as PlaceData[]) {
            places.push(
              new Place(
                placeData.title,
                placeData.imageUri,
                {
                  address: placeData.address,
                  lat: placeData.lat,
                  lng: placeData.lng,
                },
                placeData.id
              )
            );
          }
          resolve(places);
        },
        (_, error): any => {
          reject(error);
        }
      );
    });
  });

  return promise;
};

export const getPlaceById = (id: string) => {
  const promise = new Promise<PlaceData>((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM places WHERE id = ?`,
        [id],
        (_, result) => {
          resolve(result.rows._array[0]);
        },
        (_, error): any => {
          reject(error);
        }
      );
    });
  });
  return promise;
};
