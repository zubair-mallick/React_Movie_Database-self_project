import React, { useEffect, useState } from 'react';
import SideNav from './template/SideNav';
import Topnav from './template/Topnav';
import axios from '../utils/axios';
import Header from './template/Header';
import HorizontalCards from './template/HorizontalCards';

function Home(props) {
    document.title="ZMDBS || Home"
    const [wallpaper,setWallpaper ] = useState(null)
    const [Trending,setTrending] = useState(null)

    const getHeaderWallpaper = async () => {
        try {
            const {data} = await axios.get(`/trending/all/day`)
           
            setWallpaper(data);
            
        } catch(err) {
            console.log("error:",err)
        }
    }

    const getTrending = async () => {
        try {
            const {data} = await axios.get(`/trending/all/day`)
           
            setTrending(data.results);
            
        } catch(err) {
            console.log("error:",err)
        }
    }
   
    useEffect(() => {
        !wallpaper && getHeaderWallpaper()
        !Trending && getTrending()
    },[])
    console.log("trending",Trending)
    return  wallpaper && Trending ? (
       <>
        <SideNav/>    
    
       <div className='ml-[17vw] overflow-x-hidden  overflow-auto'>
        <Topnav/>
        <Header data={wallpaper}/>
         <HorizontalCards data={Trending} />
        </div>
        
       </>
    ): <h1 className='text-4xl '>loading...</h1>;
}

export default Home;