import { useEffect, useState } from 'react';
import { AddNewAlbum } from './AddNewAlbum';
import { AllAlbums, getAlbums } from './AllAlbums';
import './App.css';
import type { Album } from './types';

function App() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [addedNew, setAddedNew] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false); // dark mode toggle

  // Load albums on mount
  useEffect(() => {
    async function load() {
      const data = await getAlbums();
      if (data) setAlbums(data);
    }
    load();
  }, []);

  // Reload when a new album is added
  useEffect(() => {
    if (!addedNew) return;
    async function load() {
      const data = await getAlbums();
      if (data) setAlbums(data);
    }
    load();
    setAddedNew(false);
  }, [addedNew]);

  // Determine theme colors
  const themeStyles = {
    backgroundColor: darkMode ? '#1E1E1E' : '#DFF6E4', // dark gray vs mint
    color: darkMode ? 'white' : 'black',
    minHeight: '100vh',
    padding: '3rem',
  };

  return (
    <div style={themeStyles}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 style={{ color: darkMode ? '#ffffff' : '#155724' }}>My Album List</h1>
        <button
          className={`btn ${darkMode ? 'btn-light' : 'btn-dark'}`}
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>

      <div className="row g-4">
        {/* Add Album Form */}
        <div className="col-md-4">
          <AddNewAlbum setAddedNew={setAddedNew} darkMode={darkMode} albums={albums}/>
        </div>

        {/* Album List */}
        <div className="col-md-8">
          <AllAlbums albums={albums} darkMode={darkMode} />
        </div>
      </div>
    </div>
  );
}

export default App;
