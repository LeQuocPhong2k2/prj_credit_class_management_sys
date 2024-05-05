import React, { useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { Toaster, toast } from 'react-hot-toast'
import Cookies from 'cookie-universal'
import 'react-toastify/dist/ReactToastify.css'
import logo from '../../assets/logo.png'
import { login } from '../../api/Login'

export default function Login() {
  const cookies = new Cookies()

  const [userCode, setuserCode] = useState('')
  const [password, setPassword] = useState('')

  const [recaptchaToken, setRecaptchaToken] = useState(null)
  const handleRecaptcha = (token) => {
    setRecaptchaToken(token)
  }

  const handleStudentLogin = async (e) => {
    e.preventDefault()
    if (userCode === '' || password === '' || recaptchaToken === null) {
      toast.error('Vui lòng nhập đầy đủ thông tin và xác nhận CAPTCHA!!!')
      return
    }
    const accountType = 'student'

    try {
      const res = await login(userCode, password, accountType, recaptchaToken)
      if (res.status === 200) {
        toast.success('Đăng nhập thành công')
        setTimeout(() => {
          cookies.set('accses_token', res.data.token, { path: '/', maxAge: 60 * 60 })
          localStorage.setItem('account_id', res.data.account_id)
          window.location.href = '/'
        }, 1000)
      } else {
        toast.error('Đăng nhập thất bại')
      }
    } catch (error) {
      toast.error('Đăng nhập thất bại')
    }
  }

  return (
    <div class='flex justify-center h-screen bg-[#ffff]'>
      <Toaster toastOptions={{ duration: 2200 }} />
      <dir class='border border-sky-500 w-fit h-fit mt-20 p-10 rounded-lg shadow-lg shadow-indigo-500/40'>
        <form onSubmit={handleStudentLogin}>
          <div className='pb-10'>
            <img src={logo} alt='cloud' />
          </div>
          <div className='grid grid-cols-10 bg-red-800'>
            <div className='flex justify-center text-base items-center bg-[#fee2e2] text-dark col-span-3'>
              <label htmlFor=''>MSSV:</label>
            </div>
            <div className='col-span-7'>
              <input className='w-full' onChange={(e) => setuserCode(e.target.value)} name='userCode' type='text' />
            </div>
          </div>
          <div className='grid grid-cols-10 mt-2 bg-red-800'>
            <div className='flex justify-center text-base items-center bg-[#fee2e2] text-dark col-span-3'>
              <label htmlFor=''>Mật khẩu:</label>
            </div>
            <div className='col-span-7'>
              <input className='w-full' onChange={(e) => setPassword(e.target.value)} type='password' />
            </div>
          </div>
          <div className='flex justify-start w-full pt-2'>
            <ReCAPTCHA sitekey='6LfgJcYpAAAAAGUFb9AfiadfSEHo69CLj_ETYu8q' onChange={handleRecaptcha} />
          </div>

          <div className='grid grid-cols-1 mt-2 bg-blue-600 text-white font-bold p-2 cursor-pointer'>
            <input type='submit' value={'Đăng nhập'} />
          </div>
        </form>
      </dir>
    </div>
  )
}
