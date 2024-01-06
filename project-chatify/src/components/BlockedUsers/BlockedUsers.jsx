import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import GpfpOne from '../../assets/EllipseTwo.png'
import { IoIosSearch } from "react-icons/io";
import { getDatabase, ref, onValue, push, set, remove } from "firebase/database";
import { useSelector } from "react-redux";


const BlockedUsers = () => {
  const data = useSelector(state => state.userLoginInfo.userInfo);
  const db = getDatabase();
 
  const [blockList, setBlockList] = useState([]);
  useEffect(()=>{
    const blockRef = ref(db, "block/");
    onValue(blockRef, (snapshot) => {
        let array = []
      snapshot.forEach((item) => {
        if(item.val().blockbyid == data.uid){
          array.push({
            id: item.key,
            block: item.val().block,
            blockid: item.val().blockid
          })
        }else if(item.val().blockid == data.uid){
          array.push({
            id: item.key,
            blockby: item.val().blockby,
            blockbyid: item.val().blockbyid
          })
        }
      })
      setBlockList(array)
    });
  },[])

  const handleUnblock = (item) =>{
    console.log(item);

    set(push(ref(db, 'frnd/')),{
      sendername: item.block,
      senderid: item.blockid,
      receivername: data.displayName,
      receiverid: data.uid
    }).then(()=>{
      remove(ref(db, 'block/' + item.id));
    })
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
            <h2 className='font-pops font-semibold text-[20px] text-[#00]'>Blocked Users</h2>
            <BsThreeDotsVertical className='text-[#5F35F5]'/>
        </div>
        

          {
            blockList.map((item)=>(
              <div className='mt-[17px]'>
        <div className='flex items-center border-b-2 pb-[13px]'>
        <img src={GpfpOne} alt="GpfpOne" />
        <div className='ml-[80px]'>
            <h2 className='font-pops font-semibold text-[18px] text-[#00]'>{item.block}</h2>
            <h2 className='font-pops font-semibold text-[18px] text-[#00]'>{item.blockby}</h2>
            <h3 className='font-pops font-medium text-[14px] text-[#4D4D4D]'>Hi Guys, Wassup!</h3>
        </div>
        {
          !item.blockby &&
          <button onClick={()=>handleUnblock(item)} className='font-pops font-semibold text-[20px] text-[#FFF] bg-primary px-[22px] rounded-lg'>
        Unblock
        </button>
        }
        </div>
        </div>
            ))
          }
        

        
    </div>
    </div>
    </div>
  )
}

export default BlockedUsers
