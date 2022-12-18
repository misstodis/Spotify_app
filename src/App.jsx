import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';

import { Searchbar, Sidebar, MusicPlayer, TopPlay } from './components';
import { ArtistDetails, TopArtists, AroundYou, Discover, Search, SongDetails, TopCharts, Login, Playlist, ListSongs } from './pages';

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase-config.js";
import { setLogedUser, setUserPlayLists } from './redux/user/userSlice';
import { getUserPlaylists } from './services/playlist';


const App = () => {
  const dispatch = useDispatch();
  //get state player from redux and store it in activeSong
  const { activeSong } = useSelector((state) => state.player);

  // get current user from redux
  const currentUser = useSelector((state) => state.user);

  // console.log(currentUser);
  // useffect to track the authentication , if something change in auth then
  // save inloged user and user playlist to redux
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // if there user inloged
      if (user) {
        const userInfo = {
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
          email: user.email,
          userPlaylist: [],
        }
        // set state user in redux
        dispatch(setLogedUser(userInfo));

        // get playlist of user after inloged, this will return a promise
        const playlist = getUserPlaylists(user.uid);
        //get response from promise
        playlist.then((res) => {
          console.log(res);
          // send and save playlist to redux
          dispatch(setUserPlayLists(res));
        })
      }
    });
  }, [auth])


  return (
    <div className="relative flex">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gradient-to-br from-[#141414] to-[#262626]">
        <Searchbar />

        <div className="px-6 h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
          <div className="flex-1 h-fit pb-40">
            <Routes>
              <Route path="/" element={<Discover />} />
              <Route path="/top-artists" element={<TopArtists />} />
              <Route path="/top-charts" element={<TopCharts />} />
              <Route path="/around-you" element={<AroundYou />} />
              <Route path="/artists/:id" element={<ArtistDetails />} />
              <Route path="/songs/:songid" element={<SongDetails />} />
              <Route path="/search/:searchTerm" element={<Search />} />
              <Route path="/login" element={<Login />} />
              <Route path="/playlist" element={<Playlist />} />
              <Route path="/list/:listid" element={<ListSongs />} />
            </Routes>
          </div>
          <div className="xl:sticky relative top-0 h-fit">
            <TopPlay />
          </div>
        </div>
      </div>

      {/* if activesong get from redux exsist and have a title then show Muisc Player */}
      {activeSong?.title && (
        <div className="absolute h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#212121] backdrop-blur-lg rounded-t-3xl z-10">
          <MusicPlayer />
        </div>
      )}
    </div>
  );
};

export default App;
