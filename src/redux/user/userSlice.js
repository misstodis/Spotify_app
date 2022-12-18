import { createSlice, current } from '@reduxjs/toolkit';

// create initial state (value) for user
const initialState = {
  userId: '',
  userName: '',
  userImage: '',
  useremail: '',
  userPlaylists: [],
  userSongs: [],
  userSelectedPlaylist: '',
};

// make slice for redux user
const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLogedUser: (sate, action) => {
      sate.userId = action.payload.uid;
      sate.userName = action.payload.displayName;
      sate.userImage = action.payload.photoURL;
      sate.userEmail = action.payload.email;
    },
    setEmptyUser: (sate, action) => {
      sate.userId = '';
      sate.userName = '';
      sate.userImage = '';
      sate.userEmail = '';
    },
    setUserPlayLists: (state, action) => {
      return {
        ...state,
        userPlaylists: [...state.userPlaylists, ...action.payload],
      };
    },

    setUserSong: (state, action) => {
      state.userSongs = action.payload;
    },

    setSelectedPlaylist: (state, action) => {
      state.userSelectedPlaylist = action.payload;
    },
  },
});

export const { setLogedUser, setEmptyUser, setUserPlayLists, setUserSong, setSelectedPlaylist } = UserSlice.actions;

export default UserSlice.reducer;
