import axios from "axios";
import { constants } from "../constants";

type Language = keyof typeof constants;

const API = axios.create({
    baseURL:"https://emkc.org/api/v2/piston"
})


export const executeCode = async (language:Language,sourceCode:string) => {
    try{
    const response = await API.post("/execute",{
        language:language,
        version:constants[language],
        files: [
        {
            content:sourceCode
        }
        ],

    });
    return response.data
    }catch (error:any) {
        if (error.response?.status === 429) {
            console.error('Rate limit exceeded. Please wait before retrying.');
        } else {
            throw error;
        }
    }

}