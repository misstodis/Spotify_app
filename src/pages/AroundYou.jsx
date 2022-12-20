import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

import { Error, Loader, SongCard } from "../components";
import { useGetSongByCountryQuery } from "../redux/services/shazamCore";
import ModalUserPLaylists from '../components/Modal/ModalUserPLaylists';


const CountryTracks = () => {
    const user = useSelector((state) => state.user);
    const [country, setCountry] = useState('');
    const [loading, setLoading] = useState(true);
    const { activeSong, isPlaying } = useSelector((state) => state.player);

    const { data, isFetching, error } = useGetSongByCountryQuery(country);

    const [openModal, setOpenModal] = useState(false)
    const [songToPlayList, setSongToPlayList] = useState();

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

    // API to get the current country of user
    useEffect(() => {
        // APIKEY: at_TBHGl4Z8d95AJMxeg14tgRLdN0FM4
        axios.get(`https://geo.ipify.org/api/v2/country?apiKey=at_TBHGl4Z8d95AJMxeg14tgRLdN0FM4`)
            .then((res) =>
                setCountry(res?.data.location.country)
            )
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    }, [country]);


    //check fetching
    if (isFetching && loading) return <Loader title="Loading songs around you" />;

    //check error
    if (error) return <Error />

    return (
        <>
            {/* ===============modal add song to playlist====================== */}
            <ModalUserPLaylists open={openModal} user={user} song={songToPlayList} handleCloseModal={handleCloseModal} />

            <div className='flex flex-col'>
                <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">Top trending {country}</h2>

                <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
                    {data?.map((song, i) => (
                        <SongCard
                            key={song.key}
                            song={song}
                            isPlaying={isPlaying}
                            activeSong={activeSong}
                            data={data}
                            i={i}
                            handleOpenModal={handleOpenModal}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default CountryTracks;
