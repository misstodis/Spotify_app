import React from 'react';
import { MdSkipNext, MdSkipPrevious } from 'react-icons/md';
import { BsArrowRepeat, BsFillPauseFill, BsFillPlayFill, BsShuffle } from 'react-icons/bs';

// make Controls component for (repead, previous, pauze, play, next, shuffle) 
const Controls = ({ isPlaying, repeat, setRepeat, shuffle, setShuffle, listOfSongs, handlePlayPause, handlePrevSong, handleNextSong }) => (
  <div className="flex items-center justify-around md:w-36 lg:w-52 2xl:w-80">
    {/* change color icon and set Repeat when onlick
      * (prev is a callback, this will return current valure of state )set Repeat to true and false
    */}
    <BsArrowRepeat size={20} color={repeat ? '#39FED0' : 'white'} onClick={() => setRepeat((prev) => !prev)} className="hidden sm:block cursor-pointer" />
    {/* check if listOfSongs exist , and haven songs in the list , if true then this will appear the icon ,if false this will ignore and skip
      * onlick function (using callback ) to handlePrevSong
    */}
    {listOfSongs?.length && <MdSkipPrevious size={30} color="#FFF" className="cursor-pointer" onClick={handlePrevSong} />}
    {/* 
      * check isPlaying ,  is true then show pase icon else sow play icon 
      * onclick using also callback function get from props
    */}
    {isPlaying ? (
      <BsFillPauseFill size={45} color="#FFF" onClick={handlePlayPause} className="cursor-pointer" />
    ) : (
      <BsFillPlayFill size={45} color="#FFF" onClick={handlePlayPause} className="cursor-pointer" />
    )}
    {/* next song */}
    {listOfSongs?.length && <MdSkipNext size={30} color="#FFF" className="cursor-pointer" onClick={handleNextSong} />}
    {/* shuffle */}
    <BsShuffle size={20} color={shuffle ? '#39FED0' : 'white'} onClick={() => setShuffle((prev) => !prev)} className="hidden sm:block cursor-pointer" />
  </div>


);

export default Controls;
