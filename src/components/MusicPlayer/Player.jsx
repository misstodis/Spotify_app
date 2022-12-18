/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef, useEffect } from 'react';

// make component player to set audio song
const Player = ({ activeSong, isPlaying, volume, seekTime, onEnded, onTimeUpdate, onLoadedData, repeat }) => {
  // using useRef() hooks to save DOM element in, hier i get <audio> tag
  // element will always be store in .current property
  // and it will always return a object with .current property
  const audioRef = useRef(null);

  // check in useRef of there already has a audio tag in .current property 
  if (audioRef.current) {
    // if isPlaying (get from prop) is true then play audio
    // else pause audio
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }

  // useEffect hooks depending on volume (When something change with value volum)
  // thisn will set the volume of the audio
  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  // updates audio element only on seekTime change (and not on each rerender):
  useEffect(() => {
    audioRef.current.currentTime = seekTime;
  }, [seekTime]);

  return (
    <audio
      // set sorce for audio
      src={activeSong?.hub?.actions[1]?.uri}
      // React has built-in ref (props) tag to get the <html> tag (DOM element) for useRef()
      // hier i get audio <tag> and give it in ref prop, this will store audio tag to audioRef.current
      // this using to play and pause audio
      ref={audioRef}
      // loop event: will repeat audio when repeat are enabled
      loop={repeat}
      //onEnded event: play next song when the song finishes playing (onEnded will call a function handleNextSong this i pass through prop)
      onEnded={onEnded}
      // ontimeupdate event : get current playback position of the audio
      onTimeUpdate={onTimeUpdate}
      // onLoadedData event : get audio duration
      onLoadedData={onLoadedData}
    />
  );
};

export default Player;
