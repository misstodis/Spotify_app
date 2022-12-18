import React from 'react';

const Seekbar = ({ value, min, max, onInput }) => {
  // make function to converts the time to format 0:00
  // time % 60 (Modulus % operator returns the remainder.)
  // and get 2 words from the end 
  const getTime = (time) => `${Math.floor(time / 60)}:${(`0${Math.floor(time % 60)}`).slice(-2)}`;
  return (
    <div className="hidden sm:flex flex-row items-center">
      <p className="text-white">{value === 0 ? '0:00' : getTime(value)}</p>
      <input
        type="range"
        step="any"
        value={value}
        min={min}
        max={max}
        onInput={onInput}
        className="md:block w-24 md:w-56 2xl:w-96 h-1 mx-4 2xl:mx-6 rounded-lg"
      />
      <p className="text-white">{max === 0 ? '0:00' : getTime(max)}</p>
    </div>
  );
};

export default Seekbar;
