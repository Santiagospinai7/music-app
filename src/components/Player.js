import React, { useRef, useState } from "react";
import { FontAwesomeIcon  } from "@fortawesome/react-fontawesome";
import { faPlay, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";


const Player = ( { currentSong, isPlaying, setIsPlaying } ) => {
  // State
  const [songInfo, setSongInfo] = useState({ currentTime: 0, duration: 0 });

  // ref
  const audioRef = useRef(null);

  // Functions
  const playSongHandler = () => {
    switch (isPlaying) {
      case true:
        console.log("paused");
        audioRef.current.pause();
        setIsPlaying(!isPlaying);
        break;
    
      default:
        console.log("playing");
        audioRef.current.play();
        setIsPlaying(!isPlaying);
        break;
    }
  };

  const updateTimeHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    console.log(current, duration);
    setSongInfo({ ...songInfo, currentTime: current, duration: duration });
  };

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  return(
    <div className="player">
      <div className="time-control">
        <p>{ getTime(songInfo.currentTime) }</p>
        <input type="range" />
        <p>{ getTime(songInfo.duration) }</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon className="skip-back" size="2x" icon={faAngleLeft} />
        <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={faPlay} />
        <FontAwesomeIcon className="skip-forward" size="2x" icon={faAngleRight} />
      </div>
      <audio onTimeUpdate={updateTimeHandler} onLoadedMetadata={updateTimeHandler} ref={audioRef} src={currentSong.audio}></audio>
    </div>
  )
}

export default Player;