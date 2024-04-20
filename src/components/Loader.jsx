
import React from 'react';

function Loader(props) {
    return (
        <div className="w-screen h-screen flex items-center justify-center ">
        <img className='w-[30vw] h-[75vh] fit ' src="./loader.gif" alt="" />
            </div>
    );
}

export default Loader;