import type { AlbumOrEp } from "@prisma/client";
import type { AllAlbumsProps } from "./types";
import { useState } from "react";

export function AllAlbums({ albums, darkMode }: AllAlbumsProps) {
  const [sortBy, setSortBy] = useState<"name" | "rating" | "releaseYear">(
    "name",
  );
  const [ascending, setAscending] = useState<boolean>(true);

  const sortedAlbums = [...albums].sort((a, b) => {
    let aVal: string | number = a[sortBy];
    let bVal: string | number = b[sortBy];

    if (typeof aVal === "string") aVal = aVal.toLowerCase();
    if (typeof bVal === "string") bVal = bVal.toLowerCase();

    if (aVal < bVal) return ascending ? -1 : 1;
    if (aVal > bVal) return ascending ? 1 : -1;
    return 0;
  });

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 style={{ color: darkMode ? "#DFF6E4" : "#2C3E50" }}>Albums</h3>
        <div className="d-flex gap-2">
          <select
            className="form-select"
            style={{
              width: "150px",
              backgroundColor: darkMode ? "#3A3A3A" : "white",
              color: darkMode ? "#F0F4F1" : "black",
              borderColor: darkMode ? "#686868" : "#28A745",
            }}
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value as "name" | "rating" | "releaseYear")
            }
          >
            <option value="name">Name</option>
            <option value="rating">Rating</option>
            <option value="releaseYear">Year</option>
          </select>
          <button
            className="btn"
            style={{
              backgroundColor: darkMode ? "gray" : "#ffffff",
              color: darkMode ? "white" : "black",
              borderColor: darkMode ? "#686868" : "#28A745"
            }}
            onClick={() => setAscending(!ascending)}
          >
            {ascending ? "Asc" : "Desc"}
          </button>
        </div>
      </div>

      <div
        className="list-group"
        style={{ maxHeight: "38rem", overflowY: "auto", paddingRight: "10px" }}
      >
        {sortedAlbums.map((album) => {
          let bgColor = "";
          if (album.rating <= 4) bgColor = darkMode ? "#420e08" : "#E74C3C";
          else if (album.rating <= 7)
            bgColor = darkMode ? "#441f09" : "#F39C12";
          else bgColor = darkMode ? "#0c1b12" : "#27AE60";

          const textColor = darkMode ? "#F0F4F1" : "white";

          return (
            <div
              key={album.id}
              className="list-group-item list-group-item-action mb-2"
              style={{
                borderRadius: "6px",
                backgroundColor: bgColor,
                color: textColor,
                padding: "0.5rem 0.75rem",
                fontSize: "1rem",
              }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <span className="fw-bold">{album.name}</span>
                <span>{album.rating}/10</span>
              </div>
              <div
                className="d-flex justify-content-between mt-1"
                style={{ fontSize: "0.8rem", color: textColor }}
              >
                <span>{album.artist}</span>
                <span>
                  {album.albumOrEp} | {album.releaseYear}
                </span>
              </div>
            </div>
          );
        })}
      </div>
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
