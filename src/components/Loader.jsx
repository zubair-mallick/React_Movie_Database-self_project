
import React from 'react';
import image from './../../public/load.gif'
function Loader(props) {
    console.log("props")
    return (
        
        <div className="w-screen h-screen  overflow-hidden flex items-center justify-center ">
        <img className='  object-contain       ' src={image}  alt="notloading" />
            </div>
    );
}

export default Loader;