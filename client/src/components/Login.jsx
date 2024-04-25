import React from 'react'
import { useState, useEffect } from 'react'
import logo from '../assets/logo.png'
import apiLogin from '../api/Login'
export default function Login() {
  const [userCode, setUserCode] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    document.title = 'Đăng nhập'
  }, [])

  const handleLogin = async () => {
    if (!userCode || !password) {
      alert('Vui lòng nhập đầy đủ thông tin')
      return
    }
    try {
      const res = await apiLogin(userCode, password)
      if (res.status === 200) {
        localStorage.setItem('account_id', res.data.account_id)
        window.location.href = '/'
      }
    } catch (error) {
      console.error(error)
      alert('Đăng nhập thất bại')
    }
  }

  return (
    <div class='flex justify-center h-screen bg-white'>
      <dir class='border border-sky-500 w-fit h-fit mt-20 p-10 rounded-lg shadow-lg shadow-indigo-500/40'>
        <form action=''>
          <div className='pb-10'>
            <img src={logo} alt='cloud' />
          </div>

          <div className='grid grid-cols-2 bg-red-800'>
            <div className='flex justify-center text-base items-center bg-slate-500'>
              <label htmlFor=''>MSSV:</label>
            </div>
            <div>
              <input onChange={(e) => setUserCode(e.target.value)} name='studentCode' type='text' />
            </div>
          </div>
          <div className='grid grid-cols-2 mt-2 bg-red-800'>
            <div className='flex justify-center text-base items-center bg-slate-500'>
              <label htmlFor=''>Mật khẩu:</label>
            </div>
            <div>
              <input onChange={(e) => setPassword(e.target.value)} name='password' type='password' />
            </div>
          </div>
          <div className='grid grid-cols-1 mt-2 bg-blue-600 text-white font-bold p-2 cursor-pointer'>
            <input onClick={handleLogin} className='cursor-pointer' type='button' value={'Đăng nhập'} />
          </div>
        </form>
      </dir>
    </div>
  )
}
