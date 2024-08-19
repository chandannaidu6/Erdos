import { displayProblems} from '../hooks'
import { Appbar } from "../components/Appbar";
import { Card } from "../components/Card";
export const AllProblems = () => {
    const {loading,problems} = displayProblems();
   
     return (
    <div>
        <Appbar />
        <div className='mt-4'>
        <Card>
        {loading?
        (<div>Loading...</div>):(
        (problems.map(problem => (
            <div key={problem.id}>
                <div className='font-semibold text-xl pt-4'>{problem.title}</div>
                <div className='text-sm text-gray-500'>{problem.difficulty}</div>
                <div className='text-sm text-gray-500'>{problem.problemCategories.map(pc => (pc.category.name)).join(', ')}</div>
                <div className='text-md border-b-2 pb-4'>{problem.description}</div>
            </div>
        )))
        )}
        </Card>
        </div>



    </div>
    )
}