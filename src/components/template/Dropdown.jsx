import React from 'react';

function Dropdown({title,options,func}) {
    return (
        <div className='select' >
            <select onChange={func} defaultValue ="0" name="format" id="format" >
                <option value="0" disabled  >
                    {title.toUpperCase()}

                </option>
                {options.map((d,i) => (
                    <option key={i} value={d} >
                        {d.toUpperCase()}
                    </option>
                ))}
            </select>
        </div>
    );
}  

export default Dropdown;