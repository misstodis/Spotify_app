import SongBar from './SongBar';

const RelatedSongs = ({ data, isPlaying, activeSong, handlePauseClick, handlePlayClick, artistId }) => {
  console.log(data);
  return (
    <div className='flex flex-col'>
      <h1 className='font-bold text-3xl text-white'>Realated Songs:</h1>

      <div className='mt-6 w-full flex flex-col'>
        {data?.map((song, i) => (
          <SongBar
            key={song.key ? `${song.key}-${artistId}` : `${artistId + i}`}
            song={song}
            i={i}
            artistId={artistId}
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePauseClick={handlePauseClick}
            handlePlayClick={() => handlePlayClick(song, data, i)}
          />
        ))}
      </div>

    </div>
  );
}
export default RelatedSongs;
