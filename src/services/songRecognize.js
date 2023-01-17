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
      'X-RapidAPI-Key': '8a5a2b2e56mshdef20ef3d44a938p1ac7ccjsnd0963e5a8d56',
      'X-RapidAPI-Host': 'shazam-song-recognizer.p.rapidapi.com',
    },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response);
      const data = response?.data?.result;
      if (data != '') {
        Swal.fire({
          title: data.title,
          text: data.subtitle,
          imageUrl: data.images.coverart,
          html: `<a href= ${data?.hub?.provider[1]?.action[0]?.uri} >links</a> `,
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
      } else {
        Swal.fire({
          title: 'nothings found!',
          color: 'white',
          text: 'maybe poor sound quality, please try again!',
          icon: 'warning',
          showConfirmButton: true,
        });
      }
    })
    .catch(function (error) {
      Swal.fire({
        title: 'Opps...',
        icon: 'error',
        color: 'white',
        text: 'something went wrong with server please try again later!',
        background: 'transparent',
        showConfirmButton: true,
        allowOutsideClick: false,
        backdrop: `
          rgba(57,254,208,0.7)
          center top 
          no-repeat
        `,
      });
    });
}

export default shazamSongRecognize;
