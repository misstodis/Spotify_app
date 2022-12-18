import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getSongsFromPlaylist } from "../services/playlist";
import TopChartCard from "../components/TopPlay/TopChartCard";
import { db } from "../firebase/firebase-config.js";
import { collection, deleteDoc, doc, onSnapshot, query } from "firebase/firestore";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import SongBar from "../components/SongBar";
import { info } from "autoprefixer";
import { async } from "@firebase/util";


function ListSongs() {
    const dispatch = useDispatch();
    const { activeSong, isPlaying } = useSelector((state) => state.player);
    // get listID from url
    const { listid } = useParams();
    const [data, setData] = useState([]);

    const user = useSelector((state) => state.user);

    // get songs from playlist
    useEffect(() => {
        let subsc;
        subsc = onSnapshot(query(collection(db, "Playlists", listid, "songs")), (snapshot) => {
            // loop docs toget the songid and songs
            // using detructuring to set sonngid and song data to a object  
            // after that store the object to useState data
            setData(snapshot.docs.map((doc) => ({ songId: doc.id, ...doc.data() })));
        })
    }, [])

    //function when user c  lick on pause , then send to change sat on reducer in playerSlice.js
    // this will stop playing song
    const handlePauseClick = () => {
        dispatch(playPause(false));
    };

    //function when user click on play 
    const handlePlayClick = (song, i) => {
        // throught dispatch send a action to reducer to set current active song, and store in the payload information of the song
        dispatch(setActiveSong({ song, data, i }));
        // set play song to true to play the song
        dispatch(playPause(true));
    };

    // handle detelte song in firebase
    const handleDeleteSong = (songId) => {
        const deltete = async () => {
            if (user.userName) {
                await deleteDoc(doc(db, "Playlists", listid, "songs", songId))
            }
        }
        deltete()
    }


    return (
        <>
            <h2 className='font-bold text-3xl text-white mt-4 mb-5'>
                {user.userSelectedPlaylist}
            </h2>
            {
                data.map((song, i) => <SongBar
                    key={song?.key}
                    song={song}
                    i={i}
                    isPlaying={isPlaying}
                    activeSong={activeSong}
                    handlePauseClick={handlePauseClick}
                    handlePlayClick={() => handlePlayClick(song, i)}
                    handleDeleteSong={handleDeleteSong}
                    isUserPlaylist={true}
                />)
            }

        </>
    )
}

export default ListSongs;