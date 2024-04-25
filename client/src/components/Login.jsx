import axios from 'axios'
import React, { useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { Toaster, toast } from 'react-hot-toast'
import 'react-toastify/dist/ReactToastify.css'
import logo from '../assets/logo.png'
export default function Login() {
  const [studentCode, setStudentCode] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [confirmCode, setConfirmationCode] = useState('')
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  const [recaptchaToken, setRecaptchaToken] = useState(null)
  const handleRecaptcha = (token) => {
    setRecaptchaToken(token)
  }

  const handleStudentLogin = async (e) => {
    e.preventDefault()

    // kiểm tra rỗng
    if (studentCode === '' || password === '' || recaptchaToken === null) {
      toast.error('Vui lòng nhập đầy đủ thông tin và xác nhận CAPTCHA!!!')
      // Đặt biến errorShown thành true để chỉ hiển thị một lần

      return
    }
    const accountType = 'student'

    axios
      .post('http://localhost:3003/account/login', {
        userCode: studentCode,
        password: password,
        accountType: accountType,
        recaptchaToken: recaptchaToken
      })
      .then((response) => {
        console.log(response)
        if (response.data.message === 'Không tìm thấy tài khoản') {
          toast.error('Sinh Viên không tồn tại!!!')
        } else if (response.data.message === 'Password or AccountType not match') {
          toast.error('Mật khẩu  hoặc loại tài khoản không đúng!!!')
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
    <div class='flex justify-center h-screen bg-[#ffff]'>
      <Toaster toastOptions={{ duration: 2200 }} />
      <dir class='border border-sky-500 w-fit h-fit mt-20 p-10 rounded-lg shadow-lg shadow-indigo-500/40'>
        <form onSubmit={handleStudentLogin}>
          <div className='pb-10'>
            <img src={logo} alt='cloud' />
          </div>

          {/* <div className='grid grid-cols-2 bg-red-800'>
            <div className='flex justify-center text-base items-center bg-[#fee2e2] text-dark '>
              <label htmlFor=''>MSSV:</label>
            </div>
            <div>
              <input onChange={(e) => setStudentCode(e.target.value)} name='studentCode' type='text' />
            </div>
          </div> */}
          <div className='grid grid-cols-10 bg-red-800'>
            <div className='flex justify-center text-base items-center bg-[#fee2e2] text-dark col-span-3'>
              <label htmlFor=''>MSSV:</label>
            </div>
            <div className='col-span-7'>
              <input
                className='w-full'
                onChange={(e) => setStudentCode(e.target.value)}
                name='studentCode'
                type='text'
              />
            </div>
          </div>
          <div className='grid grid-cols-10 mt-2 bg-red-800'>
            <div className='flex justify-center text-base items-center bg-[#fee2e2] text-dark col-span-3'>
              <label htmlFor=''>Mật khẩu:</label>
            </div>
            <div className='col-span-7'>
              <input
                className='w-full'
                onChange={(e) => setPassword(e.target.value)}
                type='password'
                // type={showPassword ? 'text' : 'password'}
              />
              {/* <span className='span-eye' onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Sử dụng icon con mắt */}
              {/* </span> */}
            </div>
          </div>
          <div className='grid grid-cols-10 mt-2 flex justify-center items-center'>
            {/* <div className='col-span-7'> */}
            <div className='col-start-3 col-end-13'>
              <ReCAPTCHA sitekey='6LfgJcYpAAAAAGUFb9AfiadfSEHo69CLj_ETYu8q' onChange={handleRecaptcha} />
            </div>
          </div>

          <div className='grid grid-cols-1 mt-2 bg-blue-600 text-white font-bold p-2 cursor-pointer'>
            {/* <input onClick={handleStudentLogin} className='cursor-pointer' type='button' value={'Đăng nhập'} /> */}
            <input
              type='submit'
              value={'Đăng nhập'}
              // className=''
              // className='g-recaptcha cursor-pointer'
              // data-sitekey='6Lc_TcUpAAAAACarNssYe65_5t0BomOkk_bJ70k1'
              // data-callback='onSubmit'
              // data-action='submit'
            />
          </div>
        </form>
      </dir>
    </div>
  )
}
