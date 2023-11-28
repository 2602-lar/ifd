import React, { useState, useContext } from 'react'
import { TxtInput } from './Utils'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import AuthContext from './AuthContext'
import Signup from './Signup'

export const Login = () => {
  let { loginUser } = useContext(AuthContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [display, setDisplay] = useState(false)
  let Navigate = useNavigate()

  const Login = async () => {
    if (username === '' || password === '') {
      toast.warning('Please provide all the login details !')
    } else {
      const feedback = toast.loading("Authenticating User")
      let response = await loginUser(username, password)
      console.log(response.code)
      if (response.status === 200) {
        toast.update(feedback, { render: "User authentication succcessful !", type: "success", isLoading: false, autoClose: 4000 })
      } else if (response.code === 'ERR_BAD_REQUEST') {
        if (response.response.data.detail === 'No active account found with the given credentials') {
          toast.update(feedback, { render: "User authentication failed ! Incorrect details.", type: "error", isLoading: false, autoClose: 7000 })
        }
      } else {
        toast.update(feedback, { render: "Internal server error! Check server", type: "error", isLoading: false, autoClose: 7000 })
      }
    }
  }
  return (
    <div className=' flex w-screen h-screen'>

      <Signup
        setDisplay={setDisplay}
        display={display}
      />

      <div className='w-1/2 h-full'>
        <img className='object-cover w-full h-full' src={'login_pic.jpg'} alt='' />
      </div>

      <div className='flex flex-col justify-center w-1/2 h-screen py-20 px-32'>
        <div className='bg-[#5a62f7] w-full h-full px-12 pt-12 rounded-xl'>
          <p className='text-[#fe6f62] text-2xl font-extrabold text-center w-full'>Enter Your Credentials </p>
          <div className='w-ful'>
            <TxtInput
              label={'Username'}
              type={'text'}
              value={username}
              setvalue={setUsername}
            />

            <TxtInput
              label={'Password'}
              type={'password'}
              value={password}
              setvalue={setPassword}
            />
          </div>
          <div className='w-full px-10 pt-6'>
            <button className='w-full h-8 text-center bg-[#fe6f62] hover:underline text-white rounded-md' onClick={() => { Login() }}>
              Login
            </button>
          </div>

          <div className='w-full text-white text-center pt-6'>
            <p className='text-lg font-bold hover:underline cursor-pointer' onClick={() => { setDisplay(true) }}>
              Sign up
            </p>
            <p className='text-lg font-bold hover:underline cursor-pointer' onClick={() => { Navigate('/') }}>
              Back
            </p>
            <p className='text-lg font-bold hover:underline cursor-pointer' onClick={() => { }}>
              Forgot password ?
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}
