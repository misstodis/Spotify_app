import { Link } from "react-router-dom";


const DetailsHeader = ({ artistId, artistData, songData = null }) => {
  // if artistData exists then 
  const artistInfo = artistData?.attributes;

  return (
    <div className="relative w-full flex flex-col">
      <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28">
        <div className="absolute inset-0 flex items-center">
          <img
            alt="art"
            // print image of the artist if we don't have image of artist then replace it with song image
            src={artistId ? artistInfo.artwork?.url : songData?.images.coverart}
            className="sm:w-48 w28 sm:h-48 h-28 rounded-full border-2 shadow-xl shadow-black"
          />

          <div className="ml-5">
            <p className="font-bold sm:text-3xl text-xl text-white">
              {artistId ? artistInfo.name : songData?.title}
            </p>
            {/* if artistID not exsist */}
            {!artistId && (
              <Link to={`/artists/${songData?.artists[0].adamid}`}>
                <p className="text-gray-400 mt-2 text-base">
                  {songData?.subtitle}
                </p>
              </Link>
            )}
            <p className="text-base text-gray-400 mt-2">
              {artistId
                ? artistData?.attributes?.genreNames[0]
                : songData?.genres?.primary}
            </p>
          </div>
        </div>
      </div>
      <div className="w-full sm:h-44 h-24" />
    </div>
  )
};

export default DetailsHeader;
