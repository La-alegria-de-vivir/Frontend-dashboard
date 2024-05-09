import {  Alert, Button, Label,TextInput } from 'flowbite-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInStart, signInSuccess, signInFailure } from '../../Components/Redux/User/userSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import OAuth from '../../Components/Oauth/OAuth.jsx';
import logo from '../../../public/images/logo.png'

export default function Home() {

  const [formData, setFormData]= useState({});
  const {error: errorMessage} = useSelector(state => state.user);  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e)=>{
    console.log(e.target.value);
    setFormData({...formData, [e.target.id]: e.target.value.trim() });
  };
const handleSubmit = async (e) =>{
  e.preventDefault();
  if( !formData.email || !formData.password){
    return dispatch(signInFailure('Please fill all the fields'));
  }
  try {
    dispatch(signInStart());
    const res = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'}, // Corregido "appliction" a "application"
      body: JSON.stringify(formData),
    });
    
    const data = await res.json();
    if (data.success === false) {
     dispatch(signInFailure(data.message));
    }

    if (res.ok) {
      dispatch(signInSuccess(data));
      navigate('/dashboard');
    }

  } catch (error) {
   dispatch(signInFailure(error.message));
  }
}
  return (

      <div className='min-h-screen mt-40'>
        <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
          {/* left */}
          <div className="flex-1">
            <Link to="/" className='font-bold dark:text-white text-4xl'>
              <img
                src={logo}
                width={250}
                height={250}
                className="rounded-full"
                alt="Logo"
              />
            </Link>
            <p className='text-sm mt-5'>
              This is a demo project. You can sign in with your email and password or with Google.
            </p>
          </div>
          {/* right */}
          <div className="flex-1">
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
              <div>
                <Label value='Your email'/>
                <TextInput 
                  type='email'
                  placeholder='name@company.com'
                  id='email' 
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label value='Your password'/>
                <TextInput 
                  type='password'
                  placeholder='********'
                  id='password' 
                  onChange={handleChange}
                />
              </div>
              <Button 
                className='bg-gradient-to-r from-[#AEAF50] to-[#F3C14C] hover:from-[#adaf50bd] hover:to-[#F3C14C] text-white font-bold justify-center rounded transition-colors duration-300 h-8' 
                type='submit' 
              >
                Sign In
              </Button>
              <OAuth/>
            </form>
            <div className="flex flex-col items-center mt-5">
              <div className="flex gap-3 text-sm">
                <span>Don't have an account?</span>
                <Link to='/signup' className='text-blue-500'>
                  Sign Up
                </Link>
              </div>
              {errorMessage && (
                <Alert color='failure' className='mt-5'>
                {errorMessage}

                </Alert>
              )}
            </div>
          </div>
        </div>
      </div>
    );
    
}