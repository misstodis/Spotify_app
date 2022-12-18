import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { MdPlaylistAdd } from "react-icons/md"
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { addPlaylistToFireBase } from '../../services/playlist';

function ModalEditPLaylist({ open, handleClose, playlistName, handleEditPlaylist, setPlaylistName, handleDeletePlaylist }) {

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
                {/* <h1>Play list</h1> */}
                <div className='flex flex-col items-center justify-center transform bg-black rounded-lg shadow dark:bg-gray-700 h-44 w-96' >
                    <h1 className='text-white text-xl mb-2'>
                        Edit Playlist
                    </h1>
                    <form className="flex flex-col items-center">
                        <div className="relative w-full">
                            <input
                                type="text"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Name"
                                required
                                value={playlistName}
                                onChange={(e) => { setPlaylistName(e.target.value) }}
                            />
                        </div>
                        <div className='flex mt-4'>
                            <button
                                type="button"
                                className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-2"
                                onClick={() => handleEditPlaylist(playlistName)}
                            >
                                Save
                            </button>
                            <button
                                type="button"
                                className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-2"
                                onClick={() => handleDeletePlaylist()}
                            >
                                Delete
                            </button>
                        </div>

                    </form>
                </div>
            </Modal>
        </>

    );
}

export default ModalEditPLaylist;