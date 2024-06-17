import { Appbar } from "../components/Appbar";
import { Card } from "../components/Card";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useState, useEffect } from 'react';
import { Problem } from "../hooks";
import { displayProblems } from "../hooks";



export const Landing = () => {
 const {loading,problems} = displayProblems();

  return (
    <div>
      <Appbar />
      <div className='grid grid-cols-3'>
        <div>
          <Card>
            Start following your friends on Erdős to view their activity feed on the homepage.
          </Card>
          <div className='mt-4'>
            <Card>
              <div className='font-semibold text-center text-xl'>
                Progress
              </div>
              <div className='pt-4'>
                The secret of getting ahead is getting started.
              </div>
            </Card>
          </div>
        </div>
        <div className='ml-4'>
          <Card>
            <div className='font-semibold text-xl'>
              Latest Problems
            </div>
            <div className='pt-4'>
              {loading ? (
                <div>Loading...</div>
              ) : (
                problems.map((problem) => (
                  <div key={problem.id}>
                    <div className='font-bold'>{problem.title}</div>
                    <div className='text-sm'>{problem.description}</div>
                    <div className='text-xs text-gray-500'>{problem.difficulty}</div>
                    <div className='text-xs text-gray-500'>
                      Categories: {problem.problemCategories.map(pc => pc.category.name).join(', ')}
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>
        <Card>
          Start following your friends on Erdős to view their activity feed on the homepage.
        </Card>
      </div>
    </div>
  );
};
