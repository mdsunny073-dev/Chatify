import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import GpfpOne from '../../assets/EllipseTwo.png'
import { IoIosSearch } from "react-icons/io";
import { getDatabase, ref, onValue, push, set, remove } from "firebase/database";
import { useSelector } from "react-redux";



const Friends = () => {
  const data = useSelector(state => state.userLoginInfo.userInfo);
  const db = getDatabase();

  const [frndList, setFrndList] = useState([]);
  useEffect(()=>{
    const frndRef = ref(db, "frnd/");
    onValue(frndRef, (snapshot) => {
        let array = []
      snapshot.forEach((item) => {
        if(item.val().receiverid == data.uid || item.val().senderid == data.uid){  
            array.push({...item.val(), key:item.key})
            
        }
      })
      setFrndList(array)
    });
  },[])

  const handleBlock = (item) =>{
    console.log(item);
    if(data.uid == item.senderid){
      set(push(ref(db, 'block/')),{
        block: item.ite,
        blockid: item.receiverid,
        blockby: item.sendername,
        blockbyid: item.senderid
      }).then(()=>{
        remove(ref(db, 'frnd/' + item.key));
      })
    }else{
      set(push(ref(db, 'block/')),{
        block: item.sendername,
        blockid: item.senderid,
        blockby: item.receivername,
        blockbyid: item.receiverid
      }).then(()=>{
        remove(ref(db, 'frnd/' + item.key));
      })
    }
  }
  
  
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
            <h2 className='font-pops font-semibold text-[20px] text-[#00]'>Friends</h2>
            <BsThreeDotsVertical className='text-[#5F35F5]'/>
        </div>
        <div>

            {
                frndList.map((item)=>(
                  <div className='mt-[17px]'>
                    <div className='flex justify-between items-center border-b-2 pb-[13px]'>
        <img src={GpfpOne} alt="GpfpOne" />
        <div>
            <h2 className='font-pops font-semibold text-[18px] text-[#00]'>{item.receiverid == data.uid ?
            item.sendername : item.receivername}</h2>
            <h3 className='font-pops font-medium text-[14px] text-[#4D4D4D]'>Hi Guys, Wassup!</h3>
        </div>
        <div>
        <button onClick={()=>handleBlock(item)} className='font-pops font-semibold text-[20px] text-[#FFF] bg-primary px-[22px] rounded-lg'>
        Block
        </button>
        </div>
        </div>
        </div>
                ))
            }
        

        </div>
    </div>
    </div>
    </div>
  )
}

export default Friends
