import React from 'react'
import { useState, useEffect, useRef } from 'react'
import logo from '../assets/logo.png'
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

    const res = await fetch('http://localhost:3003/account/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userCode,
        password
      })
    }).then((res) => {
      if (res.status === 400) {
        alert('Sai tài khoản hoặc mật khẩu')
      }
    })
    // console.log(userCode, password)
    // const data = await res.json()
    // console.log(data)
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
