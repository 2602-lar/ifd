import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { TxtInput } from './Utils'
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { DataSubmission } from './DataSubmission'

const Signup = ({ setDisplay, display }) => {
    const [UserName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const Signup = async () => {
        if (UserName === '' || password === '') {
            toast.warning('Please Provide all information')
        } else if (password !== confirmPassword) {
            toast.warning('Password and confirmation do not match !')
        } else {
            const checking = toast.loading('Proccessing...')
            const UserData = { username: UserName, password: password, is_active : true, is_superuser : true, is_staff : true }
            const signup = await DataSubmission('POST', 'user/add-user/', UserData)
            if (signup[1].resText === 'Successfull') {
                toast.update(checking, { render: "user created succesfully ", type: "success", isLoading: false, autoClose: 7000 })
            } else {
                toast.update(checking, { render: "Error !", type: "error", isLoading: false, autoClose: 7000 })
            }
        }
    }


    return (
        <div className={display ?
            'fixed place-items-center z-10 w-screen h-screen md:pt-8 overflow-hidden bg-black/80 top-0 left-0 backdrop-blur-xl'
            :
            'hidden'}>
            <div className='bg-[#5a62f7] rounded-md w-full h-full md:w-1/3 md:h-[90%] m-auto'>
                <div className=' flex sticky pt-4 top-0 right-0 bg-[#5a62f7]/60 backdrop-blur-sm h-[10%] w-full rounded-lg pr-2'>
                    <p className='text-[#fe6f62] text-lg font-bold pl-4 '>
                        Signup
                    </p>
                    <AiOutlineClose className='text-white bg-red-600 rounded-sm text-2xl hover:bg-red-700 cursor-pointer ml-auto' onClick={() => { setDisplay(!display) }} />
                </div>
                <div className='h-full w-full p-4 pt-10'>
                    <TxtInput
                        label={'Username'}
                        value={UserName}
                        setvalue={setUserName}
                        placeholder={'username'}
                        type={'text'}
                    />

                    <TxtInput
                        label={'Password'}
                        value={password}
                        setvalue={setPassword}
                        type={'password'}
                    />

                    <TxtInput
                        label={'Confirm Password'}
                        value={confirmPassword}
                        setvalue={setConfirmPassword}
                        type={'password'}
                    />
                    <div className='py-4'>
                        <button className='w-full h-12 bg-gray-300 hover:bg-gray-100 rounded-lg text-lg font-bold'
                            onClick={() => { Signup() }}>
                            Submit
                        </button>
                    </div>
                    <div className='w-full text-center text-white text-lg font-semibold p-2'>
                        <p onClick={() => { setDisplay(!display) }} className='cursor-pointer hover:text-gray-200'>Exit</p>
                    </div>
                </div>

            </div>
            <ToastContainer />

        </div>
    )
}

export default Signup