import React, { useState } from "react";
import { FontAwesomeIcon  } from "@fortawesome/react-fontawesome";
import { faPlay, faAngleLeft, faAngleRight, faPause } from "@fortawesome/free-solid-svg-icons";

const Player = ( { audioRef,  setSongInfo, songInfo, currentSong, isPlaying, setIsPlaying, setCurrentSong, songs, setSongs } ) => {
  // Functions
  const playSongHandler = () => {
    switch (isPlaying) {
      case true:
        audioRef.current.pause();
        setIsPlaying(!isPlaying);
        break;
    
      default:
        audioRef.current.play();
        setIsPlaying(!isPlaying);
        break;
    }
  };

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const dragHandler = (e) => {
    console.log(``)
    console.log(``)
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  const skipTrackHandler = async (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    let newIndex = currentIndex;
    if (direction === "skip-forward") {
      newIndex = (newIndex + 1) % songs.length;
      await setCurrentSong(songs[newIndex]);
      // updateActiveLibraryHandler(newIndex);
    }

    if (direction === "skip-back") {
      if (((currentIndex - 1) % songs.length) === -1) {
        newIndex = songs.length - 1;
        await setCurrentSong(songs[newIndex]);
        if (isPlaying) audioRef.current.play();
        updateActiveLibraryHandler(newIndex);
        // The return helps to avoid the next line of code to be executed
        return;
      }
      newIndex = (newIndex - 1) % songs.length;
      await setCurrentSong(songs[newIndex]);
    }
    if (isPlaying) audioRef.current.play();
    updateActiveLibraryHandler(newIndex);
  };

  // Add the styles
  const trackAnim = {
    transform: `translateX(${songInfo.animationPercentage}%)`
  };

  const updateActiveLibraryHandler = (index) => {
    const nextPrev = songs[index];
    songs.map((song) => (song.id === nextPrev.id) ? song.active = true : song.active = false );
    setSongs(songs);
  };

  return(
    <div className="player">
      <div className="time-control">
        <p>{ getTime(songInfo.currentTime) }</p>
        <div style={{background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`}} className="track">
          <input 
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            onChange={dragHandler}
            type="range" 
          />
          <div style={trackAnim} className="animate-track"></div>
        </div>
        <p>{ songInfo.duration ? getTime(songInfo.duration) : '0:00' }</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon onClick={() => skipTrackHandler("skip-back")} className="skip-back" size="2x" icon={faAngleLeft} />
        <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={isPlaying ? faPause : faPlay} />
        <FontAwesomeIcon onClick={() => skipTrackHandler("skip-forward")} className="skip-forward" size="2x" icon={faAngleRight} />
      </div>
    </div>
  )
}

export default Player;