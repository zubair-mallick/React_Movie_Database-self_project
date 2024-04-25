
export { removemovie } from "../Reducers/movieSlice"
import axios  from "../../utils/axios";
import { loadmovie } from "../Reducers/movieSlice";

export const asynLoadMovie = (id) => async (dispatch,getState) => {
    try{
        const datail =   await axios.get(`/movie/${id}`);
        const externalid = await  axios.get(`/movie/${id}/external_ids`);
        const recommendations = await  axios.get(`/movie/${id}/recommendations`);
        const similar =await axios.get(`/movie/${id}/similar`)
        const videos =await axios.get(`/movie/${id}/videos`)
        const watchproviders =await axios.get(`/movie/${id}/watch/providers`)
        let UltimateDetails ={
            details: datail.data,
            externalid: externalid.data,
            recommendations: recommendations.data.results,
            similar: similar.data.results,
            videos: videos.data.results.find(m=>m.type==="Trailer"),
            watchProviders: watchproviders.data.results.US
        }
        // console.log(UltimateDetails)
        dispatch(loadmovie(UltimateDetails))
        return 
    
    }
    catch(err){
        console.log(err)
    }
}