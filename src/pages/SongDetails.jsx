import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";

import { setActiveSong, playPause } from "../redux/features/playerSlice";

import { useGetSongDetailsQuery, useGetSongRelatedQuery } from "../redux/services/shazamCore";

const SongDetails = () => {
    // dispatch send state and action to redux
    const dispatch = useDispatch();
    // useParams using to get songid from URL
    const { songid } = useParams();
    const { activeSong, isPlaying } = useSelector((state) => state.player);
    // get song details 
    const { data: songData, isFetching: isFetchingSongDetails } = useGetSongDetailsQuery(songid);

    const artistId = null;

    const { data, isFetching: isFetchingRelated, error } = useGetSongRelatedQuery(songid);

    if (isFetchingSongDetails || isFetchingRelated) return <Loader title="Loading song details" />
    if (error) return <Error />


    //function when user click on pause , then send to change sat on reducer in playerSlice.js
    // this will stop playing song
    const handlePauseClick = () => {
        dispatch(playPause(false));
    };

    //function when user click on play 
    const handlePlayClick = (song, data, i) => {
        // throught dispatch send a action to reducer to set current active song, and store in the payload information of the song
        dispatch(setActiveSong({ song, data, i }));
        // set play song to true to play the song
        dispatch(playPause(true));
    };

    return (
        <div className="flex flex-col">
            <DetailsHeader artistId={artistId} songData={songData} />

            <div className="mb-10">
                <h2 className="text-white text-3xl font-bold">Lyrics:</h2>

                <div className="mt-5">
                    {/* check song data for lyrics and print it */}
                    {songData?.sections[1].type === "LYRICS" ?
                        songData?.sections[1].text.map((line, i) => (
                            <p className="text-gray-400 text-base my-1" key={i + line}>{line}</p>
                        )) :
                        <p className="text-gray-400 text-base my-1">Sorry, no lyrics found for this song!</p>
                    }
                </div>
            </div>

            <RelatedSongs
                data={data}
                isPlaying={isPlaying}
                activeSong={activeSong}
                handlePauseClick={handlePauseClick}
                handlePlayClick={handlePlayClick}
                artistId={artistId}
            />
        </div>
    )
};

export default SongDetails;
