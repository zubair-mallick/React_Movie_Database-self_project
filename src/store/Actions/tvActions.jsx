
export { removeTv } from "../Reducers/tvSlice"
import axios  from "../../utils/axios";
import { loadTv } from "../Reducers/tvSlice";

export const asynLoadTv = (id) => async (dispatch,getState) => {
    try{
        const datail =   await axios.get(`/tv/${id}`);
        const externalid = await  axios.get(`/tv/${id}/external_ids`);
        const recommendations = await  axios.get(`/tv/${id}/recommendations`);
        const similar =await axios.get(`/tv/${id}/similar`)
        const videos =await axios.get(`/tv/${id}/videos`)
        const watchproviders =await axios.get(`/tv/${id}/watch/providers`)
        const translations =await axios.get(`/tv/${id}/translations`)
    

        let UltimateDetails ={
            details: datail.data,
            externalid: externalid.data,
            recommendations: recommendations.data.results,
            similar: similar.data.results,
            videos: videos.data.results.find(m=>m.type==="Trailer"),
            watchProviders: watchproviders.data.results.US,
            translations: translations.data.translations.map(t=>t.english_name),

        }
        // console.log(UltimateDetails)
        dispatch(loadTv(UltimateDetails))
        return 
    
    }
    catch(err){
        console.log(err)
    }
}