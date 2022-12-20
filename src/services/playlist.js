import { auth, db } from '../firebase/firebase-config.js.js';
import { doc, setDoc, collection, addDoc, getDoc, getDocs, query, onSnapshot, where } from 'firebase/firestore';
import { async } from '@firebase/util';
import { list } from 'firebase/storage';

export const addPlaylistToFireBase = async (name, user) => {
  const playListName = name;
  const userId = user.userId;

  if (name !== '' && userId !== '') {
    // adding playlist to firebase with userid and name of playlist
    await addDoc(collection(db, 'Playlists'), {
      userId: userId,
      name: playListName,
    });
  }
};

export const addSongToPlaylist = async (playlistId, song) => {
  const songInfo = song;

  if (songInfo || playlistId !== '') {
    await addDoc(collection(db, 'Playlists', playlistId, 'songs'), songInfo);
  }
};
