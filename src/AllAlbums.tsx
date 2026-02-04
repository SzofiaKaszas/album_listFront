import type { AlbumOrEp } from "@prisma/client";
import type { AllAlbumsProps } from "./types";



export function AllAlbums( {albums} : AllAlbumsProps) {
  return (
    <div>
      {albums.map((album) => (
        <div key={album.id}>{album.name} - {album.artist}</div>
      ))}
    </div>
  );
}

export async function getAlbums(): Promise<Album[] | undefined> {
  const response = await fetch(`http://localhost:3000/albums`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    console.error("Failed to load album data");
    return undefined;
  }

  const albumData = (await response.json()) as Album[];
  return albumData;
}

export interface Album {
  id: number;
  name: string;
  artist: string;
  albumOrEp: AlbumOrEp;
  releaseYear: number;
  rating: number;
}
