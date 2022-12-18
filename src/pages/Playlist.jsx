import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { AiOutlineEdit } from "react-icons/ai"
import { setSelectedPlaylist } from "../redux/user/userSlice";

function Playlist() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const playlists = user.userPlaylists;

    const handleChoosedPlaylist = (playlistName) => {
        dispatch(setSelectedPlaylist(playlistName))
    }

    return (
        <div className='flex flex-col'>
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
                            onClick={() => console.log("tset")}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Playlist;