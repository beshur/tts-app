import React, { Component } from 'react';
import TextInput from '../../components/TextInput/TextInput';
import TTSRequest from '../../TTSRequest';

class TTS extends Component {
  state = {
    audioResp: {
      audioContent: ''
    },
    text: 'Let\'s speak now',
    err: ''
  }

  setErr = (err) => {
    this.setState({err});
  }

  setAudioResp = (res) => {
    this.setState({audioResp: res});
  }

  setText = (text) => {
    this.setState({text});
  }

  play = () => {
    TTSRequest(this.state.text)
      .then((res => {
        this.setAudioResp(res);
        if (!this.state.err && this.state.audioResp.audioContent) {
          const audioPlayer = new Audio('data:audio/mp3;base64,' + this.state.audioResp.audioContent);
          audioPlayer.play();
        }
      })).catch(this.setErr);
  }

  render() {

    return (
      <div>
        <TextInput onChange={this.setText} text={this.state.text} />
        <button onClick={this.play}>Play</button>

        <div>{ this.state.err }</div>
      </div>
    );
  }
};

export default TTS;
