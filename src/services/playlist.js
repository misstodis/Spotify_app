import { auth, db } from '../firebase/firebase-config.js.js';
import {
  doc,
  setDoc,
  collection,
  addDoc,
  getDoc,
  getDocs,
  query,
  onSnapshot,
  where,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { async } from '@firebase/util';
import { list } from 'firebase/storage';

export const addPlaylistToFireBase = async (name, user) => {
  const playListName = name;
  const userId = user.userId;

  if (playListName !== '' && userId !== '') {
    // adding playlist to firebase with userid and name of playlist and time upload
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

// delete song from playlist
export const DeleteSongInPlaylist = async (user, listId, songId) => {
  if (user.userName) {
    await deleteDoc(doc(db, 'Playlists', listId, 'songs', songId));
  }
};
