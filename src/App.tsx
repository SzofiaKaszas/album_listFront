import { useEffect, useState } from 'react';
import { AddNewAlbum } from './AddNewAlbum'
import { AllAlbums, getAlbums } from './AllAlbums'
import './App.css'
import type { Album } from './types';

function App() {
  const [albums, setAlbums] = useState<Album[]>([]);

   useEffect(() => {
    async function load() {
      const data = await getAlbums();
      if (data) setAlbums(data);
    }
    load();
  }, []);

  return (
    <>
    <AddNewAlbum/>
    <AllAlbums albums={albums}/>
    </>
  )
}

export default App
