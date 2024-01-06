import React, { createRef, useState } from 'react'
import { AiOutlineHome, AiOutlineMessage } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FiSettings } from "react-icons/fi";
import { IoLogOut } from "react-icons/io5";
import { getAuth, signOut, updateProfile } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import { IoIosCloudUpload } from "react-icons/io";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";
import { useSelector } from 'react-redux';




const Sidebar = () => {
  const data = useSelector(state=>state.userLoginInfo.userInfo);
  const auth = getAuth();
  const navigate = useNavigate ()
  const [imagePop, setImagePop] = useState(false)
  const [image, setImage] = useState();
  const [cropData, setCropData] = useState("");
  
  const cropperRef = createRef();
  const storage = getStorage();

  const handleSignOut = () =>{
    signOut(auth).then(() => {
      setTimeout(()=>{
        navigate ('/login')
      },2000)
    }).catch((error) => {
    });}
     
    const handleImageUpload = () =>{
      setImagePop(true)
    }

    const handleCancelImgUpload = () =>{
      setImagePop(false)
    }

    const handleImgChange = (e) => {
      e.preventDefault();
      let files;
      if (e.dataTransfer) {
        files = e.dataTransfer.files;
      } else if (e.target) {
        files = e.target.files;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(files[0]);
    };

    const getCropData = () => {
      if (typeof cropperRef.current?.cropper !== "undefined") {
        setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());

        const storageRef = ref(storage, auth.currentUser.uid);

        const message4 = cropperRef.current?.cropper.getCroppedCanvas().toDataURL();
        uploadString(storageRef, message4, 'data_url').then((snapshot) => {
          console.log('Uploaded a data_url string!');
          getDownloadURL(storageRef).then((downloadURL) => {
            console.log('File available at', downloadURL);
            updateProfile(auth.currentUser, {
              photoURL: downloadURL
              }).then(()=>{
                setImagePop(false)
                setImage('')
                setCropData('')
              })
          });
        });
      }
    };

  return (
    <div className='bg-primary h-screen rounded pt-[38px]'>
      <div className='group relative w-[100px] h-[100px] mx-auto overflow-hidden'>
      <img src={data.photoURL} alt="pfp" className='mx-auto w-full h-full rounded-full'/>
      <div onClick={handleImageUpload} className='absolute bg-overlay opacity-0 group-hover:opacity-100 ease-in duration-300 cursor-pointer rounded-full w-full h-full mx-auto top-0 left-0 flex justify-center items-center'>
      <IoIosCloudUpload className='text-white w-[20px] h-[20px]'/>
      </div>
      </div>
      <h1 className='text-white font-nunito text-[25px] font-bold text-center mt-['>{data.displayName}</h1>
        <div className='mt-[78px] relative py-[20px] after:absolute after:content-[""] after:w-full after:h-full after:top-0 after:left-[25px] after:bg-white after:z-[-1] z-[1] overflow-hidden after:rounded-l-lg before:absolute before:content-[""] before:w-[8px] before:h-full before:top-0 before:right-0 before:bg-primary before:rounded-l-lg'>
        <Link to='/Home'>
        <AiOutlineHome className='mx-auto w-[50px] h-[50px] text-primary'/>
        </Link>
        </div>

        <div className='mt-[78px] '>
        <Link to='/Message'>
        <AiOutlineMessage className='mx-auto w-[50px] h-[50px] text-[#BAD1FF]'/>
        </Link>
        </div>
        
        <div className='mt-[78px] '>
        <IoMdNotificationsOutline className='mx-auto w-[50px] h-[50px] text-[#BAD1FF]'/>
        </div>

        <div className='mt-[78px] '>
        <FiSettings className='mx-auto w-[50px] h-[50px] text-[#BAD1FF]'/>
        </div>

        <div className='mt-[140px] '>
        <IoLogOut onClick={handleSignOut} className='mx-auto w-[50px] h-[50px] text-[#BAD1FF]'/>
        </div>
        
        {
          imagePop && 
          <div className='h-screen w-full bg-white absolute top-0 left-0 z-[1] flex justify-center items-center'>
          <div className='bg-[#00FE93] w-[700px] p-[60px] rounded-lg'>
          <h1 className='text-[#FF0202] font-nunito text-[34.401px] font-bold ml-[140px]'>Upload Your Image</h1>

          
          {
            image ?

            <div className='w-[100px] h-[100px] rounded-full mx-auto mb-[20px] overflow-hidden'>
          <div className='img-preview w-[100px] h-[100px] rounded-full'></div>
          </div>
          :
          <div className='w-[100px] h-[100px] rounded-full mx-auto mb-[20px] overflow-hidden'>
          <img src={data.photoURL} alt="" />
          </div>
           }

          {
            image &&
          <Cropper className=''
          ref={cropperRef}
          style={{ height: 400, width: "100%" }}
          zoomTo={0.5}
          initialAspectRatio={1}
          preview=".img-preview"
          src={image}
          viewMode={1}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false}
          guides={true}
        />
          }
          <input type="file" className='ml-[140px] mt-[20px] text-[20px]' onChange={handleImgChange}/>
          <div className='mt-[20px] ml-[140px]'>
            <button onClick={getCropData} className='bg-white text-[#FF0202] py-[15px] px-[25px] text-[20px] rounded-lg'>
              Upload
            </button>
            <button onClick={handleCancelImgUpload} className='bg-[#F73B00] text-white py-[15px] px-[25px] text-[20px] rounded-lg ml-[20px]'>
              Cancel
            </button>
          </div>
          </div>
        </div>
        }

       
    </div>
  )
}

export default Sidebar
