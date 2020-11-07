import React, { Component, createRef } from 'react';
import Controls from '../../components/Controls/Controls';
import TextInput from '../../components/TextInput/TextInput';
import VoiceApi from '../../VoiceApi';

import css from './TTS.module.css';

let speeds = [
  {name: 'Speed: 25%', value: 0.25},
  {name: 'Speed: 50%', value: 0.5},
  {name: 'Speed: 100%', value: 1},
  {name: 'Speed: 150%', value: 1.5},
  {name: 'Speed: 200%', value: 2}
]

class TTS extends Component {
  state = {
    audioResp: {
      audioContent: ''
    },
    voices: [],
    languageCode: 'en-US',
    selectedVoice: '',
    text: 'Let\'s speak now',
    err: '',
    speed: 1,
    playing: false
  }

  constructor(props) {
    super(props);

    this.audioRef = createRef();
  }

  setErr = (err) => {
    this.setState({err: err.toString()});
  }

  setAudioResp = (res) => {
    this.setState({audioResp: res});
  }

  setText = (text) => {
    this.setState({text});
  }

  setVoice = (voiceName) => {
    this.setState({selectedVoice: voiceName});
  }

  setSpeed = (value) => {
    const valueFloat = parseFloat(value);
    let speed = speeds.find(item => item.value === valueFloat);
    if (speed) {
      this.setState({
        speed: speed.value
      });
    }
  }

  validateText() {
    if (!this.state.text) {
      this.setErr('Enter text');
      return false;
    }
    if (/^[a-zA-Z ]+$/.test(this.state.text.replace(/[^\w]/, ''))) {
      this.setErr('');
      return this.state.text;
    } else {
      this.setErr('Please use only English')
      return false;
    }
  }

  play = () => {
    const text = this.validateText();
    if (!text) {
      return;
    }
    VoiceApi.getAudio(text, this.state.languageCode, this.state.selectedVoice)
      .then((res => {
        this.setAudioResp(res);
        this.setErr('');
        if (this.state.audioResp.audioContent) {
          this.audioRef.current.playbackRate = this.state.speed;
          this.audioRef.current.play();

          this.setState({
            playing: true
          });

          this.audioRef.current.addEventListener('ended', () => {
            this.setState({
              playing: false
            });

          });
        }
      })).catch(this.setErr);
  }

  prepareSrcString = () => {
    let srcString = null;
    if (!this.state.err && this.state.audioResp && this.state.audioResp.audioContent) {
      srcString = 'data:audio/mp3;base64,' + this.state.audioResp.audioContent;
    }
    return srcString;
  }

  componentDidMount() {
    VoiceApi.getVoices(this.state.languageCode)
      .then(res => {
        this.setState({
          voices: res.voices
        });
      }).catch(err => {
        this.setState({
          err
        })
        console.error('Voices err', err);
      });
  }

  render() {
    const srcString = this.prepareSrcString();
    const buttonLabel = this.state.playing ? 'Stop' : 'Play';
    return (
      <div>
        { srcString && <audio ref={this.audioRef} src={srcString} /> }

        <div className={css.Controls}>
          <Controls
            onPlay={this.play}
            buttonLabel={buttonLabel}
            voices={this.state.voices}
            selectedVoice={this.state.selectedVoice}
            setVoice={this.setVoice}
            speeds={speeds}
            speed={this.state.speed}
            setSpeed={this.setSpeed} />
        </div>


        <div className={css.TextInput}>
          <TextInput
            onChange={this.setText}
            text={this.state.text}
            placeholder='Type English text to speak aloud' />

          { this.state.err && <div className={css['TTS-err']}>{ this.state.err }</div> }
        </div>
      </div>
    );
  }
};

export default TTS;
