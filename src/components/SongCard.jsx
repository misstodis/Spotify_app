
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import ModalUserPLaylists from "./Modal/ModalUserPLaylists";
import { useState } from "react";
import Swal from "sweetalert2";
import { db } from "../firebase/firebase-config.js";
import { deleteDoc, query } from "firebase/firestore";
import { DeleteSongInPlaylist } from "../services/playlist";

const SongCard = ({ song, isPlaying, activeSong, data, i, handleOpenModal, currentUser }) => {
  // create a dispatch to send sate and action to reducer
  const dispatch = useDispatch();

  //function when user click on pause , then send to change sat on reducer in playerSlice.js
  // this will stop playing song
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  //function when user click on play 
  const handlePlayClick = () => {
    // throught dispatch send a action to reducer to set current active song, and store in the payload information of the song
    dispatch(setActiveSong({ song, data, i }));
    // set play song to true to play the song
    dispatch(playPause(true));
  };

  // delete song in playlist when on heart icon cliked 
  const handleRemoveSongInPlaylist = (listId, songId) => {
    DeleteSongInPlaylist(currentUser, listId, songId).then((res) => {
      console.log(res);
    }).catch((erorr) => {
      Swal.fire({
        title: `error ${erorr}`,
        icon: "error",
        text: "something went wrong , please try again later!",
        showConfirmButton: true,
      })
    })

  }

  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-56 group">
        {/* check current active song and change the style*/}
        <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex 
        ${activeSong?.title === song.title ? 'flex bg-black bg-opacity-70' : 'hidden'}`}>
          {/* play and pause button at middel of the card song */}
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>
        <img alt="song_img" src={song.images?.coverart} />
      </div>
      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-lg text-white truncate hover:text-[#39FED0]">
          {/* link to song page */}
          <Link to={`/song/${song?.key}`} >{song.title}</Link>
        </p>
        <p className="text-sm text-gray-300 mt-1 truncate hover:text-[#39FED0]" >
          {/* link to page artist of the song  */}
          <Link to={song.artists ? `/artists/${song.artists[0]?.adamid}` : 'top-artists'} >
            {song.subtitle}
          </Link>
        </p>
        <div className="w-full flex justify-end">
          {
            song?.isInList ?
              <AiFillHeart
                className="w-5 h-5 text-[#39FED0] hover:text-white"
                onClick={() => handleRemoveSongInPlaylist(song.listId, song.songId)}
              />
              :
              <AiOutlineHeart className="w-5 h-5 text-white hover:text-[#39FED0]"
                // send song information to the modal
                onClick={() => handleOpenModal(song)}
              />
          }
        </div>
      </div>
    </div>
  );
}

export default SongCard;
