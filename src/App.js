import React, { useState, useRef } from "react";
// Import Styles
import './styles/app.scss';
//Adding Components
import Player from './components/Player';
import Song from './components/Song';
import Library from "./components/Library";
import Nav from "./components/Nav";
// import Util
import data from './data';

function App() {
  // Ref
  const audioRef = useRef(null);

  // State
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({ currentTime: 0, duration: 0, animationPercentage: 0 });
  const [libraryStatus, setLibraryStatus] = useState(false);

  // Functions
  const updateTimeHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    // calculate percentage
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animationPercentage = Math.round((roundedCurrent / roundedDuration) * 100);

    setSongInfo({ ...songInfo, currentTime: current, duration: duration, animationPercentage: animationPercentage });
  };

  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    if(isPlaying) audioRef.current.play();
  };

  return (
    <div className={`App ${libraryStatus ? "library-active" : "" }`}>
      <Nav libraryStatus={ libraryStatus } setLibraryStatus={ setLibraryStatus }/>
      <Song currentSong={ currentSong } />
      <Player 
        audioRef={ audioRef }
        currentSong={ currentSong } 
        isPlaying={ isPlaying }
        setIsPlaying={ setIsPlaying }
        setSongInfo={ setSongInfo }
        songInfo={ songInfo }
        setCurrentSong={ setCurrentSong }
        songs={ songs }
        setSongs={ setSongs }
       />
      <Library
        audioRef={ audioRef }
        songs={ songs } 
        setCurrentSong={ setCurrentSong }
        setSongs={ setSongs }
        isPlaying={ isPlaying }
        libraryStatus={ libraryStatus }
      />
      <audio onTimeUpdate={updateTimeHandler} onLoadedMetadata={updateTimeHandler} ref={audioRef} src={currentSong.audio} onEnded={songEndHandler}></audio>
    </div>
  );
}

export default App;
