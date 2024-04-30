import React, { useState, useEffect } from 'react'
import axios from 'axios'

const RegisterCourse = () => {
  const [course, setCourse] = useState({})
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  if (!localStorage.getItem('account_id')) {
    window.location.href = '/login'
  }

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('/api/courses')
        setCourses(response.data)
        setLoading(false)
      } catch (error) {
        setError(error)
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/api/register-course', course)
      alert('Course registered successfully')
    } catch (error) {
      console.log(error)
    }
  }

  if (loading) return <p>Loading...</p>
  //if (error) return <p>Error</p>

  return (
    <div className='grid grid-rows-3 pl-40 pr-40 pt-4 text-color-wrapper'>
      <div className='grid grid-rows-5 gap-2 shadow shadow-gray-500 rounded-md p-4'>
        <div className='flex justify-start items-center font-bold text-lg border-b-2'>
          <span>Đăng ký học phần</span>
        </div>
        <div className='flex gap-8 justify-center items-center'>
          <div className='h-fit flex justify-end'>
            <select name='' id='' className='h-9'>
              <option value=''>HK2 2023-2024</option>
            </select>
          </div>
          <div className='flex items-center justify-center gap-2'>
            <input type='radio' />
            <label htmlFor=''>Học mới</label>
          </div>
          <div className='flex items-center justify-center gap-2'>
            <input type='radio' />
            <label htmlFor=''>Học lại</label>
          </div>
          <div className='flex items-center justify-center gap-2'>
            <input type='radio' />
            <label htmlFor=''>Học cải thiện</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterCourse
