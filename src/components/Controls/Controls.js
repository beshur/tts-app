import React from 'react';
import Dropdown from '../../components/Dropdown/Dropdown';

import css from './Controls.module.css';

const Controls = (props) => {
return (
  <div className={css.Controls}>
    <button className={css.Button} onClick={props.onPlay}>{ props.buttonLabel }</button>

    <Dropdown
      options={props.voices}
      label='Select a voice'
      selected={props.selectedVoice}
      onChange={props.setVoice} />

    <Dropdown
      options={props.speeds}
      label='Select speed'
      selected={props.speed}
      onChange={props.setSpeed} />

  </div>);
};

export default Controls;
