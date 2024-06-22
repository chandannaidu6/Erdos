import React,{useEffect,useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { Card } from '../components/Card';
import { Appbar } from '../components/Appbar';
export const ProblemDetailPage = () => {
    const { id } = useParams<{id:string}>();
    const [problem,setProblem] =useState<any>(null);
    useEffect(() => {
        const fetchProblem = async () =>{
            try {
                const storedToken = localStorage.getItem('token');
        
        const tokenObject = storedToken ? JSON.parse(storedToken) : null;
        const jwtToken = tokenObject ? tokenObject.jwt : null;
        const response = await axios.get(`${BACKEND_URL}/api/leetcode/landing/${id}`,{
                headers:{
                    Authorization:jwtToken
                }
            }

            )
            setProblem(response.data)
        }
        catch(error){
            console.error('Failed to fetch the problem details',error);
            
        }
        }
        fetchProblem();

    },[id])
    if(!problem){
        return <div>Loading...</div>
    }
    return (
        <div>
            <Appbar/>
            <div>
                <Card>
                    <div className='font-semibold text-xl'>{problem.title}</div>
                    <div className='text-sm text-gray-500'>{problem.difficulty}</div>
                    <div className='text-md'>{problem.description}</div>
                </Card>
            </div>

        </div>
    )
}