import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SwiperSlide, Swiper } from "swiper/react";
import { FreeMode } from "swiper";

import PlayPause from "../PlayPause";
import TopChartCard from "./TopChartCard";

import { playPause, setActiveSong } from "../../redux/features/playerSlice";

import { useGetTopChartQuery } from "../../redux/services/shazamCore";

import 'swiper/css';
import 'swiper/css/free-mode';



const TopPlay = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const { data } = useGetTopChartQuery();
  const divRef = useRef(null);

  useEffect(() => {
    // make div tag stay when scroll
    divRef.current.scrollIntoView({ behavior: 'smooth' });
  })

  const topPlays = data?.slice(0, 5);

  //function when user click on pause , then send to change sat on reducer in playerSlice.js
  // this will stop playing song
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  //function when user click on play 
  const handlePlayClick = (song, i) => {
    // throught dispatch send a action to reducer to set current active song, and store in the payload information of the song
    dispatch(setActiveSong({ song, data, i }));
    // set play song to true to play the song
    dispatch(playPause(true));
  };

  return (
    <div ref={divRef} className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col ">

      {/* =========================Top Chart================= */}
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Charts</h2>
          <Link to="/top-charts" >
            <p className="text-gray-300 tex-base cursor-pointer">See more</p>
          </Link>
        </div>

        <div className="mt-4 flex flex-col gap-1">
          {topPlays?.map((song, i) => (
            <TopChartCard
              key={song?.key}
              song={song}
              i={i}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePauseClick={handlePauseClick}
              handlePlayClick={() => handlePlayClick(song, i)}
            />
          ))}
        </div>
      </div>

      {/* =========================Top Artist================= */}
      <div className="w-full flex flex-col mt-8">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Artist</h2>
          <Link to="/top-artists" >
            <p className="text-gray-300 tex-base cursor-pointer">See more</p>
          </Link>
        </div>
        <Swiper
          slidesPerView="auto"
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
          className="mt-4"
        >
          {topPlays?.map((song, i) => (
            <SwiperSlide
              key={song?.key}
              style={{ width: '25%', height: 'auto' }}
              className="shadow-lg rounded-full animate-slideright"
            >
              <Link to={`/artists/${song?.artists[0].adamid}`}>
                <img
                  src={song?.images.background}
                  alt="name"
                  className="rounded-full w-full object-cover"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}


export default TopPlay;
