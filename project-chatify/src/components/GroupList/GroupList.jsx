import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import GpfpOne from '../../assets/EllipseTwo.png'
import { IoIosSearch } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import { IoIosArrowRoundBack } from "react-icons/io";
import { getDatabase, ref, onValue, push, set, remove } from "firebase/database";
import { useSelector } from "react-redux";



const GroupList = () => {
    const data = useSelector(state => state.userLoginInfo.userInfo);
    const db = getDatabase();
    const [show, setShow] = useState(false)
    const [groupName, setGroupName] = useState('')
    const [groupTagLine, setGroupTagline] = useState('')

    const handleGroup = () =>{
        setShow(!show)
    }

    const handleCreateName = () =>{
        set(push(ref(db, "mygroup/")), {
            groupname: groupName,
            grouptagline: groupTagLine,
            adminname: data.displayName,
            adminid: data.uid
           })
    }

    const [allGroups, setAllGroups] = useState([])

    useEffect(() => {
        const userRef = ref(db, "mygroup/");
        onValue(userRef, (snapshot) => {
          let array = []
          snapshot.forEach((item) => {
            if(data.uid != item.val().adminid){
                array.push(item.val());
            }
          });
          setAllGroups(array)
        });
      }, []);

  return (
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
        <div>
        <div className='shadow px-[22px] h-[347px] mt-[30px] rounded-[20px] overflow-y-scroll'>
        <div className='flex justify-between items-center'>
            <h2 className='font-pops font-semibold text-[20px] text-[#00]'>Groups List</h2>
            {
                show ?
                <div className='items-center'>
                    <button onClick={handleGroup} className='flex bg-[#FF0202] text-white py-[5px] px-[10px] text-[20px] rounded-lg'>
                Go Back
                <div className='mt-[px] ml-[5px] text-[32px]'>
                <IoIosArrowRoundBack className=''/>
                </div>
            </button>
                </div>
            :
           <div className='items-center'>
             <button onClick={handleGroup} className='flex bg-primary text-white py-[5px] px-[15px] text-[20px] rounded-lg'>
                Create Group
                <FaPlus className='ml-[10px] mt-[4px]'/>

            </button>
           </div>
            }
        </div>
        
        {
            show ?
            <div className='mt-[10px]'>
                <input onChange={(e)=>setGroupName(e.target.value)} type="text" placeholder='Input a group name' className='w-full py-[20px] px-[10px] border-b-2 border-[#11175D] mt-[10px'/>
                <input onChange={(e)=>setGroupTagline(e.target.value)} type="text" placeholder='Input a group tag name' className='w-full py-[20px] px-[10px] border-b-2 border-[#11175D] mt-[10px]'/>
                <button onClick={handleCreateName} className='bg-primary text-white w-full py-[15px] mt-[10px] rounded-lg'>Create Group</button>
            </div>
            :
        <>
        {
            allGroups.map((item)=>(
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
        </>
        }
    </div>
    </div>
    </div>
  )
}

export default GroupList
