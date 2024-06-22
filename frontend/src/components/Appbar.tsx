import React from 'react';
import { Link } from 'react-router-dom';
export const Appbar = () => {
    return (<div>
        <div className="bg-black text-white h-24 px-10  w-full shadow-xl flex items-center">
            <Link to='/landing'><div className="text-3xl h-16 flex items-center">
                Erdos
            </div>
            </Link>
            
            </div>
            <div className='px-10 bg-black text-white flex space-x-8 h-16 items-center'>
            <Link to='/about'><div>
                About
            </div>
            </Link>
            <div>
                Activity
            </div>
            <Link to = '/problems'>
            <div>
                Problems
            </div>
            </Link>
            <div>
                Competitions
            </div>
            <div>
                Leaderboard
            </div>
            </div>

        </div>

  
            


    );
};
