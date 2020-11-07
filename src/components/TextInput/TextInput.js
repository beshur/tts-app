import React from 'react';

const TextInput = (props) => {
  const style = {
    minHeight: '300px',
    width: '100%',
    padding: '20px',
    borderRadius: '20px',
    fontSize: '2rem'
  }

  return (
    <div>
      <textarea style={style} onChange={(e) => props.onChange(e.target.value)} value={props.text} placeholder='Type English text to speak aloud' />
    </div>
  );
};

export default TextInput;
