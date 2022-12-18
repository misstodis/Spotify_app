import { Error, Loader, SongCard } from '../components';
import { genres } from '../assets/constants';

//import redux this get information about Top musiv in world from API
import { useGetSongByGenreQuery } from '../redux/services/shazamCore';
import { useSelector, useDispatch } from 'react-redux';
import { selectGenreListId } from '../redux/features/playerSlice';
import ModalUserPLaylists from '../components/Modal/ModalUserPLaylists';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const Discover = () => {
    const dispatch = useDispatch();
    //get player list = useSelector() (it will return a state (callback) and choose specify which state I will get)
    const { activeSong, isPlaying, genreListId } = useSelector((state) => state.player);
    const user = useSelector((state) => state.user);

    //store data get from redux (API), and put it in variable
    const { data, isFetching, error } = useGetSongByGenreQuery(genreListId || 'POP');
    // console.log(data);

    const [openModal, setOpenModal] = useState(false)
    const [songToPlayList, setSongToPlayList] = useState();

    // ====== check API before redender page=============
    //check if data from API is fetching 
    if (isFetching) return <Loader title="Loading songs..." />;
    // if there an error while fetching
    if (error) return <Error />;

    //=========== modal=============
    // fuction open modal and get song information
    const handleOpen = (song) => {
        if (user.userId !== "") {
            setOpenModal(true)
            setSongToPlayList(song);
        } else {
            Swal.fire({
                title: "Opps...you need to login first!",
                icon: "error",
            });
        }
    }
    const handleClose = () => {
        setOpenModal(false);
    }

    return (
        <>
            <ModalUserPLaylists open={openModal} user={user} song={songToPlayList} handleClose={handleClose} />
            <div className="flex flex-col">
                <div className="w-full flex justify-between items-center
            sm:flex-row flex-col mt-4 mb-10">
                    <h2 className='font-bold text-3xl text-white'>
                        Discover POP
                    </h2>
                    <select
                        onChange={(e) => dispatch(selectGenreListId(e.target.value))}
                        value={genreListId || 'POP'}
                        className="bg-[#48A6E8] text-black-300  p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
                    >
                        {/* loop and print to the filter music */}
                        {genres.map((genre) => <option key={genre.value} value={genre.value}>{genre.title}</option>)}
                    </select>
                </div>
                <div className="flex flex-wrap sm:justify-start
                justify-center gap-8">
                    {/* loop varable data (data music array) get from a api , loading it in SongCard component and send the infomation of songs throught props  */}
                    {data?.map((song, i) => (
                        <SongCard
                            key={song.key}
                            song={song}
                            isPlaying={isPlaying}
                            activeSong={activeSong}
                            i={i}
                            data={data}
                            handleOpenModal={handleOpen}
                        />
                    ))}
                </div>
            </div>
        </>
    )
};

export default Discover;
