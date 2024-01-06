import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import GpfpOne from '../../assets/EllipseTwo.png'
import { IoIosSearch } from "react-icons/io";
import { getDatabase, ref, onValue, push, set, remove } from "firebase/database";
import { useSelector } from "react-redux";



const MyGroups = () => {
    const data = useSelector(state => state.userLoginInfo.userInfo);
    const db = getDatabase();

    const [groupList, setGroupList] = useState([])

    useEffect(() => {
        const userRef = ref(db, "mygroup/");
        onValue(userRef, (snapshot) => {
          let array = []
          snapshot.forEach((item) => {
            if(data.uid == item.val().adminid){
                array.push(item.val());
            }
          });
          setGroupList(array)
        });
      }, []);


  return (
    <div>
        <div>
        <div>
<label class="relative block mt-[15px]">
  <span class="sr-only">Search</span>
  <span class="absolute inset-y-0 left-0 flex items-center pl-2">
    <svg class="h-5 w-5 fill-slate-300" viewBox="0 0 20 20"></svg>
  </span>
  <input class="placeholder:italic placeholder:text-[20px] placeholder:text-slate-400 block bg-white w-[427px] border border-slate-300 rounded-md py-[15px] pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Search for anything..." type="text" name="search"/>
</label>
</div>
        <div className='shadow px-[22px] h-[347px] mt-[30px] rounded-[20px] overflow-y-scroll'>
        <div className='flex justify-between'>
            <h2 className='font-pops font-semibold text-[20px] text-[#00]'>My Groups</h2>
            <BsThreeDotsVertical className='text-[#5F35F5]'/>
        </div>
        {
           groupList.map((item)=>(
            <div className='mt-[17px]'>
        <div className='flex items-center border-b-2 pb-[13px]'>
        <img src={GpfpOne} alt="GpfpOne" />
        <div className='ml-[40px]'>
            <h4 className='font-pops font-medium text-[18px] text-[#FF0312]'>Admin: {item.adminname}</h4>
            <h2 className='font-pops font-semibold text-[18px] text-[#00]'>{item.groupname}</h2>
            <h3 className='font-pops font-medium text-[14px] text-[#4D4D4D]'>{item.grouptagline}</h3>
        </div>
        </div>

        </div>
           )) 
        }
    </div>
    </div>
    </div>
  )
}

export default MyGroups
