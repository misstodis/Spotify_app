import React from 'react';
import { BsFillVolumeUpFill, BsVolumeDownFill, BsFillVolumeMuteFill } from 'react-icons/bs';

const VolumeBar = ({ value, min, max, onChange, setVolume }) => (
  <div className="hidden lg:flex flex-1 items-center justify-end">
    {/* if value of volume  <= 1 and > 0.5 then show icon BsFillVolumeUpFill else this will igore and not do anything */}
    {/* when onclick on volume icon this will mute */}
    {value <= 1 && value > 0.5 && <BsFillVolumeUpFill size={25} color="#FFF" onClick={() => setVolume(0)} />}

    {value <= 0.5 && value > 0 && <BsVolumeDownFill size={25} color="#FFF" onClick={() => setVolume(0)} />}

    {value === 0 && <BsFillVolumeMuteFill size={25} color="#FFF" onClick={() => setVolume(0.5)} />}

    <input
      type="range"
      step="any"
      value={value}
      min={min}
      max={max}
      // onchange event: when u slide the sound track this will cahnge the volume
      onChange={onChange}
      className="2xl:w-40 lg:w-32 md:w-32 h-1 ml-2"
    />
  </div>
);

export default VolumeBar;
