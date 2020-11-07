import axios from './axios-gc-tts';

const TTSRequest = (text, languageCode, voice) => {
  return new Promise((resolve, reject) => {
    axios.post('/v1beta1/text:synthesize', {
      input: {
        text: text
      },
      voice: {
        languageCode,
        name: voice
      },
      audioConfig: {
        audioEncoding: 'MP3'
      }
    }).then(res => {
      // console.log('TTS res.ok', res.status === 200, res);
      if (res.status === 200) {
        resolve(res.data);
      }
    }).catch(err => {
      reject(err);
    });
  });
};

export default TTSRequest;
