import axios from 'axios'
import Cookies from 'js-cookie'
import { BACKEND_URL } from '../config'

const getJwtToken = () => {
    return Cookies.get('jwt')
}
export  const Problems = async () => {
    const jwtToken = getJwtToken();
    try{
        const response = await axios.get(`${BACKEND_URL}/api/leetcode/landing/list`,{
            withCredentials:true,

        });
        return response.data
    }
    catch(error){
        console.error('Error fetching',error);
        throw error

    }
}



