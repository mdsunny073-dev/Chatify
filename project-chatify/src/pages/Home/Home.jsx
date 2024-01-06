import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Sidebar from "../../components/Sidebar/Sidebar";
import GroupList from "../../components/GroupList/GroupList";
import { userLoginInfo } from "../../Slices/UserSlice";
import FriendRequest from "../../components/FriendRequest/FriendRequest";
import Friends from "../../components/Friends/Friends";
import MyGroups from "../../components/MyGroups/MyGroups";
import UserList from "../../components/UserList/UserList";
import BlockedUsers from "../../components/BlockedUsers/BlockedUsers";



const Home = () => {
  const auth = getAuth();
  const dispatch = useDispatch()
  const data = useSelector(state=>state.userLoginInfo.userInfo);
  const navigate = useNavigate();
  const [verify, setVerify] = useState(false)
  useEffect(()=>{
    if(!data){
      navigate('/Login')
    }
  },[])
  onAuthStateChanged(auth, (user) => {
    if(user.emailVerified){
      setVerify(true)
      dispatch(userLoginInfo(user))
      localStorage.setItem('userLoginInfo',JSON.stringify(userLoginInfo(user)))
    }else{
      setVerify(false)
    }
});
  return (
    <div>
     {
      verify ?
      <div className="flex">
        <div className="w-[186px]">
          <Sidebar/>
          </div>
        <div className="w-[450px] ml-[100px]">
        <GroupList/>
        <FriendRequest/>
          </div>
        <div className="w-[450px] ml-[100px]">
          <Friends/>
          <MyGroups/>
        </div>
        <div className="w-[450px] ml-[100px]">
          <UserList/>
          <BlockedUsers/>
        </div>
      </div>
      
      :
      <div className="h-screen w-full bg-white absolute top-0 left-0 z-[1] flex justify-center items-center">
        <div className="bg-[#00FE93] w-[800px] p-[60px] rounded-lg">
        <h1 className='text-[#FF0202] font-nunito text-[34.401px] font-bold ml-[140px]'>Please verify your email address</h1>
        <button className="bg-white text-[#FF0202] py-[15px] px-[25px] text-[20px] rounded-lg ml-[250px] mt-[20px]">
          <Link to='/Login'>Back to Login</Link>
        </button>
      </div>
      </div>
     }
        </div>
  )
}

export default Home