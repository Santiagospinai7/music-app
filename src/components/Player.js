import React, { useState } from "react";
import { FontAwesomeIcon  } from "@fortawesome/react-fontawesome";
import { faPlay, faAngleLeft, faAngleRight, faPause } from "@fortawesome/free-solid-svg-icons";


const Player = ( { audioRef,  setSongInfo, songInfo, currentSong, isPlaying, setIsPlaying, setCurrentSong, songs } ) => {
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
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  const skipTrackHandler = (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "skip-forward") {
      // console.log(currentIndex);
      setCurrentSong(songs[(currentIndex + 1) % songs.length]);
      // console.log(currentIndex + 1);
    }
    if (direction === "skip-back") {
      console.log("skip-back");
      const test = (currentIndex - 1) % songs.length
      console.log(test);
      if (test === -1) {
        setCurrentSong(songs[songs.length - 1]);
        return;
      }
      setCurrentSong(songs[(currentIndex - 1) % songs.length]);
    }
  };

  return(
    <div className="player">
      <div className="time-control">
        <p>{ getTime(songInfo.currentTime) }</p>
        <input 
          min={0}
          max={songInfo.duration || 0}
          value={songInfo.currentTime}
          onChange={dragHandler}
          type="range" 
        />
        <p>{ getTime(songInfo.duration) }</p>
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