import { Auth } from "../components/Auth";
import { Appbar } from "../components/Appbar";
export const Signin = () => {
    return <div>
        <Appbar />
        <div>
            <Auth type={'signin'}/>
        </div>
    </div>
}