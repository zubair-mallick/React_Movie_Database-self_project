import React from 'react';

function Dropdown({ title, options, func }) {
  return (
    <div className='select w-[6.3rem] h-[4vh] md:w-[16vw]  md:h-[4vh] lg:h-[6vh] lg:w-[13vw] '>
      <select className=' ' onChange={func} defaultValue="0" name="format" id="format" style={{ fontSize: '.8rem', width: '100%', maxWidth: '18rem' }}>
        <option value="0" disabled>
          {title.toUpperCase()}
        </option>
        {options.map((d, i) => (
          <option key={i} value={d}>
            {d.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Dropdown;
