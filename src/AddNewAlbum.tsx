import type { Album } from "./AllAlbums";
import type { AlbumOrEp } from "@prisma/client";
import type { AlbumNoId } from "./types";

export function AddNewAlbum() {
  return <form onSubmit={(e) => handleSubmit(e)}>
    <label>Name:</label>
    <input type="text" name="name"></input>

    <label>Artist:</label>
    <input type="text" name="artist"></input>

    <label>Album or EP:</label>
    <select name="AlbumOrEp">
        <option value={"ALBUM"}>Album</option>
        <option value={"EP"}>EP</option>
    </select>

    <label>Release Year:</label>
    <input type="number" name="releaseYear"></input>

    <label>Rating:</label>
    <input type="number" name="rating" min={1} max={10}></input>


    <button type="submit">Add</button>
  </form>;
}

async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();

  const form = new FormData(e.currentTarget)

  const name = form.get("name") as string;
  const artist = form.get("artist") as string;
  const albumOrEp = form.get("AlbumOrEp") as AlbumOrEp;
  const releaseYear = Number(form.get("releaseYear"))
  const rating = Number(form.get("rating"))

  await addAlbum({name: name, artist: artist, albumOrEp: albumOrEp, releaseYear: releaseYear, rating: rating})
}

async function addAlbum(data: AlbumNoId): Promise<Album[]> {
  const response = await fetch("http://localhost:3000/albums", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Something went wrong (${response.status})`);
  }

  const albums = (await response.json()) as Album[];
  return albums;
}

interface AlbumInput {
  name: string;
  artist: string;
  albumOrEp: AlbumOrEp;
  releaseYear: number;
  rating: number;
}