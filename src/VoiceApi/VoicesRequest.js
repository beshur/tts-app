import axios from './axios-gc-tts';

const VoicesRequest = (languageCode = 'en-US') => {
  return new Promise((resolve, reject) => {
    axios.get('/v1beta1/voices?languageCode=' + languageCode).then(res => {
      // console.log('voices res.ok', res.status === 200, res);
      if (res.status === 200) {
        resolve(res.data);
      }
    }).catch(err => {
      reject(err);
    });
  });
};

export default VoicesRequest;
