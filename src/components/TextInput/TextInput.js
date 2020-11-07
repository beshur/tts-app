import React from 'react';

const TextInput = (props) => {
  const style = {
    minHeight: '300px',
    width: '100%',
    padding: '20px',
    borderRadius: '20px',
    fontSize: '2rem',
    boxShadow: '0 3px 13px -6px #7b7b7b',
    border: '1px solid #afc3d4',
    outline: 'none',
    resize: 'none'
  }

  return (
    <div>
      <textarea
        style={style}
        onChange={(e) => props.onChange(e.target.value)}
        value={props.text}
        placeholder={props.placeholder} />
    </div>
  );
};

export default TextInput;
