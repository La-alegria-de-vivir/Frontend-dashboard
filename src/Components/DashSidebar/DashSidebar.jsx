import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HiAnnotation, HiArrowSmRight, HiChartPie, HiDocumentText, HiOutlineUserGroup, HiUser } from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom';
import { signoutSuccess } from '../Redux/User/userSlice.js';

export default function DashSidebar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.user);
  const [tab, setTab] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const tabFormUrl = urlParams.get('tab')
    if (tabFormUrl) {
      setTab(tabFormUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='bg-gray-100 h-screen w-full md:w-56 flex flex-col justify-between mt-24'>
      <div className='flex flex-col gap-1'>
        {currentUser && currentUser.isAdmin && (
          <Link to='/dashboard?tab=dash'>
            <div className={`p-4 rounded ${tab === 'dash' || !tab ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}>
              <HiChartPie className='inline-block mr-2' />
              Dashboard
            </div>
          </Link>
        )}
        <Link to='/dashboard?tab=profile'>
          <div className={`p-4 rounded ${tab === 'profile' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}>
            <HiUser className='inline-block mr-2' />
            {currentUser.isAdmin ? 'Admin' : 'User'} Profile
          </div>
        </Link>
        {currentUser.isAdmin && (
          <Link to='/dashboard?tab=post'>
            <div className={`p-4 rounded ${tab === 'post' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}>
              <HiDocumentText className='inline-block mr-2' />
              Posts
            </div>
          </Link>
        )}
        {currentUser.isAdmin && (
          <>
            <Link to='/dashboard?tab=users'>
              <div className={`p-4 rounded ${tab === 'users' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}>
                <HiOutlineUserGroup className='inline-block mr-2' />
                Users
              </div>
            </Link>
            <Link to='/dashboard?tab=comments'>
              <div className={`p-4 rounded ${tab === 'comments' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}>
                <HiAnnotation className='inline-block mr-2' />
                Comments
              </div>
            </Link>
          </>
        )}
      </div>
      <div className='p-4 rounded hover:bg-gray-200 cursor-pointer' onClick={handleSignout}>
        <HiArrowSmRight className='inline-block mr-2' />
        Sign Out
      </div>
    </div>
  )
}

