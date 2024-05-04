import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Toaster } from 'react-hot-toast'

const RegisterCourse = () => {
  const [course, setCourse] = useState({})
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  if (!localStorage.getItem('account_id')) {
    window.location.href = '/login'
  }

  useEffect(() => {
    document.title = 'Đăng ký học phần'
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

  const enrollmentYear = 2020
  const currentYear = new Date().getFullYear()
  const semesters = []

  for (let year = enrollmentYear; year <= currentYear; year++) {
    semesters.push(`HK1 ${year}-${year + 1}`)
    semesters.push(`HK2 ${year}-${year + 1}`)
  }

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Toaster toastOptions={{ duration: 2200 }} />
        <div class='flex items-center justify-center w-56 h-56'>
          <div role='status'>
            <svg
              aria-hidden='true'
              class='w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
              viewBox='0 0 100 101'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                fill='currentColor'
              />
              <path
                d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                fill='currentFill'
              />
            </svg>
            <span class='sr-only'>Loading...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='grid grid-flow-row pl-40 pr-40 pt-4 text-color-wrapper'>
      <div className='grid gap-2 shadow shadow-gray-500 rounded-md p-4'>
        <div className='flex justify-start items-center font-bold text-lg border-b-2'>
          <span>Đăng ký học phần</span>
        </div>
        <div className='flex gap-8 justify-center items-center'>
          <div className='h-fit flex justify-end'>
            <select name='' id='' className='h-9'>
              {semesters.map((semester, index) => (
                <option key={index} value={semester}>
                  {semester}
                </option>
              ))}
            </select>
          </div>
          <div className='flex items-center justify-center gap-2'>
            <input name='rdoLoaiDangKyHocPhan' type='radio' />
            <label htmlFor=''>Học mới</label>
          </div>
          <div className='flex items-center justify-center gap-2'>
            <input name='rdoLoaiDangKyHocPhan' type='radio' />
            <label htmlFor=''>Học lại</label>
          </div>
          <div className='flex items-center justify-center gap-2'>
            <input name='rdoLoaiDangKyHocPhan' type='radio' />
            <label htmlFor=''>Học cải thiện</label>
          </div>
        </div>
        {/* content */}
        <div className='grid grid-flow-row text-yellow-500 font-bold'>
          <span>MÔN HỌC PHẦN ĐANG CHỜ ĐĂNG KÝ</span>
        </div>
        <div className='grid grid-flow-row'>
          <table>
            <thead className='text-sm font-normal bg-table-header text-white'>
              <td className='w-14'></td>
              <td>STT</td>
              <td>Mã học phần</td>
              <td>Tên môn học/học phần</td>
              <td>TC</td>
              <td>Bắt buộc</td>
              <td>
                học phần: học trước (a),
                <br />
                tiên quyết (b), <br />
                song hành (c)
              </td>
            </thead>
            <tbody className='text-color-cuorse'>
              <tr>
                <td>
                  <input type='radio' />
                </td>
                <td>1</td>
                <td>INT1001</td>
                <td>Giáo dục quốc phòng</td>
                <td>2</td>
                <td>BB</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='grid grid-flow-row mt-4'>
          <div className='grid grid-cols-2 text-yellow-500 font-bold'>
            <div className='border-l-2 border-yellow-500'>
              <span>LỚP HỌC PHẦN CHỜ ĐĂNG KÝ</span>
            </div>
            <div className='flex justify-center items-center gap-2'>
              <input type='checkbox' id='ckTrunglich' />
              <label htmlFor='ckTrunglich'>HIỂN THỊ LỚP HỌC PHẦN KHÔNG TRÙNG LỊCH</label>
            </div>
          </div>
          <div className='grid mt-2'>
            <table>
              <thead className='text-sm h-10 font-normal bg-table-header text-white'>
                <td className='w-14'></td>
                <td>STT</td>
                <td>Mã LHP</td>
                <td>Tên lớp học phần</td>
                <td>Lớp dự kiến</td>
                <td>Sĩ số tối đa</td>
                <td>Đã đăng ký</td>
                <td>Trạng thái</td>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input type='radio' />
                  </td>
                  <td>1</td>
                  <td>4230002421</td>
                  <td>Giáo dục quốc phòng</td>
                  <td>4203002421-DHCT16A-HL</td>
                  <td>30</td>
                  <td>0</td>
                  <td>Chờ đăng ký</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className='grid grid-flow-row mt-4'>
          <div className='border-l-2 border-yellow-500'>
            <span className='font-bold text-yellow-500'>CHI TIẾT LỚP HỌC PHẦN</span>
          </div>
          <div className='flex gap-10 justify-center items-center'>
            <span>Nhóm thực hành</span>
            <select className='w-40 h-9 rounded-md' name='' id=''>
              <option value='1'>1</option>
            </select>
            <input
              className='p-1 pl-2 pr-2 font-medium cursor-pointer bg-yellow-500 text-white'
              type='button'
              value='Xem lịch trùng'
            />
          </div>
          <div className='grid mt-2'>
            <table>
              <thead className='text-sm h-10 font-normal bg-table-header text-white'>
                <td>STT</td>
                <td>Lịch học</td>
                <td>Nhóm TH</td>
                <td>Phòng</td>
                <td>Dãy nhà</td>
                <td>Cở sở</td>
                <td>Giảng viên</td>
                <td>Thời gian</td>
                <td className='w-24'></td>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>LT - Thứ 5 (T13 - T15)</td>
                  <td>1</td>
                  <td>A.01</td>
                  <td>A</td>
                  <td>Cở sở 1 (Thành phố Hồ Chí Minh)</td>
                  <td>ThS Nguyễn Văn Nam</td>
                  <td>02/05/2024 - 25/06/2024</td>
                  <td>
                    <input className='text-link cursor-pointer' type='button' value='Xem' />
                  </td>
                </tr>
              </tbody>
            </table>
            <div className='mt-2'>
              <input
                className='w-36 p-1 pl-2 pr-2 font-medium cursor-pointer bg-yellow-500 text-white'
                type='button'
                value='Đăng ký môn học'
              />
            </div>
          </div>
        </div>

        <div className='grid grid-flow-row mt-4'>
          <div className='border-l-2 border-yellow-500'>
            <span className='font-bold text-yellow-500'>LỚP HỌC PHẦN ĐÃ ĐĂNG KÝ TRONG KỲ NÀY</span>
          </div>
          <div className='grid mt-2'>
            <table>
              <thead className='text-sm h-10 font-normal bg-table-header text-white'>
                <td>STT</td>
                <td>Mã LHP</td>
                <td>Tên lớp học phần</td>
                <td>Lớp dự kiến</td>
                <td>Số TC</td>
                <td>Nhóm TH</td>
                <td>Học phí</td>
                <td>Thu</td>
                <td>Ngày đăng ký</td>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>4230002421</td>
                  <td>Giáo dục quốc phòng</td>
                  <td>4203002421-DHCT16A-HL</td>
                  <td>2</td>
                  <td>1</td>
                  <td>2,880,000</td>
                  <td className='flex justify-center items-center h-8'>
                    <input
                      className='w-4 h-4 text-orange-500 rounded-full'
                      type='checkbox'
                      checked
                      disabled
                      name=''
                      id=''
                    />
                  </td>
                  <td>02/05/2024</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterCourse
