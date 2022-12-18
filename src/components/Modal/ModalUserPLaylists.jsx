import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { MdPlaylistAdd } from "react-icons/md"
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { addSongToPlaylist } from '../../services/playlist';

function ModalUserPLaylists({ open, user, song, handleClose }) {
    const userLists = user.userPlaylists;
    const [playlistId, setPlaylistId] = useState("");

    const handleAddsongToPlaylist = (playlistId, songInfo) => {
        let id = playlistId;
        //check if user not select any playlist
        // then set auto the first list
        if (id == "") {
            id = userLists[0].listId
        }
        addSongToPlaylist(id, songInfo)
    }
    return (
        <>
            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
                className="flex justify-center items-center"
            >
                <div className='flex flex-col items-center justify-center transform bg-black rounded-lg shadow dark:bg-gray-700 h-44 w-96' >

                    <label className="text-white text-xl mb-2">Select an playlist</label>
                    <select
                        onChange={(e) => setPlaylistId(e.target.value)}
                        className="bg-[#48A6E8] text-black-300  p-3 text-sm rounded-lg outline-none w-3/4"
                    >
                        {/* loop and print the play list */}
                        {userLists.map(list => <option key={list.listId} value={list.listId}>{list.name}</option>)}
                    </select>
                    <button
                        className='bg-[#39FED0] p-2 mt-2 rounded-md'
                        onClick={() => handleAddsongToPlaylist(playlistId, song)}
                    >
                        Save
                    </button>
                </div>
            </Modal>
        </>
    );
}

export default ModalUserPLaylists;