import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import GpfpOne from "../../assets/EllipseTwo.png";
import { IoIosSearch } from "react-icons/io";
import { getDatabase, ref, onValue, push, set, remove } from "firebase/database";
import { useSelector } from "react-redux";

const FriendRequest = () => {
  const data = useSelector(state => state.userLoginInfo.userInfo);
  const db = getDatabase();

  const [frndReqList, setFrndReqList] = useState([]);

  useEffect(()=>{
    const frndReqRef = ref(db, "frndReq/");
    onValue(frndReqRef, (snapshot) => {
        let array = []
      snapshot.forEach((item) => {
        if(item.val().receiverid == data.uid){
            array.push({...item.val(), id:item.key})
        }
      })
      setFrndReqList(array)
    });
  },[])

  const handleFrnds = (item) =>{
    set(push(ref(db, "frnd/")), {
       ...item
      }).then(()=>{
        remove((ref(db, "frndReq/" + item.id)))
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
        <div className="shadow px-[22px] h-[347px] mt-[30px] rounded-[20px] overflow-y-scroll">
          <div className="flex justify-between">
            <h2 className="font-pops font-semibold text-[20px] text-[#00]">
              Friend Request
            </h2>
            <BsThreeDotsVertical className="text-[#5F35F5]" />
          </div>
          <div className="mt-[17px]">
            {
              frndReqList.length == 0 ?
              <h2 className="font-pops font-semibold text-[15px] text-[#00]">No Data</h2>
              :
                frndReqList.map((item) =>(
                    <div className="flex justify-between items-center border-b-2 pb-[13px]">
              <img src={GpfpOne} alt="GpfpOne" />
              <div>
                <h2 className="font-pops font-semibold text-[18px] text-[#00]">
                  {item.sendername}
                </h2>
                <h3 className="font-pops font-medium text-[14px] text-[#4D4D4D]">
                  Hi Guys, Wassup!
                </h3>
              </div>
              <div>
                <button onClick={()=>handleFrnds(item)} className="font-pops font-semibold text-[20px] text-[#FFF] bg-primary px-[22px] rounded-lg">
                  Accept
                </button>
              </div>
            </div>
                ))
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendRequest;
