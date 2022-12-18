import { useNavigate } from "react-router-dom";



const ArtistCard = ({ track, i }) => {
  const navigate = useNavigate();
  // console.log(track)
  return (
    <div
      className="flex flex-col w-[250px] p4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer"
      onClick={() => navigate(`/artists/${track?.artists[0].adamid}`)}
    >
      <img alt="" src={track?.images?.background} />
      <p className="mt-4 font-semibold text-lg text-white ml-2 truncate">
        {`${i}. ${track.subtitle}`}
      </p>
    </div>
  )

};

export default ArtistCard;
