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
    // get all song in all list of user
    const allSongInLists = user.userAllSongsOfLists;
    const [filterData, setFilterData] = useState([]);

    //store data get from redux (API), and put it in variable
    const { data, isFetching, error } = useGetSongByGenreQuery(genreListId || 'POP');
    // console.log(data);

    const [openModal, setOpenModal] = useState(false)
    const [songToPlayList, setSongToPlayList] = useState();

    useEffect(() => {
        if (data?.length > 0 && allSongInLists.length > 0) {
            // clone songs this get from API
            let datas = [...data];
            // loop all the song from the playlist 
            for (const songInlist of allSongInLists) {
                //  if items in song list from api have the same title with the song in list
                //  then return the position index of the item in the song list from API
                let sIndex = datas?.findIndex((d) => d.title == songInlist.title);
                // check if found something (that mean we have the index)
                if (sIndex > -1) {
                    // create new data (a object with + new items "isInlist")
                    const newdata = {
                        ...songInlist,
                        isInList: true,
                    };
                    // after have index position of the items in array and new data then replace it with new object 
                    datas?.splice(sIndex, 1, newdata);
                }
            }
            setFilterData(datas);

        }
        // if user dont have any songs in the playlist, then just show the normal list
        if (allSongInLists.length === 0) {
            setFilterData(data);
        }
    }, [data, allSongInLists]);

    // ====== check API before redender page=============
    //check if data from API is fetching 
    if (isFetching) return <Loader title="Loading songs..." />;
    // if there an error while fetching
    if (error) return <Error />;

    // console.log(data);
    //=========== modal=============
    // fuction open modal and get song information
    const handleOpenModal = (song) => {
        if (user.userId !== "") {
            setOpenModal(true)
            // callback get song after clicked on heart icon
            // set useState
            setSongToPlayList(song)
        } else {
            Swal.fire({
                title: "Opps...you need to login first!",
                icon: "error",
            });
        }
    }
    const handleCloseModal = () => {
        setOpenModal(false);
    }

    // console.log(data);
    return (
        <>
            {/* ===============modal add song to playlist====================== */}
            <ModalUserPLaylists open={openModal} user={user} song={songToPlayList} handleCloseModal={handleCloseModal} />

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
                    {filterData?.map((song, i) => {
                        return (
                            <SongCard
                                key={song.key}
                                song={song}
                                isPlaying={isPlaying}
                                activeSong={activeSong}
                                i={i}
                                data={data}
                                handleOpenModal={handleOpenModal}
                                currentUser={user}
                            />
                        )
                    })}
                </div>
            </div>
        </>
    )
};

export default Discover;
