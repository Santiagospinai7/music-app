import React from "react";
import { playAudio } from "../util";

const LibrarySong = ({ song, songs, setCurrentSong, setSongs, audioRef, isPlaying }) => {
  // Functions
  const songSelectHandler = () => {
    const selectedSong = song;

    // Add Active State
    selectedSong.active = true;
    songs.map((song) => (song.id === selectedSong.id) ? song.active = true : song.active = false);
    
    setSongs(songs);
    setCurrentSong(selectedSong);

    playAudio(isPlaying, audioRef)
  };

  return(
    <div onClick={songSelectHandler} className={`library-song ${song.active ? 'selected' : "" }`}>
      <img alt={song.name} src={song.cover}></img>
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  )
}

export default LibrarySong;
