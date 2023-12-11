import axios from "../../config/axios-config";
import { ParamApi } from "../../../types/commom";

export async function getAllOrganizer(param: ParamApi) {
   const res= await axios({
        url: '/organizer',
        method: 'GET',
        params: param
       
    })
    return res;
}