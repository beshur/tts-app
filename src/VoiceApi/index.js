import TTSRequest from './TTSRequest';
import VoicesRequest from './VoicesRequest'

const VoiceApi = {
  getVoices: VoicesRequest,
  getAudio: TTSRequest
}

export default VoiceApi;
