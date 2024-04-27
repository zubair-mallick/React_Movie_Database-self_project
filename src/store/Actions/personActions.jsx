
export { removePeople } from "../Reducers/personSlice"
import axios  from "../../utils/axios";
import { loadPeople } from "../Reducers/personSlice";

export const asynLoadPerson = (id) => async (dispatch,getState) => {
    try{
        const datail =   await axios.get(`/person/${id}`);
        const externalid = await  axios.get(`/person/${id}/external_ids`);
        const combinedCredits = await  axios.get(`/person/${id}/combined_credits`);
        const tvCredits = await  axios.get(`/person/${id}/tv_credits`);
        const movieCredits = await  axios.get(`/person/${id}/movie_credits`);


     

       
    

        let UltimateDetails ={
            details: datail.data,
            externalid: externalid.data,
            combinedCredits: combinedCredits.data,
            tvCredits: tvCredits.data,
            movieCredits: movieCredits.data
        }
        
        dispatch(loadPeople(UltimateDetails))
        return 
    
    }
    catch(err){
        console.log(err)
    }
}