import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import GpfpOne from "../../assets/EllipseTwo.png";
import { IoIosSearch } from "react-icons/io";
import { getDatabase, ref, onValue, push, set } from "firebase/database";
import { useSelector } from "react-redux";

const UserList = () => {
  const data = useSelector(state => state.userLoginInfo.userInfo);
  const db = getDatabase();

  const [userList, setUserList] = useState([]);
  const [frndReqList, setFrndReqList] = useState([]);
  const [frndList, setFrndList] = useState([]);
  const [blockList, setBlockList] = useState([]);
  const [searchData, setSearchData ]= useState('');

  useEffect(() => {
    const userRef = ref(db, "users/");
    onValue(userRef, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        if (data.uid != item.key) {
          array.push({ ...item.val(), userid: item.key });
        }
      });
      setUserList(array);
    });
  }, []);

  const handleFrndReq = (item) => {
    set(push(ref(db, "frndReq/")), {
      receivername: item.username,
      receiverid: item.userid,
      sendername: data.displayName,
      senderid: data.uid,
    });
  };

  useEffect(() => {
    const frndReqRef = ref(db, "frndReq/");
    onValue(frndReqRef, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        array.push(item.val().receiverid + item.val().senderid);
      });
      setFrndReqList(array);
    });
  }, []);

  useEffect(() => {
    const frndRef = ref(db, "frnd/");
    onValue(frndRef, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        array.push(item.val().receiverid + item.val().senderid);
      });
      setFrndList(array);
    });
  }, []);

  const handleSearch = (e) =>{
    let array = []
    console.log(e.target.value);
    if(e.target.value.length == 0){
      setSearchData([])
    }else{
      userList.filter((item)=>{
        if(item.username.toLowerCase().includes(e.target.value.toLowerCase())){
          array.push(item)
          setSearchData(array)
        };
      })
    }
  }
  useEffect(() => {
    const blockRef = ref(db, "block/");
    onValue(blockRef, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        array.push(item.val().blockbyid + item.val().blockid);
      });
      setBlockList(array);
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
  <input onChange={handleSearch} class="placeholder:italic placeholder:text-[20px] placeholder:text-slate-400 block bg-white w-[427px] border border-slate-300 rounded-md py-[15px] pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Search for anything..." type="text" name="search"/>
</label>
</div>
        <div className="shadow px-[22px] h-[347px] mt-[30px] rounded-[20px] overflow-y-scroll">
          <div className="flex justify-between">
            <h2 className="font-pops font-semibold text-[20px] text-[#00]">
              User List
            </h2>
            <BsThreeDotsVertical className="text-[#5F35F5]" />
          </div>
          <div>


            {
              searchData.length > 0 ?

              searchData.map((item) => (
              <div className="mt-[17px]">
              <div className="flex justify-between items-center border-b-2 pb-[13px]">
                <img src={GpfpOne} alt="GpfpOne" />
                <div>
                  <h2 className="font-pops font-semibold text-[18px] text-[#00]">
                    {item.username}
                  </h2>
                  <h3 className="font-pops font-medium text-[14px] text-[#4D4D4D]">
                    {item.email}
                  </h3>
                </div>
                {
                  blockList.includes(item.userid + data.uid) ||
                  blockList.includes(data.uid + item.userid)
                  ?
                  <button
                        className="font-pops font-semibold text-[20px] text-[#FFF] bg-primary px-[22px] rounded-lg"
                      >
                        Blocked
                      </button>
                      :
                    frndList.includes(item.userid + data.uid) ||
                    frndList.includes(data.uid + item.userid) 
                    ?
                    <div>
                    <button
                      className="font-pops font-semibold text-[20px] text-[#FFF] bg-primary px-[22px] rounded-lg"
                    >
                      Friends
                    </button>
                  </div>
                  :
                  frndReqList.includes(item.userid + data.uid) ||
                  frndReqList.includes(data.uid + item.userid) 
                  ? (
                    <div>
                      <button
                        className="font-pops font-semibold text-[20px] text-[#FFF] bg-primary px-[22px] rounded-lg"
                      >
                        Pending
                      </button>
                    </div>
                  ) : (
                    <div>
                      <button
                        onClick={() => handleFrndReq(item)}
                        className="font-pops font-semibold text-[20px] text-[#FFF] bg-primary px-[22px] rounded-lg"
                      >
                        +
                      </button>
                    </div>
                  )
                }

              </div>
              </div>
            ))
            :
            userList.map((item) => (
              <div className="mt-[17px]">
              <div className="flex justify-between items-center border-b-2 pb-[13px]">
                <img src={GpfpOne} alt="GpfpOne" />
                <div>
                  <h2 className="font-pops font-semibold text-[18px] text-[#00]">
                    {item.username}
                  </h2>
                  <h3 className="font-pops font-medium text-[14px] text-[#4D4D4D]">
                    {item.email}
                  </h3>
                </div>
                {
                  blockList.includes(item.userid + data.uid) ||
                  blockList.includes(data.uid + item.userid)
                  ?
                  <button
                        className="font-pops font-semibold text-[20px] text-[#FFF] bg-primary px-[22px] rounded-lg"
                      >
                        Blocked
                      </button>
                      :
                    frndList.includes(item.userid + data.uid) ||
                    frndList.includes(data.uid + item.userid)
                    ?
                    <div>
                    <button
                      className="font-pops font-semibold text-[20px] text-[#FFF] bg-primary px-[22px] rounded-lg"
                    >
                      Friends
                    </button>
                  </div>
                  :
                  frndReqList.includes(item.userid + data.uid) ||
                  frndReqList.includes(data.uid + item.userid) ? (
                    <div>
                      <button
                        className="font-pops font-semibold text-[20px] text-[#FFF] bg-primary px-[22px] rounded-lg"
                      >
                        Pending
                      </button>
                    </div>
                  ) : (
                    <div>
                      <button
                        onClick={() => handleFrndReq(item)}
                        className="font-pops font-semibold text-[20px] text-[#FFF] bg-primary px-[22px] rounded-lg"
                      >
                        +
                      </button>
                    </div>
                  )
                }

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

export default UserList;
