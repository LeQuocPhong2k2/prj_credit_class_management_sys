import React from 'react'
import logo from '../assets/logo.png'
import avatar from '../assets/avata-sv.jpg'
import { useEffect, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { apiInforSv } from '../api/Home'
import { findAccountByID } from '../api/Login'

const Header = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const resAccount = await findAccountByID(localStorage.getItem('account_id'))
      if (resAccount.status === 200) {
        if (resAccount.data.account.accountType === 'student') {
          const res = await apiInforSv(localStorage.getItem('account_id'))
          setUser(res.data.student[0])
        } else {
          const admin = {
            userName: resAccount.data.account.userCode
          }
          setUser(admin)
        }
      }
    }
    fetchData()
  }, [])

  return (
    <header>
      <div className='grid grid-cols-4 items-center h-16 shadow shadow-gray-500 rounded-md pl-8'>
        <div className='col-span-2 grid grid-cols-3 items-center pl-8 pr-20'>
          <div className='flex justify-center items-center'>
            <img className='h-12 w-24' src={logo} alt='cloud' />
          </div>
          <div className='col-span-2 flex justify-start items-center border-1px rounded-full'>
            <input
              className='border-0 ml-4 mr-4 focus:outline-none focus:ring-0 w-full'
              type='text'
              placeholder='Tìm kiếm...'
            />
          </div>
        </div>
        <div className='col-span-2 grid grid-flow-col justify-end pr-40 items-center text-slate-600'>
          <div>
            <img className='h-10 w-10 rounded-full' src={avatar} alt='cloud' />
          </div>
          <span>{user && user.userName}</span>
        </div>
      </div>
    </header>
  )
}

export default Header
