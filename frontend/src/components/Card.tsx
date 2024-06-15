import { ReactNode } from 'react'
interface CardProps{
    children:ReactNode;
} 
export const Card:React.FC<CardProps> = ({children}) =>{
    return <div>
        <div className= 'bg-gray-100 shadow-xl rounded-lg p-10'>
            {children}
        </div>

    </div>
}