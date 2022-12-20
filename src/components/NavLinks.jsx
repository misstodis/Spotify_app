import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { HiOutlineHashtag, HiOutlineHome, HiOutlinePhotograph, HiOutlineUserGroup } from 'react-icons/hi';
import { BsMusicNoteList } from 'react-icons/bs';
import ModalAddPlaylist from './Modal/ModalAddPlayList';
import { useSelector } from 'react-redux/es/exports';
import Swal from 'sweetalert2';


function NavLinks({ handleClick }) {
    const [activeNav, setActiveNav] = useState("");
    const [open, setOpen] = useState(false);
    const user = useSelector((state) => state.user);


    // using for playlist modal
    const handleOpen = () => {
        // check for inloged user
        if (!user.userId) {
            Swal.fire({
                icon: 'error',
                title: 'Oops... Please login first!',
            })
        } else {
            setOpen(true)
        }

    };
    const handleClose = () => setOpen(false);

    return (
        <div className="mt-10">
            <NavLink
                className={`flex flex-row justify-start items-center my-8 text-sm font-medium text-gray-400 hover:text-[#39fed0]
                    ${activeNav === 'discover' && "text-[#39fed0]"}
                `}
                to="/"
                onClick={() => { setActiveNav("discover") }}
            >
                <HiOutlineHome className="w-6 h-6 mr-2" />
                Discover
            </NavLink>

            <NavLink
                className={`flex flex-row justify-start items-center my-8 text-sm font-medium text-gray-400 hover:text-[#39fed0]
                    ${activeNav === 'around-you' && "text-[#39fed0]"}
                `}
                to="/around-you"
                onClick={() => { setActiveNav("around-you") }}
            >
                <HiOutlinePhotograph className="w-6 h-6 mr-2" />
                Around You
            </NavLink>

            <NavLink
                className={`flex flex-row justify-start items-center my-8 text-sm font-medium text-gray-400 hover:text-[#39fed0]
                    ${activeNav === 'top-artists' && "text-[#39fed0]"}
                `}
                to="/top-artists"
                onClick={() => { setActiveNav("top-artists") }}
            >
                <HiOutlineUserGroup className="w-6 h-6 mr-2" />
                Top Artists
            </NavLink>

            <div className='flex justify-start items-center my-8 text-sm font-medium text-gray-400'>
                <NavLink
                    className={` flex ${activeNav === 'play-list' && "text-[#39fed0]"} hover:text-[#39fed0]`}
                    to="/playlist"
                    onClick={() => { setActiveNav("play-list") }}
                >
                    <BsMusicNoteList className="w-6 h-6 mr-2" />
                    Playlist

                </NavLink>
                <ModalAddPlaylist user={user} open={open} handleOpen={handleOpen} handleClose={handleClose} />
            </div>


        </div>
    );
}

export default NavLinks;