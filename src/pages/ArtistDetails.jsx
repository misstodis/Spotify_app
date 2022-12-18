
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";

import { useGetArtistDetailsQuery } from "../redux/services/shazamCore";

const ArtistDetails = () => {
  // dispatch send state and action to redux
  const dispatch = useDispatch();
  // useParams using to get songid from URL
  const { id: artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);


  const { data: artistData, isFetching: isFetchingArtistDetails, error } = useGetArtistDetailsQuery(artistId);

  if (isFetchingArtistDetails) return <Loader title="Loading artist details" />
  if (error) {
    console.log(error);
    return <Error />
  }

  console.log(artistData);
  // console.log(artistData?.artists[artistId]?.attributes.artwork);
  return (
    <div className="flex flex-col">

      <DetailsHeader artistId={artistId} artistData={artistData.data[0]} />

      <div>
        <h2 className="text-white font-bold text-3xl">
          Artist Bio
        </h2>
        {
          artistData.data[0]?.attributes?.artistBio ?
            (
              <div className="text-gray-300 font-semibold text-lg"
                dangerouslySetInnerHTML={{ __html: artistData.data[0]?.attributes?.artistBio }} >
              </div>
            ) : (
              <div>
                <p className="text-gray-300 font-semibold text-lg"> Currently we are not updating information about the artist yet!</p>
              </div>
            )
        }

      </div>

      {/* <RelatedSongs
        data={Object.values(artistData?.songs)}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
      /> */}
    </div>
  )
};

export default ArtistDetails;
