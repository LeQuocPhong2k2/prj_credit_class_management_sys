import React from 'react'
import { useState, useEffect, useRef } from 'react'
import logo from '../assets/logo.png'
import axios from 'axios'
import { toast, Toaster } from 'react-hot-toast'
import 'react-toastify/dist/ReactToastify.css'
export default function Login() {
  const [studentCode, setStudentCode] = useState('')
  const [password, setPassword] = useState('')

  const handleStudentLogin = async (e) => {
    e.preventDefault()

    // kiểm tra rỗng
    if (studentCode === '' || password === '') {
      toast.error('Vui lòng nhập đầy đủ thông tin!!!')
      // Đặt biến errorShown thành true để chỉ hiển thị một lần

      return
    }
    const accountType = 'student'

    axios
      .post('http://localhost:3003/account/login', {
        userCode: studentCode,
        password: password,
        accountType: accountType
      })
      .then((response) => {
        console.log(response)
        if (response.data.message === 'Không tìm thấy tài khoản') {
          toast.error('Sinh Viên không tồn tại!!!')
        } else if (response.data.message === 'Password or AccountType not match') {
          toast.error('Mật khẩu không đúng hoặc loại tài khoản không đúng!!!')
        } else if (response.data.message === 'Login successfully!!!') {
          // localStorage.setItem('account_id', response.data.account_id)
          // window.location.href = 'http://localhost:3000/dashboard'
          axios
            .post('http://localhost:3003/student/findStudentByAccountID', {
              account_id: response.data.account_id
            })
            .then((response) => {
              toast.success('Login successfully!!!')
              localStorage.setItem('student_id', JSON.stringify(response.data.student_id))
              // window.location.href = 'http://localhost:3000/dashboardwait'
              toast.success('Login successfully!!!')
              alert('Login successfully!!!')
            })
        }
      })
  }

  return (
    <div class='flex justify-center h-screen bg-white'>
      <Toaster toastOptions={{ duration: 2200 }} />
      <dir class='border border-sky-500 w-fit h-fit mt-20 p-10 rounded-lg shadow-lg shadow-indigo-500/40'>
        <form onSubmit={handleStudentLogin}>
          <div className='pb-10'>
            <img src={logo} alt='cloud' />
          </div>

          <div className='grid grid-cols-2 bg-red-800'>
            <div className='flex justify-center text-base items-center bg-slate-500'>
              <label htmlFor=''>MSSV:</label>
            </div>
            <div>
              <input onChange={(e) => setStudentCode(e.target.value)} name='studentCode' type='text' />
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
            {/* <input onClick={handleStudentLogin} className='cursor-pointer' type='button' value={'Đăng nhập'} /> */}
            <input type='submit' value={'Đăng nhập'} className='cursor-pointer' />
          </div>
        </form>
      </dir>
    </div>
  )
}
