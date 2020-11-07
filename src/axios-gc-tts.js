import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://texttospeech.googleapis.com',
  headers: {
    'X-Goog-Api-Key': process.env.REACT_APP_GC_KEY
  }
});

export default instance;
