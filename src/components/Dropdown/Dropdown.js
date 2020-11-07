import React from 'react';

const Dropdown = (props) => {
  const options = props.options.map(item => {
    let value = item.value ? item.value : item.name;
    return (<option key={item.name} value={ value }>{ item.name }</option>)
  });

  const style = {
    padding: '8px 12px',
    border: '1px solid #afc3d4',
    borderRadius: '18px',
    outline: 'none',
    fontSize: '14px',
    cursor: 'pointer'
  }

  return (
    <select onChange={e => props.onChange(e.target.value)} style={style} value={props.selected}>
      <option key='label'>{ props.label }</option>
      { options }
    </select>
  );
};

export default Dropdown;
