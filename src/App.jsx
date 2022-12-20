import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';

import { Searchbar, Sidebar, MusicPlayer, TopPlay } from './components';
import { ArtistDetails, TopArtists, AroundYou, Discover, Search, SongDetails, Login, Playlist, ListSongs } from './pages';

import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase/firebase-config.js";
import { setAllSongsOfTheLists, setLogedUser, setUserPlayLists } from './redux/user/userSlice';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
// import { getAllSongsOfUserPlaylists } from './services/playlist';

const App = () => {
  const dispatch = useDispatch();
  //get state player from redux and store it in activeSong
  const { activeSong } = useSelector((state) => state.player);
  const user = useSelector((state) => state.user);



  // useffect to track the authentication and database, if something changethen
  // save inloged user and user playlist to redux
  // and get playlist of user 
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

        // get user playlist
        let subcs;
        // define a query to get all playlist depend on userid
        const q = query(collection(db, 'Playlists'), where('userId', '==', user.uid));
        // after get user playlist depend on userid
        // then save it in redux 
        subcs = onSnapshot(q, (snapshot) => {
          // dispatch userplaylist to redux
          dispatch(
            setUserPlayLists(snapshot.docs.map((doc) => ({ ...doc.data(), listId: doc.id })))
          )
        });


        return subcs;
      }
    });
  }, [auth, db])

  useEffect(() => {
    const lists = user.userPlaylists
    if (lists.length > 0) {
      lists.map((list) => {
        const q = query(collection(db, 'Playlists', list.listId, 'songs'));
        // after get user playlist depend on userid
        // then save it in redux
        onSnapshot(q, (snapshot) => {

          dispatch(
            setAllSongsOfTheLists(
              snapshot.docs.map((doc) => ({ ...doc.data(), listId: doc.id }))
            )
          );
        });
      })
    }

  }, [user.userPlaylists])

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
