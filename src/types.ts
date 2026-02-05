// src/types.ts
export type AlbumOrEp = "ALBUM" | "EP";

export interface Album {
  id: number;
  name: string;
  artist: string;
  albumOrEp: AlbumOrEp;
  releaseYear: number;
  rating: number;
}

export interface AlbumNoId {
  name: string;
  artist: string;
  albumOrEp: AlbumOrEp;
  releaseYear: number;
  rating: number;
}

export interface AllAlbumsProps {
  albums: Album[];
  darkMode: boolean
}