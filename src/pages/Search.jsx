import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Error, Loader, SongCard } from "../components";
import { useGetSongsBySearchQuery } from "../redux/services/shazamCore";


const Search = () => {
  // get searchTerm from url
  const { searchTerm } = useParams();

  //get state player from redux
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  // get searching data
  const { data, isFetching, error } = useGetSongsBySearchQuery(searchTerm);

  // get songs after search 
  const songs = data?.tracks?.hits?.map((song) => song.track)

  //check fetching
  if (isFetching) return <Loader title="Searching..." />;

  //check error
  if (error) return <Error />

  return (

    <div className='flex flex-col'>
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">Results for: {searchTerm}</h2>

      <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
        {songs?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i={i}
          />
        ))}
      </div>
    </div>
  )
}

export default Search;
