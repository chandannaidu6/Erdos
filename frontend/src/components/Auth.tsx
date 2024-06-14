import { ChangeEvent,useState } from 'react'
import { BACKEND_URL } from '../config'
import { Link,useNavigate} from 'react-router-dom'
import axios from 'axios'

interface Inputtype{
    Username:string;
    Password:string;
    Confirm:string;
    Email:string;
}
 
export const Auth = ({type}:{type:"signup"|"signin"}) => {
    const [postInputs,setpostInputs] = useState<Inputtype>({
        Username:"",
        Password:"",
        Confirm:"",
        Email:""
    });
 const navigate = useNavigate();
 async function sendRequest(){
    try{
        await axios.post(`${BACKEND_URL}/api/leetcode/user/signup`,postInputs)
        navigate('/problems')
    }
    catch(e){
        alert("Error while Signingup")
    }
}

    return <div className='h-screen flex justify-center flex-col bg-white'>
        
        <div className='flex justify-center'>
            <div className='bg-gray-100 shadow-xl rounded-lg p-10 '>
            <div className='px-10'>
            
            <div className='text-3xl font-extrabold'>
            Create an Account
            </div>
            <div className='text-slate-400'>
                {type==="signin"?"Don't have an account?":"Already have an Account"}
                <Link className= 'underline' to={type==='signin'?'/signup':'/signin'}>
                    {type==='signin'?'Sign up':'Sign in'}
                </Link>
            </div>
        <LabelledInput label='Username' placeholder='Chandan..' onChange={(e) => {
            setpostInputs(c => ({
                ...c,
                Username:e.target.value

            }))
        }} />
        <LabelledInput type={'email'} label='Email' placeholder='abc@gmail.com' onChange={(e) => {
            setpostInputs(c => ({
                ...c,
                Email:e.target.value

            }))
        }} />
        <LabelledInput type={'password'} label='Password' placeholder='********' onChange={(e) => {
            setpostInputs(c => ({
                ...c,
                Password:e.target.value

            }))
        }} />
        <LabelledInput type={'password'} label='Confirm Password' placeholder='********' onChange={(e) => {
            setpostInputs(c => ({
                ...c,
                Confirm:e.target.value

            }))
        }} />
        <button onClick={sendRequest} type="button" className="mt-6 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Signup</button>

    </div>
    </div>
    </div>
    </div>





}


interface LabelledInputType{
    label:string;
    placeholder:string;
    onChange:(e:ChangeEvent<HTMLInputElement>) => void;
    type?:string
}
function LabelledInput({label,placeholder,onChange,type}:LabelledInputType){
    return <div>
        <div>
            <label className='block mb-2 text-sm font-semibold text-gray-900 dark:text-white pt-6'>{label}</label>
            <input onChange={onChange} type= {type||"text"} id="first_name" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder={placeholder} required />
        </div>
    </div>
}