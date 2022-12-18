import { createSlice, current } from '@reduxjs/toolkit';

// create inital sate for reducer player
const initialState = {
  // element listOfSongs to store all the songs in a array after get the songs from API
  listOfSongs: [],
  // currentIndex using to see which song in the listSonngs above are playing
  currentIndex: 0,
  // isActive using to see is the user clicked on the song
  isActive: false,
  // is playing using to known is the song are playing
  isPlaying: false,
  // activesong is a object to store the song this use chosed
  activeSong: {},
  //
  genreListId: '',
};

// create reducer
const playerSlice = createSlice({
  // name reducer name as player
  name: 'player',
  // set sate as a initial state
  initialState,
  // create reducer with sate and action
  reducers: {
    // =========all this function using to taget user action=======

    //action set active song (when user click on songcard)
    setActiveSong: (state, action) => {
      // set current song (this is a object)
      state.activeSong = action.payload.song;
      // console.log(action);
      if (action.payload?.data?.tracks?.hits) {
        state.listOfSongs = action.payload.data.tracks.hits;
      } else if (action.payload?.data?.properties) {
        state.listOfSongs = action.payload?.data?.tracks;
      } else {
        state.listOfSongs = action.payload.data;
      }
      // set currentIndex to the key of array songs (that mean which one is the current song)
      state.currentIndex = action.payload.i;
      // set is active to true (that mean u already click on and chose a song from a songcard)
      state.isActive = true;
    },

    //action next song
    nextSong: (state, action) => {
      // console.log('State: ', current(state));
      // console.log('Action: ', action);

      // action.payload will return a number
      // check object song in array list of songs if they have track
      // then set current sate activeSong is the track
      if (state.listOfSongs[action.payload]?.track) {
        state.activeSong = state.listOfSongs[action.payload]?.track;
      } else {
        // object song have no track
        // then save the sate activeSong get from the array listOfSongs
        state.activeSong = state.listOfSongs[action.payload];
      }
      // set currentIndex (current song) action.payload return a number after increasing
      state.currentIndex = action.payload;
      // set avtive to true
      state.isActive = true;
    },

    // action previous song
    prevSong: (state, action) => {
      // action.payload will return a number
      // check object song in array list of songs if they have track
      // then set current sate activeSong is the track
      if (state.listOfSongs[action.payload]?.track) {
        state.activeSong = state.listOfSongs[action.payload]?.track;
      } else {
        // then save the sate activeSong get from the array listOfSongs
        state.activeSong = state.listOfSongs[action.payload];
      }
      // set currentIndex (current song) action.payload return a number after increasing
      state.currentIndex = action.payload;
      // set avtive to true
      state.isActive = true;
    },

    //when user send action pause to reducer this will change state isPlaying to false
    playPause: (state, action) => {
      state.isPlaying = action.payload;
    },
    // action to set sate of genre id
    selectGenreListId: (state, action) => {
      state.genreListId = action.payload;
    },
  },
});

// export actions of playerSlice reducer (this action using to change state in reducer)
export const { setActiveSong, nextSong, prevSong, playPause, selectGenreListId } = playerSlice.actions;

export default playerSlice.reducer;
