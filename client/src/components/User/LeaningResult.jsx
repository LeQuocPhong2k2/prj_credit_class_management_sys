import React, { useState, useEffect } from 'react'
import Cookies from 'cookie-universal'
import { getLearningResult } from '../../api/LeaningResult'

export default function LeaningResult() {
  const cookies = Cookies()
  const [results, setResults] = useState([])

  if (!cookies.get('accses_token')) {
    window.location.href = '/login'
  }

  useEffect(() => {
    document.title = 'Kết quả học tập'
    const featchData = async () => {
      try {
        const res = await getLearningResult(localStorage.getItem('account_id'))
        if (res.status === 200) {
          // console.log(res.data.learningResult[0].classCredit[0].userName)
          setResults(res.data.learningResult)
        } else {
          setResults([])
        }
      } catch (error) {
        setResults([])
        console.log(error)
      }
    }
    featchData()
  }, [])

  return (
    <div className='grid grid-flow-row pt-20 pl-40 pr-40 text-color-wrapper'>
      <div className='bg-white p-2 rounded h-88vh overflow-scroll'>
        <div className='flex justify-center items-center pb-4'>
          <span className='text-base font-bold'>Kết quả học tập</span>
        </div>
        <div className='flex justify-center items-center'>
          <table className='w-full text-center border-collapse'>
            <thead>
              <tr>
                <th className='text-link font-medium border border-gray-300'>STT</th>
                <th className='text-link font-medium border border-gray-300'>Mã lơp học phần</th>
                <th className='text-link font-medium border border-gray-300'>Môn học</th>
                <th className='text-link font-medium border border-gray-300'>Điểm</th>
                <th className='text-link font-medium border border-gray-300'>Thang điểm 4</th>
                <th className='text-link font-medium border border-gray-300'>Điểm chữ</th>
                <th className='text-link font-medium border border-gray-300'>Xếp loại</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <>
                  <tr className='bg-gray-100 text-left' key={`result-${index}`}>
                    <td colSpan='7' className='font-light text-base text-slate-600 border border-gray-300'>
                      {result._id}
                    </td>
                  </tr>
                  {result.classCredit.map((classCredit, classIndex) => (
                    <tr key={`classCredit-${index}-${classIndex}`}>
                      <td className='border border-gray-300'>{classIndex + 1}</td>
                      <td className='border border-gray-300'>{classCredit.classDetail.classCode}</td>
                      <td className='border border-gray-300'>{classCredit.classDetail.className}</td>
                      <td className='border border-gray-300'>{classCredit.class.mark}</td>
                      {/* tính thang điểm 4 từ mark  */}
                      <td className='border border-gray-300'>
                        {classCredit.class.mark >= 9
                          ? 4
                          : classCredit.class.mark >= 8
                          ? 3.7
                          : classCredit.class.mark >= 7
                          ? 3.3
                          : classCredit.class.mark >= 6
                          ? 3
                          : classCredit.class.mark >= 5.5
                          ? 2.5
                          : classCredit.class.mark >= 5
                          ? 2
                          : 0}
                      </td>
                      <td className='border border-gray-300'>{classCredit.class.grank}</td>
                      {/* xếp loại từ grank */}
                      <td className='border border-gray-300'>
                        {classCredit.class.grank === 'A'
                          ? 'Xuất sắc'
                          : classCredit.class.grank === 'B'
                          ? 'Tốt'
                          : classCredit.class.grank === 'C'
                          ? 'Khá'
                          : classCredit.class.grank === 'D'
                          ? 'Trung bình'
                          : classCredit.class.grank === 'F'
                          ? 'Yếu'
                          : ''}
                      </td>
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
