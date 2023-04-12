import React, { useRef } from "react";
import { FontAwesomeIcon  } from "@fortawesome/react-fontawesome";
import { faPlay, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";


const Player = ( { currentSong, isPlaying, setIsPlaying } ) => {
  // ref
  const audioRef = useRef(null);

  // Funtions
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

  return(
    <div className="player">
      <div className="time-control">
        <p>Start Time</p>
        <input type="range" />
        <p>End Time</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon className="skip-back" size="2x" icon={faAngleLeft} />
        <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={faPlay} />
        <FontAwesomeIcon className="skip-forward" size="2x" icon={faAngleRight} />
      </div>
      <audio ref={audioRef} src={currentSong.audio}></audio>
    </div>
  )
}

export default Player;