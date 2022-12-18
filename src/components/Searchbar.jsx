import axios from "axios";

// import FormData from "form-data";
import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Soundrecorder from "soundrecorder";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase/firebase-config.js";
import shazamSongRecognize from "../services/songRecognize.js";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../services/logout";
import { setEmptyUser } from '../redux/user/userSlice';


import Swal from 'sweetalert2'
import Tippy from '@tippyjs/react';
import Tooltip from '@mui/material/Tooltip';

import Fade from '@mui/material/Fade';
import { FaMicrophone, FaUserAstronaut } from "react-icons/fa";
import { FiLogOut, FiSearch } from "react-icons/fi";


// query get song recongnize

const Searchbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setsSearchTerm] = useState("");
  //get user from redux
  const user = useSelector((state) => state.user);
  //define sound recorder
  const recorder = new Soundrecorder();

  // function search input
  const handleSubmitSearch = (e) => {
    // ignore standard submit form
    e.preventDefault();
    // naviage to this route + input search value
    navigate(`/search/${searchTerm}`);
  }

  //handle recording
  const handleRecorder = () => {
    // start recording
    recorder.start()
    // show a alert
    Swal.fire({
      width: 600,
      padding: '3em',
      color: '#716add',
      background: 'transparent',
      showConfirmButton: false,
      allowOutsideClick: false,
      showCancelButton: true,
      backdrop: `
        rgba(57,254,208,0.7)
        url("https://media.tenor.com/6CE7evf2_7UAAAAi/milk-and-mocha-music.gif")
        center top 
        no-repeat
      `
    })

    // console.log(Swal.getCloseButton());
    // after 10s listened then stop recoding 
    setTimeout(() => {
      recorder.stop().then((file) => {
        handleUploadFIle(file);
      })
    }, 10000);
  }

  // upload file to storerage firebase
  const handleUploadFIle = (file) => {
    if (!file) return;
    // get file name after recording
    const nameFile = file.name;
    // create Storage reference
    const storageRef = ref(storage, nameFile);
    const uploadToFirebase = uploadBytesResumable(storageRef, file)

    // event on state_change 
    uploadToFirebase.on("state_change", () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadToFirebase.snapshot.ref).then((downloadURL) => {
        shazamSongRecognize(downloadURL);
      });
    })
  }

  const handleLogout = () => {
    logout()
      .then(() => {
        // set sate of user in redux empty
        dispatch(setEmptyUser(""));
      })
  }

  return (
    <div className="text-white flex items-center justify-between">
      <form onSubmit={handleSubmitSearch} autoComplete="off" className="p2 text-gray-400 focus-within:text-gray-600" >
        <label htmlFor="search-field" className="sr-only">
          Search songs
        </label>
        <div className="flex flex-row justify-start items-center bg-gradient-to-br from-white/10 to-[#212121] backdrop-blur-lg mt-2 mb-2 ml-2 rounded">
          <FiSearch className="w-5 h-5 ml-4" />
          <input
            className=" flex-1 bg-transparent border-none outline-none placeholder-gray-500 text-base text-white p-4 "
            name="search-field"
            autoComplete="off"
            id="search-field"
            placeholder="Search"
            type="search"
            value={searchTerm}
            onChange={(e) => setsSearchTerm(e.target.value)}
          />
          <FaMicrophone
            className="hover:text-[#39fed0] ml-3 w-4 h-4 mr-2 cursor-pointer"
            onClick={() => handleRecorder}
          />
        </div>
      </form>

      {/* inlogged user */}
      {user?.userName ?
        <Tippy
          className="inline-block items-center border-transparent border-1 rounded-md p-1 mr-2 cursor-pointer"
          interactive
          hideOnClick="true"
          trigger="mouseenter"
          content={
            <div className=" m-0 h-28 w-24 bg-[#48a6e8] rounded-md  ">
              <div
                className="flex gap-1 h-5 items-center p-2 text-black hover:bg-[#39fed0] rounded-md"
                onClick={() => handleLogout()}
              >
                <FiLogOut />
                <button className=" " > Sign out</button>
              </div>
            </div>
          }

        >
          <img className="rounded-full h-auto w-12 hover:scale-125 transition mr-6" src={user.userImage} />
        </Tippy>
        :
        <Tooltip title="Login" placement="left">
          <Link to="/login">
            <FaUserAstronaut className="mr-4 h-6 w-auto hover:text-[#39fed0] cursor-pointer" />
          </Link>
        </Tooltip>
      }
    </div>
  )
}


export default Searchbar;
