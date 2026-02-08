import type { AlbumOrEp } from "@prisma/client";
import type { Album, AlbumNoId } from "./types";
import type { Dispatch, SetStateAction } from "react";

type AddNewAlbumProps = {
  setAddedNew: Dispatch<SetStateAction<boolean>>;
  darkMode: boolean;
  albums: Album[]
};

export function AddNewAlbum({ setAddedNew, darkMode, albums }: AddNewAlbumProps) {

  return (
    <div className="container my-5">
      <form
        onSubmit={(e) => handleSubmit(e, setAddedNew, albums)}
        className="p-5 border rounded"
        style={{
          backgroundColor: darkMode ? "#2C2C2C" : "#96d3a7",
          borderColor: darkMode ? "#28A745" : "#107227",
        }}
      >
        <h3
          className="mb-4"
          style={{ color: darkMode ? "#DFF6E4" : "#155724" }}
        >
          Add New Album
        </h3>

        {/* Name */}
        <div className="mb-3">
          <label
            htmlFor="name"
            className="form-label"
            style={{ color: darkMode ? "#DFF6E4" : "inherit" }}
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="form-control"
            required
            placeholder="good kid, m.A.A.d city"
            style={{
              borderColor: darkMode ? "#686868" : "#28A745",
              backgroundColor: darkMode ? "#3A3A3A" : "#DFF5E1",
              color: darkMode ? "#F0F4F1" : "black",
            }}
          />
        </div>

        {/* Artist */}
        <div className="mb-3">
          <label
            htmlFor="artist"
            className="form-label"
            style={{ color: darkMode ? "#DFF6E4" : "inherit" }}
          >
            Artist
          </label>
          <input
            type="text"
            name="artist"
            id="artist"
            className="form-control"
            required
            placeholder="Kendrick Lamar"
            style={{
              borderColor: darkMode ? "#686868" : "#28A745",
              backgroundColor: darkMode ? "#3A3A3A" : "#DFF5E1",
              color: darkMode ? "#F0F4F1" : "black",
            }}
          />
        </div>

        {/* Album or EP */}
        <div className="mb-3">
          <label
            htmlFor="albumOrEp"
            className="form-label"
            style={{ color: darkMode ? "#DFF6E4" : "inherit" }}
          >
            Album or EP
          </label>
          <select
            name="AlbumOrEp"
            id="albumOrEp"
            className="form-select"
            required
            style={{
              borderColor: darkMode ? "#686868" : "#28A745",
              backgroundColor: darkMode ? "#3A3A3A" : "#DFF5E1",
              color: darkMode ? "#F0F4F1" : "black",
            }}
          >
            <option value="ALBUM">Album</option>
            <option value="EP">EP</option>
          </select>
        </div>

        {/* Release Year */}
        <div className="mb-3">
          <label
            htmlFor="releaseYear"
            className="form-label"
            style={{ color: darkMode ? "#DFF6E4" : "inherit" }}
          >
            Release Year
          </label>
          <input
            type="number"
            name="releaseYear"
            id="releaseYear"
            className="form-control"
            required
            placeholder="2012"
            style={{
              borderColor: darkMode ? "#686868" : "#28A745",
              backgroundColor: darkMode ? "#3A3A3A" : "#DFF5E1",
              color: darkMode ? "#F0F4F1" : "black",
            }}
          />
        </div>

        {/* Rating */}
        <div className="mb-3">
          <label
            htmlFor="rating"
            className="form-label"
            style={{ color: darkMode ? "#DFF6E4" : "inherit" }}
          >
            Rating
          </label>
          <input
            type="number"
            name="rating"
            id="rating"
            min={1}
            max={10}
            className="form-control"
            required
            placeholder="10"
            style={{
              borderColor: darkMode ? "#686868" : "#28A745",
              backgroundColor: darkMode ? "#3A3A3A" : "#DFF5E1",
              color: darkMode ? "#F0F4F1" : "black",
            }}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn w-100 mt-3"
          style={{
            backgroundColor: darkMode ? "#686868" : "#28A745",
            borderColor: darkMode ? "#686868" : "#28A745",
            color: "white",
          }}
        >
          Add Album
        </button>
      </form>
    </div>
  );
}

// Handle submit now takes formRef to reset it
async function handleSubmit(
  e: React.FormEvent<HTMLFormElement>,
  setAddedNew: Dispatch<SetStateAction<boolean>>,
  albums: Album[]
) {
  e.preventDefault();

  const form = new FormData(e.currentTarget);

  const name = form.get("name") as string;
  const artist = form.get("artist") as string;
  const albumOrEp = form.get("AlbumOrEp") as AlbumOrEp;
  const releaseYear = Number(form.get("releaseYear"));
  const rating = Number(form.get("rating"));

  let exists = false;
  albums.forEach(element => {
    if(element.artist == artist && element.name == name && element.releaseYear == releaseYear && element.albumOrEp == albumOrEp){
      exists = true
    }
  });

  if(exists){
    alert(`This ${albumOrEp} already exists`)
    e.target.reset();
    return;
  }

  await addAlbum({
    name,
    artist,
    albumOrEp,
    releaseYear,
    rating,
  });

  // Notify parent
  setAddedNew(true);

  // Reset the form
  e.target.reset();
}

// Add album function stays the same
async function addAlbum(data: AlbumNoId): Promise<void> {
  const response = await fetch("http://localhost:3000/albums", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error(`Something went wrong (${response.status})`);
}
