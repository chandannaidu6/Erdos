import { Card } from "../components/Card";
import { Appbar } from "../components/Appbar";

export const About = () => {
    return <div>
        <Appbar />
        <div className='mt-4'>
        <Card>
            <div className='pb-2 font-semibold text-xl flex justify-start'>
                About
            </div>
            <div className='text-md'>
                Erdős is an application for Math Geeks to try out new mathematical problems and keep track of who solves what. Named after one of the most prolific mathematician of all times, Paul Erdős, it is a portal for users to test their mettle on various mathematical problems, some of which may require users to write code.
                The design of Erdős is clean and card-based, with a focus on user-interaction above everything else. It has been developed by SDSLabs, IIT Roorkee.
            </div>
        </Card>
        </div>
    </div>
}