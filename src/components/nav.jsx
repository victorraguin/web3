import { BrowserRouter, Routes, Route, useNavigate, Link } from "react-router-dom"
import Explore from "../explore"
import Login from "../login"
import MyProfile from "../myprofile"
import { useAccount } from 'wagmi';
import { ClipboardIcon } from "@heroicons/react/outline"
import ProfileImage from "../utils/profileImages";

const Nav = () => {
    const [{ data: accountData }, disconnect] = useAccount()
    return (

        <BrowserRouter>
            <div className='flex-grow flex justify-end mt-4 mr-12 -mb-20'>
                {
                    accountData ?
                        <div className='flex items-center'>
                            <div className='flex mr-4 gap-4'>
                                <Link className="py-2 px-4 rounded-lg bg-white ml-1" to="/explore">Explore</Link>
                            </div>
                            <button className=" py-2 px-4 rounded-lg bg-white mr-4" onClick={() => {
                                disconnect()
                            }}>Disconnect</button>
                             <Link to="/myprofile"> <ProfileImage width={"63"} rounded={true}/></Link>
                           
                        </div>
                        : <div className="flex items-center">
                        <Link className=" py-2 px-4 rounded-lg bg-white" to={"/"}>Home</Link>
                        <Link className="py-2 px-4 rounded-lg bg-white ml-1" to="/explore">Explore</Link> 
                        </div >
                }
            </div>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/myprofile" element={<MyProfile />} />
            </Routes>

            <div></div>

        </BrowserRouter>
    )
}

export default Nav