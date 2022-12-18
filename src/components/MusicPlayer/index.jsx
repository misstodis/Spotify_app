import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { nextSong, prevSong, playPause } from '../../redux/features/playerSlice';
import Controls from './Controls';
import Player from './Player';
import Seekbar from './Seekbar';
import Track from './Track';
import VolumeBar from './VolumeBar';

//====== components music player this wraps all the components to control the song=====
const MusicPlayer = () => {
  // useSelector provide from react-redux, using to access redux store's state
  // get element in object (sate) of reducer player from redux
  const { activeSong, listOfSongs, currentIndex, isActive, isPlaying } = useSelector((state) => state.player);

  //create useState using for controls of the song
  const [duration, setDuration] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const [appTime, setAppTime] = useState(0);
  const [volume, setVolume] = useState(0.3);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  // create dispatch to send action and sate to redux
  const dispatch = useDispatch();

  //useEffect when current song (currentIndex) change , check if there haven songs in array listOfSongs -> then play the nextsong
  useEffect(() => {
    if (listOfSongs.length) dispatch(playPause(true));
  }, [currentIndex]);

  // make function handle play and pause the song
  const handlePlayPause = () => {
    // if song not active (mean : not set any song to play yet! ) then do nothing
    if (!isActive) return;

    // if there a song playing then pause it else play it.
    if (isPlaying) {
      //dispatch to send action playPause (reducer) in PlayerSlicer.js
      // this will stop the song
      dispatch(playPause(false));
    } else {
      dispatch(playPause(true));
    }
  };

  // make funtion this handle to next the song.
  const handleNextSong = () => {
    // send action to stop playing current song in PlayerSlicer.js
    dispatch(playPause(false));

    // check value shuffle this make above
    // is shuffle = false  
    if (!shuffle) {
      // dispatch(nextSong((currentIndex + 1) % listOfSongs.length));
      // check current song index if current index < list of songs length (total songs in list) 
      // then set next song is current index song + 1
      // if current song > list of songs length (total songs in list) 
      // then play the first song
      currentIndex == listOfSongs.length - 1 ? dispatch(nextSong(0)) : dispatch(nextSong(currentIndex + 1));
    } else {
      // if shuffle is true
      // then make random number in arraylist songs
      // then send it to reducer
      dispatch(nextSong(Math.floor(Math.random() * listOfSongs.length)));
    }
  };


  //make funtion this handle to previous the song.
  const handlePrevSong = () => {
    // check if the current song is the first song, and user clicked on previous
    // then play last song from the list 
    if (currentIndex === 0) {
      // send a action to reducer with number of the last song 
      dispatch(prevSong(listOfSongs.length - 1));
    } else if (shuffle) {
      // if shuffle is true
      // then send to reducer a random numer between 0 and total songs of the list of songs 
      dispatch(prevSong(Math.floor(Math.random() * listOfSongs.length)));
    } else {
      // if not shuffle or current index is not 0
      // then send to reducer currentIndex -1
      dispatch(prevSong(currentIndex - 1));
    }
  };

  return (
    <div className="relative sm:px-12 px-8 w-full flex items-center justify-between">
      {/* send song infomation to component Tracck throught a props */}
      <Track isPlaying={isPlaying} isActive={isActive} activeSong={activeSong} />
      <div className="flex-1 flex flex-col items-center justify-center">
        {/* Component control (repead, previous, pauze, play, next, shuffle), and past function and song information throught props */}
        <Controls
          isPlaying={isPlaying}
          isActive={isActive}
          repeat={repeat}
          setRepeat={setRepeat}
          shuffle={shuffle}
          setShuffle={setShuffle}
          listOfSongs={listOfSongs}
          handlePlayPause={handlePlayPause}
          handlePrevSong={handlePrevSong}
          handleNextSong={handleNextSong}
        />
        {/* componet rewind the song */}
        <Seekbar
          value={appTime}
          min="0"
          max={duration}
          onInput={(event) => setSeekTime(event.target.value)}
        />
        {/* component to set the song to audio tag */}
        <Player
          activeSong={activeSong}
          volume={volume}
          isPlaying={isPlaying}
          seekTime={seekTime}
          repeat={repeat}
          currentIndex={currentIndex}
          // when song ending, play next song
          onEnded={handleNextSong}
          // set current playback position of the audio
          onTimeUpdate={(event) => setAppTime(event.target.currentTime)}
          // set audio duration
          onLoadedData={(event) => setDuration(event.target.duration)}
        />
      </div>
      <VolumeBar value={volume} min="0" max="1" onChange={(event) => setVolume(event.target.value)} setVolume={setVolume} />
    </div>
  );
};

export default MusicPlayer;
