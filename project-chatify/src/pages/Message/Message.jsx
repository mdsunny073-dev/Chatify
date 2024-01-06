import React from 'react'
import GroupList from '../../components/GroupList/GroupList'
import FriendRequest from '../../components/FriendRequest/FriendRequest'
import Friends from '../../components/Friends/Friends'
import MyGroups from '../../components/MyGroups/MyGroups'
import Sidebar from '../../components/Sidebar/Sidebar'

const Message = () => {
  return (
    <div>
      <div className="flex">
        <div className="w-[186px]">
          <Sidebar/>
          </div>
          
        <div className="w-[450px] ml-[100px]">
        <GroupList/>
        <Friends/>

        </div><div className="w-[450px] ml-[100px]">
          <h2>sds</h2>
        </div>
      </div>
    </div>
  )
}

export default Message
