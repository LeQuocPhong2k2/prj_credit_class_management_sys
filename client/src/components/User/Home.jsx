import React from 'react'
import { useEffect } from 'react'
import avata from '../../assets/avata-sv.jpg'
import { IoCalendarNumberOutline } from 'react-icons/io5'

const Home = () => {
  useEffect(() => {
    document.title = 'Trang chủ'
  }, [])

  if (!localStorage.getItem('account_id')) {
    window.location.href = '/login'
  }

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
                  <span className='font-bold'>20194789</span>
                </li>
                <li className='text-left p-2'>
                  <span>Họ tên:</span>
                  <span className='font-bold'>Nguyễn Văn A</span>
                </li>
                <li className='text-left p-2'>
                  <span>Gioi tính:</span>
                  <span className='font-bold'>Nam</span>
                </li>
                <li className='text-left p-2'>
                  <span>Ngày sinh:</span>
                  <span className='font-bold'>17-01-2000</span>
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
                  <span className='font-bold'>DHKTPM16A</span>
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
                  <span className='font-bold'>Kỹ thuật phần mềm</span>
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
        <div className='grid grid-rows-2 shadow shadow-gray-500 rounded-md mr-4'>
          <div className='flex items-center justify-center text-3xl'>
            <IoCalendarNumberOutline />
          </div>
          <span className='text-sm'>Lịch học theo tuần</span>
        </div>
        <div className='grid grid-rows-2 shadow shadow-gray-500 rounded-md mr-4'>
          <div className='flex items-center justify-center text-3xl'>
            <IoCalendarNumberOutline />
          </div>
          <span className='text-sm'>Kết quả học tập</span>
        </div>
        <div className='grid grid-rows-2 shadow shadow-gray-500 rounded-md mr-4'>
          <div className='flex items-center justify-center text-3xl'>
            <IoCalendarNumberOutline />
          </div>
          <span className='text-sm'>Đăng ký học phần</span>
        </div>
        <div className='grid grid-rows-2 shadow shadow-gray-500 rounded-md mr-4'>
          <div className='flex items-center justify-center text-3xl'>
            <IoCalendarNumberOutline />
          </div>
          <span className='text-sm'>Tra cứu công nợ</span>
        </div>
        <div className='grid grid-rows-2 shadow shadow-gray-500 rounded-md mr-4'>
          <div className='flex items-center justify-center text-3xl'>
            <IoCalendarNumberOutline />
          </div>
          <span className='text-sm'>Thanh toán trực tuyến</span>
        </div>
        <div className='grid grid-rows-2 shadow shadow-gray-500 rounded-md mr-4'>
          <div className='flex items-center justify-center text-3xl'>
            <IoCalendarNumberOutline />
          </div>
          <span className='text-sm'>Phiếu thu tổng hợp</span>
        </div>
        <div className='grid grid-rows-2 shadow shadow-gray-500 rounded-md mr-4'>
          <div className='flex items-center justify-center text-3xl'>
            <IoCalendarNumberOutline />
          </div>
          <span className='text-sm'>Lịch theo tiến độ</span>
        </div>
        <div className='grid grid-rows-2 shadow shadow-gray-500 rounded-md'>
          <div className='flex items-center justify-center text-3xl'>
            <IoCalendarNumberOutline />
          </div>
          <span className='text-sm'>Nhắc nhở</span>
        </div>
      </div>
    </div>
  )
}

export default Home
