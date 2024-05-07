import React from 'react'
import { useEffect, useState, useRef } from 'react'
import avata from '../../assets/avata-sv.jpg'
import { MdOutlineAttachMoney } from 'react-icons/md'
import { IoCalendarNumberOutline } from 'react-icons/io5'
import { GrCalendar } from 'react-icons/gr'
import { FaFileInvoiceDollar } from 'react-icons/fa6'
import { FaFileLines } from 'react-icons/fa6'
import { FiLayers } from 'react-icons/fi'
import { TfiBarChart } from 'react-icons/tfi'
import { PiBagSimple } from 'react-icons/pi'
import { apiInforSv, findClassCredirBySemester, getCreditsByAccountID } from '../../api/Home'
import moment from 'moment-timezone'
import ChartPie from '@garvae/react-pie-chart'
import { Toaster } from 'react-hot-toast'
import 'react-toastify/dist/ReactToastify.css'
import Cookies from 'cookie-universal'

const Home = () => {
  const cookies = Cookies()
  const [user, setUser] = useState([])
  const [dsClas, setDsClass] = useState([])
  const [currenSemester, setCurrentSemester] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [creditTotal, setCreditTotal] = useState(0)

  if (!cookies.get('accses_token')) {
    window.location.href = '/login'
  }

  useEffect(() => {
    document.title = 'Trang chủ'
    const fetchData = async () => {
      setIsLoading(true)
      const resultStudent = await apiInforSv(localStorage.getItem('account_id'))
      if (resultStudent.status !== 200) {
        setIsLoading(true)
        return
      }
      setUser(resultStudent.data)
      const currentMonth = new Date().getMonth() + 1
      const currentYearSemester =
        currentMonth >= 1 && currentMonth <= 6
          ? `HK2(${currentYear - 1}-${currentYear})`
          : `HK1(${currentYear}-${currentYear + 1})`
      setCurrentSemester(currentYearSemester)
      const resultClassSemester = await findClassCredirBySemester(resultStudent.data.student._id, currenSemester)
      if (resultClassSemester.status !== 200) {
        setIsLoading(true)
        return
      }
      const resultCredit = await getCreditsByAccountID(localStorage.getItem('account_id'))
      if (resultCredit.status !== 200) {
        setIsLoading(true)
        return
      }
      setCreditTotal(resultCredit.data.creditTotal)
      setIsLoading(false)
    }
    fetchData()
  }, [])

  useEffect(() => {
    setCurrentSemester(currenSemester)
    const fetchData = async () => {
      if (user && user.student && user.student._id) {
        const resultClassSemester = await findClassCredirBySemester(user.student._id, currenSemester)
        setDsClass(resultClassSemester.data.class)
      }
    }
    fetchData()
  }, [currenSemester, user])

  const DATA = [
    {
      color: '#e74949',
      order: 1,
      segmentId: '001',
      value: user && user.student && creditTotal
    },
    {
      color: '#49bae7',
      order: 2,
      segmentId: '002',
      value: 156
    }
  ]

  if (!localStorage.getItem('account_id')) {
    window.location.href = '/login'
  }

  const ref = useRef(null)
  function handleDirectRegisterCourse() {
    window.location.href = '/register-course'
  }

  const enrollmentYear = 2020
  const currentYear = new Date().getFullYear()
  const semesters = []

  for (let year = enrollmentYear; year <= currentYear; year++) {
    semesters.push(`HK1(${year}-${year + 1})`)
    semesters.push(`HK2(${year}-${year + 1})`)
  }

  //handle get học kỳ hiện tại
  const currentMonth = new Date().getMonth() + 1
  const currentYearSemester =
    currentMonth >= 1 && currentMonth <= 6
      ? `HK2(${currentYear - 1}-${currentYear})`
      : `HK1(${currentYear}-${currentYear + 1})`

  if (isLoading) {
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

  //moment -> birthday 2002-04-17
  // const birthday = moment('2002-04-17').format('DD-MM-YYYY')

  return (
    <div className='grid grid-rows-3 pl-40 pr-40 pt-4 text-color-wrapper'>
      <div className='row-span-2 grid grid-cols-3 bg-white'>
        <div className='col-span-2 grid grid-rows-5 shadow shadow-gray-500 rounded-md p-4'>
          <div className='flex justify-start border-b-2 border-b-gray-200'>
            <span className='font-bold text-lg'>Thông tin sinh viên</span>
          </div>
          <div className='row-span-4 grid grid-cols-3 pt-4'>
            <div className='relative rounded-full h-40 w-40 flex items-center justify-center'>
              <img className='rounded-full' src={avata} alt='cloud' />
            </div>
            <div>
              <ul className='text-sm'>
                <li className='text-left p-2'>
                  <span>MSSV:</span>
                  <span className='font-bold'>{user && user.student && user.student.mssv}</span>
                </li>
                <li className='text-left p-2'>
                  <span>Họ tên:</span>
                  <span className='font-bold'>{user && user.student && user.student.userName}</span>
                </li>
                <li className='text-left p-2'>
                  <span>Gioi tính:</span>
                  <span className='font-bold'>{user && user.student && user.student.gender}</span>
                </li>
                <li className='text-left p-2'>
                  <span>Ngày sinh:</span>
                  <span className='font-bold'>
                    {moment(user && user.student && user.student.dateOfBirth).format('YYYY-MM-DD')}
                  </span>
                </li>
                <li className='text-left p-2'>
                  <span>Nơi sinh:</span>
                  <span className='font-bold'>tỉnh Bến Tre</span>
                </li>
              </ul>
            </div>
            <div>
              <ul className='text-sm'>
                <li className='text-left p-2'>
                  <span>Lớp học:</span>
                  <span className='font-bold'>{user && user.student && user.student.definiteClass}</span>
                </li>
                <li className='text-left p-2'>
                  <span>Khóa học:</span>
                  <span className='font-bold'>2020-2021</span>
                </li>
                <li className='text-left p-2'>
                  <span>Bậc đào tạo:</span>
                  <span className='font-bold'>Đại học</span>
                </li>
                <li className='text-left p-2'>
                  <span>Loại hình đào tạo</span>
                  <span className='font-bold'>Chính quy</span>
                </li>
                <li className='text-left p-2'>
                  <span>Ngành:</span>
                  <span className='font-bold'>{user && user.majorName}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className='ml-4 grid grid-rows-2'>
          <div className='shadow shadow-gray-500 rounded-md grid grid-rows-3 text-sm pt-2'>
            <div className='flex justify-start pl-4'>
              <span>Nhắc nhở mới,chưa xem</span>
            </div>
            <div className='row-span-2 grid grid-flow-row justify-start pl-4'>
              <span className='font-medium text-4xl'>0</span>
              <span className='text-link'>Xem chi tiết</span>
            </div>
          </div>
          <div className='grid grid-cols-2 pt-4'>
            <div className='shadow shadow-gray-500 rounded-md grid grid-rows-3 text-sm bg-lich-hoc mr-2 pt-2'>
              <div className='flex justify-start pl-4'>
                <span>Lịch học trong tuần</span>
              </div>
              <div className='row-span-2 grid grid-flow-row justify-start pl-4'>
                <span className='font-medium text-4xl'>0</span>
                <span>Xem chi tiết</span>
              </div>
            </div>
            <div className='shadow shadow-gray-500 rounded-md grid grid-rows-3 text-sm bg-lich-thi ml-2 pt-2'>
              <div className='flex justify-start pl-4'>
                <span>Lịch thi trong tuần</span>
              </div>
              <div className='row-span-2 grid grid-flow-row justify-start pl-4'>
                <span className='font-medium text-4xl'>0</span>
                <span>Xem chi tiết</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-8 mt-4'>
        <div className='grid grid-rows-2 shadow shadow-gray-500 rounded-md mr-4 text-link cursor-pointer'>
          <div className='flex items-center justify-center text-3xl'>
            <IoCalendarNumberOutline />
          </div>
          <span className='text-sm'>Lịch học theo tuần</span>
        </div>
        <div className='grid grid-rows-2 shadow shadow-gray-500 rounded-md mr-4 text-link cursor-pointer'>
          <div className='flex items-center justify-center text-3xl'>
            <TfiBarChart />
          </div>
          <span className='text-sm'>Kết quả học tập</span>
        </div>
        <div className='grid grid-rows-2 shadow shadow-gray-500 rounded-md mr-4 text-link cursor-pointer'>
          <div className='flex items-center justify-center text-3xl'>
            <FiLayers />
          </div>
          <span className='text-sm hover:text-gray-500' onClick={handleDirectRegisterCourse}>
            Đăng ký học phần
          </span>
        </div>
        <div className='grid grid-rows-2 shadow shadow-gray-500 rounded-md mr-4 text-link cursor-pointer'>
          <div className='flex items-center justify-center text-3xl'>
            <MdOutlineAttachMoney />
          </div>
          <span className='text-sm'>Tra cứu công nợ</span>
        </div>
        <div className='grid grid-rows-2 shadow shadow-gray-500 rounded-md mr-4 text-link cursor-pointer'>
          <div className='flex items-center justify-center text-3xl'>
            <FaFileInvoiceDollar />
          </div>
          <span className='text-sm'>Thanh toán trực tuyến</span>
        </div>
        <div className='grid grid-rows-2 shadow shadow-gray-500 rounded-md mr-4 text-link cursor-pointer'>
          <div className='flex items-center justify-center text-3xl'>
            <FaFileLines />
          </div>
          <span className='text-sm'>Phiếu thu tổng hợp</span>
        </div>
        <div className='grid grid-rows-2 shadow shadow-gray-500 rounded-md mr-4 text-link cursor-pointer'>
          <div className='flex items-center justify-center text-3xl'>
            <GrCalendar />
          </div>
          <span className='text-sm'>Lịch theo tiến độ</span>
        </div>
        <div className='grid grid-rows-2 shadow shadow-gray-500 rounded-md text-link cursor-pointer'>
          <div className='flex items-center justify-center text-3xl'>
            <PiBagSimple />
          </div>
          <span className='text-sm'>Nhắc nhở</span>
        </div>
      </div>
      <div className='grid grid-flow-col mt-4'>
        <div className='grid grid-rows-10 shadow shadow-gray-500 rounded-md p-4 mr-4 h-64'>
          <div className='grid grid-cols-2'>
            <div className='row-span-1 font-bold text-left'>
              <h1>Kết quả học tập</h1>
            </div>
            <div className='flex justify-end'>
              <select name='' id='' className='h-9 text-sm'>
                {semesters.map((semester, index) => (
                  <option key={index} value={semester}>
                    {semester}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className='grid grid-rows-10 shadow shadow-gray-500 rounded-md p-4 mr-4 h-64'>
          <div className='row-span-1 font-bold text-left'>
            <h1>Tiến độ học tập</h1>
          </div>
          <div className='row-span-7 relative items-center flex justify-center' ref={ref}>
            <ChartPie text={Math.round((creditTotal / 156) * 100) + '%'} data={DATA} parentRef={ref} />
          </div>
          <div className='font-bold text-black'>
            <h1>{creditTotal + '/' + 156}</h1>
          </div>
        </div>
        <div className='grid grid-rows-10 shadow shadow-gray-500 rounded-md p-4 h-64'>
          <div className='row-span-2 grid grid-cols-2 text-left border-b-2'>
            <div className='row-span-1 font-bold text-left'>
              <h1>Lớp học phần</h1>
            </div>
            <div className='h-fit flex justify-end w-full'>
              <select
                onChange={(e) => setCurrentSemester(e.target.value)}
                name='semester'
                id=''
                className='h-9 text-sm'
              >
                {semesters.map((semester, index) =>
                  currenSemester === semester ? (
                    <option key={index} value={semester} selected>
                      {semester}
                    </option>
                  ) : (
                    <option key={index} value={semester}>
                      {semester}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>
          <div className='row-span-2 grid grid-cols-2 text-left border-b-2 items-center text-sm'>
            <span>Môn học/học phần</span>
            <div className='flex justify-end w-full'>
              <span>Số tín chỉ</span>
            </div>
          </div>
          <div>
            <ul>
              {dsClas.map((course, index) => (
                <li key={index} className='grid grid-cols-5'>
                  <div className='col-span-4 grid grid-flow-row'>
                    <div className='flex justify-start text-link'>
                      <span>{course.courseCode}</span>
                    </div>
                    <div className='flex justify-start'>
                      <span>{course.courseName}</span>
                    </div>
                  </div>
                  <div className='flex justify-end items-center'>
                    <span>{course.courseCredit}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
