import React from 'react'
import { useEffect } from 'react'
import avata from '../assets/avata-sv.jpg'

const Home = () => {
  useEffect(() => {
    document.title = 'Trang chủ'
  }, [])

  if (!localStorage.getItem('account_id')) {
    window.location.href = '/login'
  }

  return (
    <div className='grid grid-rows-2 pl-40 pr-40 pt-4'>
      <div className='grid grid-cols-3 bg-white'>
        <div className='col-span-2 grid grid-rows-5 shadow shadow-gray-500 rounded-md p-4'>
          <div className='flex justify-start border-b-2 border-b-gray-200'>
            <span className='font-bold text-slate-600 text-lg'>Thông tin sinh viên</span>
          </div>
          <div className='row-span-4 grid grid-cols-3 pt-4'>
            <div className='relative rounded-full h-40 w-40 flex items-center justify-center'>
              <img className='rounded-full' src={avata} alt='cloud' />
            </div>
            <div>
              <ul className='text-sm'>
                <li className='text-left p-2'>
                  <span>MSSV:</span>
                  <span className='font-bold text-slate-600'>20194789</span>
                </li>
                <li className='text-left p-2'>
                  <span>Họ tên:</span>
                  <span className='font-bold text-slate-600'>Nguyễn Văn A</span>
                </li>
                <li className='text-left p-2'>
                  <span>Gioi tính:</span>
                  <span className='font-bold text-slate-600'>Nam</span>
                </li>
                <li className='text-left p-2'>
                  <span>Ngày sinh:</span>
                  <span className='font-bold text-slate-600'>17-01-2000</span>
                </li>
                <li className='text-left p-2'>
                  <span>Nơi sinh:</span>
                  <span className='font-bold text-slate-600'>tỉnh Bến Tre</span>
                </li>
              </ul>
            </div>
            <div>
              <ul className='text-sm'>
                <li className='text-left p-2'>
                  <span>Lớp học:</span>
                  <span className='font-bold text-slate-600'>DHKTPM16A</span>
                </li>
                <li className='text-left p-2'>
                  <span>Khóa học:</span>
                  <span className='font-bold text-slate-600'>2020-2021</span>
                </li>
                <li className='text-left p-2'>
                  <span>Bậc đào tạo:</span>
                  <span className='font-bold text-slate-600'>Đại học</span>
                </li>
                <li className='text-left p-2'>
                  <span>Loại hình đào tạo</span>
                  <span className='font-bold text-slate-600'>Chính quy</span>
                </li>
                <li className='text-left p-2'>
                  <span>Ngành:</span>
                  <span className='font-bold text-slate-600'>Kỹ thuật phần mềm</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className='ml-4 grid grid-rows-2'>
          <div className='shadow shadow-gray-500 rounded-md grid grid-rows-3 text-sm pb-4'>
            <div className='flex justify-start pl-4'>
              <span>Nhắc nhở mới,chưa xem</span>
            </div>
            <div className='row-span-2 grid grid-flow-row justify-start pl-4'>
              <span className='font-medium text-4xl text-slate-600'>0</span>
              <span>Xem chi tiết</span>
            </div>
          </div>
          <div className='grid grid-cols-2 pt-4'>
            <div className='shadow shadow-gray-500 rounded-md grid grid-rows-3 text-sm bg-sky-200'>
              <div className='flex justify-start pl-4'>
                <span>Lịch học trong tuần</span>
              </div>
              <div className='row-span-2 grid grid-flow-row justify-start pl-4'>
                <span className='font-medium text-4xl text-slate-600'>0</span>
                <span>Xem chi tiết</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p>This is the home page of your application.</p>
    </div>
  )
}

export default Home
