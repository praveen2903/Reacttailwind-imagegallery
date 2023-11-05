import React from "react";
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg'
import {MdAddCircleOutline} from 'react-icons/md'
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import photo from '../assets/iron.jpeg'
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {AiOutlineHome} from 'react-icons/ai'

 
function NavbarDefault() {
  const [theme,setTheme]=useState(localStorage.getItem("theme")? localStorage.getItem("theme"):"light");
  const {currentUser} = useContext(AuthContext)
    const handleToggle=(e)=>{
        if(e.target.checked){
            setTheme("black");
        }
        else{
            setTheme("light");
        }
    }

    useEffect(()=>{
        localStorage.setItem("theme",theme)
        const localTheme=localStorage.getItem("theme");

        document.querySelector("html").setAttribute("data-theme",localTheme);
    },[theme])
 
  return(
    <div className="m-2 md:m-5">
      <div className="navbar bg-blue-500 rounded-lg">
        <div className="flex-1">
          <img src={logo} className='h-[60px] w-[60px] md:h-[80px] md:w-[80px] p-3 rounded' alt='logo'/>
          <Link to="/home" className="text-xl font-bold text-white cursor-pointer hidden sm:block">Gallery</Link>
        </div>
        <div className="flex-none gap-2 md:gap-6 md:pr-6">
          <div className="form-control">
              <Link to="/home" className="text-3xl float-left my-4 text-white hover:underline">
                  <AiOutlineHome/>
              </Link>
            </div>
          <div className="form-control">
              <Link to="/addedphotos" className='items-center font-bold text-white cursor-pointer'>
                  Added
              </Link>
          </div>
          <div className="form-control">
            <Link to="/upload" className='items-center'>
                <MdAddCircleOutline size={40} color='orange'/>
            </Link>
          </div>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={currentUser?.photoURL || photo} alt='userphoto' />
              </div>
            </label>
            <ul tabIndex={0} className="mt-2 gap-3 z-[1] p-4 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-60">
              <li><Link to='/about'>View Profile</Link></li>
              <li>
                <p className="justify-between">
                  {currentUser?.displayName || "User"}
                  <span className="badge">User</span>
                </p>
              </li>
              <li><p>{currentUser?.email||currentUser?.phoneNumber}</p></li>
              <li><Link to="/" onClick={()=>signOut(auth)}>Logout</Link></li>
            </ul>
          </div>
          <div className="form-control text-white">
            <label className="swap swap-rotate">
                  <input type="checkbox" onChange={handleToggle} checked={theme==="light"? false: true}/>
                  <svg className="swap-on fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
                  <svg className="swap-off fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}
export default NavbarDefault;





