import React, { useState } from 'react'
import login from '../../assets/Login.png'
import {RiEye2Line, RiEyeCloseFill} from 'react-icons/ri'
import google from '../../assets/google.png'
import { Link } from 'react-router-dom';

const Login = () => {
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');

    const[emailerror, setEmailerror] = useState('');
    const[passworderror, setPassworderror] = useState('');
    const[showPassword, setShowPassword] = useState('');

    const handleEmail = (e) =>{
        setEmail(e.target.value);
        setEmailerror('')
    }
    const handlePassword = (e) =>{
        setPassword(e.target.value);
        setPassworderror('')
    }

    const handleClick = () =>{
        if(!email){
            setEmailerror('Email is required');
        }else{
            if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
                setEmailerror('Invalid email address')
            }
        }


        if(!password){
            setPassworderror('Password is required');
        }else if(!/(?=.*[a-z])/.test(password)){
            setPassworderror('The string must contain at least 1 lowercase alphabetical character')
        }else if(!/(?=.*[A-Z])/.test(password)){
            setPassworderror('The string must contain at least 1 uppercase alphabetical character')
        }else if(!/(?=.*[0-9])/.test(password)){
            setPassworderror('The string must contain at least 1 numeric character')
        }else if(!/(?=.*[!@#$%^&*])/.test(password)){
            setPassworderror('The string must contain at least one special character(For example: !@#$%^&*)')
        }else if(!/(?=.{8,})/.test(password)){
            setPassworderror('The string must be eight characters or longer')
        }
    }

  return (
    <div className='flex'>
        <div className='w-1/2 flex justify-end'>
            <div className='mr-[69px] mt-[225px]'>
                <h1 className='text-[#11175D] font-nunito text-[34.401px] font-bold'>Login to your account!</h1>
                <div className='mt-[30px] relative'>
                    <input type="text" className='w-[220px] py-[20px] pr-[42px] pl-[30px] border-[0.834px] border-[#03014C] rounded-lg '/>
                    <p className='absolute top-[24px] font-sans font-semibold text-[13.338px] text-[#03014C] tracking-[0.267px] ml-[60px]'>Login with Google</p>
                    <img className='mt-[-42px] ml-[28px]' src={google} alt="" />
                </div>
                <div className='mt-[62px] relative w-96'>
                    <input type="email" onChange={handleEmail} className='w-full py-[20px] px-[10px] border-b-2 border-[#11175D] outline-none'/>
                    <p className='absolute top-[-10px] left-[5px] font-nunito font-semibold text-[13.76px] text-[#11175D] tracking-[1.032px] px-0 bg-white'>Email Address</p>
                    {
                        emailerror &&
                        <p className='font-nunito font-semibold bg-[#FF0000] text-white px-[10px] py-[2px] mt-[2px] rounded'>{emailerror}</p>
                    }
                </div>
                <div className='mt-[47px] relative w-96'>
                    <input type={showPassword ? 'text' : 'password'} onChange={handlePassword} className='w-full py-[20px] px-[10px] border-b-2 border-[#11175D] outline-none'/>
                    <p className='absolute top-[-10px] left-[5px] font-nunito font-semibold text-[13.76px] text-[#11175D] tracking-[1.032px] px-0 bg-white'>Password</p>
                    {
                        showPassword ?
                        <RiEye2Line onClick={()=>setShowPassword(!showPassword)} className='absolute top-[28px] right-[20px]'/> : <RiEyeCloseFill onClick={()=>setShowPassword(!showPassword)} className='absolute top-[28px] right-[20px]'/>
                    }
                    {
                        passworderror &&
                        <p className='font-nunito font-semibold bg-[#FF0000] text-white px-[10px] py-[2px] mt-[2px] rounded'>{passworderror}</p>
                    }
                </div>
                <div className='mt-[51px] w-96'>
                <div onClick={handleClick} className='bg-primary cursor-pointer text-center py-[20px] rounded-lg'>
                    <p className='font-nunito font-semibold text-[20px] text-white'>Login to Continue</p>
                </div>
                </div>
                <div className='text-[#03014C] font-sans text-[13.338px] mt-[35px] ml-[75px]'>
                <h1>Don’t have an account ? <span className='text-[#EA6C00] font-bold'><Link to='/registration'>Sign Up</Link></span></h1>
            </div>
            </div>
        </div>
        <div className='w-1/2 absolute top-0 right-0'>
            <img className='w-full h-screen object-cover' src={login} alt="login" />
        </div>
    </div>
  )
}

export default Login