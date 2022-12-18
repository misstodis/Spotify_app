import { auth, db } from '../firebase/firebase-config.js.js';
import { doc, setDoc, collection, addDoc, getDoc, getDocs, query, onSnapshot, where } from 'firebase/firestore';
import { async } from '@firebase/util';

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
  return;
};

export async function getUserPlaylists(userId) {
  const lists = [];
  // define a query to get all playlist depend on userid
  const q = query(collection(db, 'Playlists'), where('userId', '==', userId));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, ' => ', doc.data());
    // console.log(doc.data());
    let data = doc.data();
    data.listId = doc.id;
    lists.push(data);
  });

  return lists;
}

export const addSongToPlaylist = async (playlistId, song) => {
  const songInfo = song;

  if (songInfo || playlistId !== '') {
    await addDoc(collection(db, 'Playlists', playlistId, 'songs'), songInfo);
  }
  return;
};

export const getSongsFromPlaylist = async (listId) => {
  const songs = '';
  const querySnapshot = await getDocs(collection(db, 'Playlists', listId, 'songs'));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, ' => ', doc.data());
    // console.log(doc.data());
    songs = doc.data();
  });

  return songs;
};
