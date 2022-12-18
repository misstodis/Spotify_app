import axios from 'axios';
import Swal from 'sweetalert2';

function shazamSongRecognize(urlSong) {
  const options = {
    method: 'GET',
    url: 'https://shazam-song-recognizer.p.rapidapi.com/recognize',
    params: {
      link: urlSong,
    },
    headers: {
      'X-RapidAPI-Key': '3b4be32c57msh00ee1159a1db663p1199bbjsnda7ab8fd36fd',
      'X-RapidAPI-Host': 'shazam-song-recognizer.p.rapidapi.com',
    },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response);
      const data = response?.data?.result;
      if (data) {
        Swal.fire({
          title: data.title,
          text: data.subtitle,
          imageUrl: data.images.coverart,
          imageAlt: 'Song',
          width: 600,
          padding: '3em',
          color: 'white',
          background: 'transparent',
          showConfirmButton: true,
          allowOutsideClick: false,
          backdrop: `
            rgba(57,254,208,0.7)
            center top 
            no-repeat
          `,
        });
      }
    })
    .catch(function (error) {
      console.error(error);
    });
}

export default shazamSongRecognize;
