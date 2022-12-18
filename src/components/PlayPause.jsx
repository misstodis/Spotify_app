import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";

//components PlayPause
// this get information about the song through props
const PlayPause = ({ isPlaying, activeSong, song, handlePause, handlePlay }) => {
  return (
    // check current song playing, if play or not then show difference icons 
    // and when clicked on the play/pause icon this will run fuction handlePause ,handlePlay (this function get from props)
    isPlaying && activeSong?.title === song.title ? (
      <FaPauseCircle size={35} className="text-[#39FED0]" onClick={handlePause} />
    ) : (
      <FaPlayCircle size={35} className="text-[#39FED0]" onClick={handlePlay} />
    )
  )
};

export default PlayPause;
