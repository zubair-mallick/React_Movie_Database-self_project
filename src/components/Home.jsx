import React, { useEffect, useState } from 'react';
import SideNav from './template/SideNav';
import Topnav from './template/Topnav';
import axios from '../utils/axios';
import Header from './template/Header';

function Home(props) {
    document.title="ZMDBS || Home"
    const [wallpaper,setWallpaper ] = useState(null)
    const getHeaderWallpaper = async () => {
        try {
            const {data} = await axios.get(`/trending/all/day`)
           
            setWallpaper(data);
            
        } catch(err) {
            console.log("error:",err)
        }
    }
   
    useEffect(() => {
        !wallpaper && getHeaderWallpaper()
    },[])

    return  wallpaper ? (
       <>
        <SideNav/>    
    
       <div className='w-[80%] min-h-screen'>
        <Topnav/>
        <Header data={wallpaper}/></div>
      
       </>
    ): <h1>loading...</h1>;
}

export default Home;