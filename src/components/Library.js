import React from "react";
import LibrarySong from "./LibrarySong";

const Library = ( { songs, setCurrentSong, setSongs, audioRef, isPlaying } ) => {
  return(
    <div className="library">
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map((song) => (
          <LibrarySong 
            song={ song } 
            setCurrentSong={ setCurrentSong } 
            songs={ songs }
            setSongs={ setSongs }
            audioRef={ audioRef }
            key={ song.id }
            isPlaying={ isPlaying }
          />
        ))}
      </div>
    </div>
  )
}

export default Library;
