import { FcGoogle, } from "react-icons/fc"
import { AiFillFacebook } from "react-icons/ai"
import { loginWithGoogle, loginWithFacebook } from "../services/authentications";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Login() {
    const user = useSelector((state) => state.user)
    const navigate = useNavigate();

    const handleLoginWithGoogle = () => {
        // after login navigate to home page
        loginWithGoogle().then(() => {
            navigate("/");
        })
    }

    return (
        <div className="flex flex-col">
            <div className="w-full flex justify-between items-center
            sm:flex-row flex-col mt-4 mb-10">
                <h2 className='font-bold text-3xl text-white'>
                    Login
                </h2>
            </div>
            <div className="flex flex-col sm:justify-start justify-center gap-8" >
                <div className="border border-slate-200 w-fit rounded-md flex items-center p-3 cursor-pointer hover:bg-[#4c426e]" onClick={handleLoginWithGoogle}>
                    <FcGoogle className="w-10 h-auto" />
                    <h2 className="text-white font-bold ml-3">Login with Google</h2>
                </div>
                <div className="border border-slate-200 w-fit rounded-md flex items-center p-3 cursor-pointer hover:bg-[#4c426e]" onClick={loginWithFacebook}>
                    <AiFillFacebook className="w-10 h-auto text-[#0061ff80] " />
                    <h2 className="text-white font-bold ml-3">Login with Facebook</h2>
                </div>
            </div>
        </div>
    )

}

export default Login;