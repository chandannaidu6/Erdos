import axios from 'axios';
import Cookies from 'js-cookie';
import { BACKEND_URL } from '../config';
import { useState, useEffect } from 'react';

export interface Problem {
    id: string;
    title: string;
    description: string;
    difficulty: string;
    problemCategories: {
        problemId: string;
        categoryId: string;
        category: {
            id: string;
            name: string;
        };
    }[];
}


export const displayProblems = () => {
    const [problems, setProblems] = useState<Problem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const storedToken = localStorage.getItem('token');
        
        const tokenObject = storedToken ? JSON.parse(storedToken) : null;
        const jwtToken = tokenObject ? tokenObject.jwt : null;
        console.log(storedToken);

        axios.get(`${BACKEND_URL}/api/leetcode/landing/list`, {
            headers:{
                Authorization:jwtToken
            }
        })
        .then(response => {
            setProblems(response.data);
            setLoading(false);
        })
        .catch(error => {
            console.error('Error fetching problems:', error);
            setLoading(false);
        });

    }, []);

    return {
        loading,
        problems
    }
}
export interface Submission{
    userId:String;
    problemId:String;
    code:String;
    language:string;
    status:string
}
export const SubmitCode = async ({userId,problemId,code,language,status}:Submission) => {
    try{
        const storedToken = localStorage.getItem('token');
        
        const tokenObject = storedToken ? JSON.parse(storedToken) : null;
        const jwtToken = tokenObject ? tokenObject.jwt : null;
        console.log(storedToken);
        const response = await  axios.post(`${BACKEND_URL}/api/leetcode/submission/create`,{
            userId,
            problemId,
            status,
            code,
            language
        } ,{
            headers:{
                Authorization:jwtToken
            },


    })
    if(!response.data.success){
        throw new Error('Submission Failed')
    }
    return { success: true, data: response.data }; // Return success and data upon successful submission

    }   
    catch(error:any){
        console.error('Error submitting code:', error);
        return { success: false, error: error.message };

    }

}
