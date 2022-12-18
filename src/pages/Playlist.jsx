import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";

import { doc, updateDoc, deleteDoc } from "firebase/firestore";

import { AiOutlineEdit } from "react-icons/ai"
import { setSelectedPlaylist } from "../redux/user/userSlice";
import ModalEditPLaylist from "../components/Modal/ModalEditPLaylist";
import { db } from "../firebase/firebase-config.js";

function Playlist() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const playlists = user.userPlaylists;

    const [openEditModal, setOpenEditModal] = useState(false)
    const [playlistId, setPlaylistId] = useState("");
    const [playlistName, setPlaylistName] = useState("");

    // set choose playlist to user inredux
    const handleChoosedPlaylist = (playlistName) => {
        dispatch(setSelectedPlaylist(playlistName))
    }

    //hanle open modal 
    const handleOpenModal = (playlistId, playlistName) => {
        setOpenEditModal(true)
        setPlaylistName(playlistName);
        setPlaylistId(playlistId);
    }
    // close modal
    const handleCloseModal = () => {
        setOpenEditModal(false);
    }
    // handle edit name of playlist
    const handleEditPlaylist = async (playlistName) => {
        const docRef = doc(db, "Playlists", playlistId)

        await updateDoc(docRef, {
            name: playlistName,
        }).then((res) => {
            //after update close modal
            handleCloseModal();
        })
    }
    //delete playlist
    const handleDeletePlaylist = async () => {
        await deleteDoc(doc(db, "Playlists", playlistId)).then(() => {
            //after delete close modal
            handleCloseModal();
        })

    }


    return (
        <div className='flex flex-col'>
            <ModalEditPLaylist
                open={openEditModal}
                playlistName={playlistName}
                handleClose={handleCloseModal}
                handleEditPlaylist={handleEditPlaylist}
                setPlaylistName={setPlaylistName}
                handleDeletePlaylist={handleDeletePlaylist}
            />
            <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">Your Playlist</h2>

            {playlists.map(playlist => (
                <div className='flex flex-wrap sm:justify-start justify-center gap-8' key={playlist.name}>
                    <div className="w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2">
                        <h3 className="font-bold text-base text-white mr-3 ">
                            #
                        </h3>
                        <Link to={`/list/${playlist?.listId}`} className="flex-1 flex flex-row justify-between items-center" onClick={() => handleChoosedPlaylist(playlist.name)}>
                            <div className="flex-1 flex flex-col justify-items-center mx-3 text-white">
                                {playlist.name}
                            </div>
                        </Link>
                        {/* icon */}
                        <AiOutlineEdit
                            className="w-5 h-auto hover:text-[#39fed0]"
                            onClick={() => handleOpenModal(playlist?.listId, playlist?.name)}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Playlist;