import { Link } from "react-router-dom";
import PlayPause from "../PlayPause";


function TopChartCard({ song, i, isPlaying, activeSong, handlePauseClick, handlePlayClick }) {
    return (
        <div className="w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2">
            <h3 className="font-bold text-base text-white mr-3 ">
                {i + 1}
            </h3>
            <div className="flex-1 flex flex-row justify-between items-center">
                <img className="w-20 h-20 rounded-lg" src={song?.images.coverart} alt={song?.title} />
                <div className="flex-1 flex flex-col justify-items-center mx-3">
                    <Link to={`/songs/${song?.key}`}>
                        <p className="md:text-clip text-xl font-bold text-white hover:text-[#39fed0]">{song.title}</p>
                    </Link>
                    <Link to={`/artists/${song?.artists[0].adamid}`}>
                        <p className="text-ase text-gray-300 max-w-xs hover:text-[#39fed0]">{song?.subtitle}</p>
                    </Link>
                </div>
            </div>
            <PlayPause
                isPlaying={isPlaying}
                activeSong={activeSong}
                song={song}
                handlePause={handlePauseClick}
                handlePlay={handlePlayClick}
            />
        </div>
    )
}

export default TopChartCard;