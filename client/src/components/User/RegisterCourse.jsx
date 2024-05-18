import React, { useState, useEffect } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import 'react-toastify/dist/ReactToastify.css'
import {
  getCourseNew,
  getCourseByStatus,
  getClasCreditCourseCode,
  getClassCreditDetailsByClassCode,
  registerClassCredit,
  getClasCreditCompleteRegistration
} from '../../api/RegisterCourse'
import { apiInforSv } from '../../api/Home'
import { IoCloseCircleSharp } from 'react-icons/io5'
import Cookies from 'cookie-universal'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import Button from '@mui/material/Button'
import moment from 'moment-timezone'

const RegisterCourse = () => {
  const [openDialog, setOpenDialog] = useState(false)
  const cookies = Cookies()
  const [student, setStudent] = useState([])
  const [courses, setCourses] = useState([])
  const [classCourse, setClassCourse] = useState([])
  const [loading, setLoading] = useState(true)
  const [radioLoaidDKHP, setRadioLoaidDKHP] = useState('radioHocMoi')
  const [currenSemester, setCurrentSemester] = useState(getCurrentYearSemester())
  const [courseCode, setCourseCode] = useState('')
  const [classCreditDetail, setClassCreditDetail] = useState([])
  const [classCreditCode, setClassCreditCode] = useState('')
  const [openDialogTeacher, setOpenDialogTeacher] = useState(false)
  const [teachers, setTeachers] = useState([])
  const [openDialogConfirm, setOpenDialogConfirm] = useState(false)
  const [clasCreditCompleteRegistration, setClasCreditCompleteRegistration] = useState([])

  if (!cookies.get('accses_token')) {
    window.location.href = '/login'
  }

  function handleOpenConfirm() {
    setOpenDialogConfirm(true)
  }

  function getCurrentYearSemester() {
    const currentYear = new Date().getFullYear()
    const currentMonth = new Date().getMonth() + 1

    const currentYearSemester =
      currentMonth >= 1 && currentMonth <= 6
        ? `HK2(${currentYear - 1}-${currentYear})`
        : `HK1(${currentYear}-${currentYear + 1})`

    return currentYearSemester
  }

  function handleSelectSemester(semester) {
    setCurrentSemester(semester)
    if (semester !== getCurrentYearSemester()) {
      setOpenDialog(true)
    }
  }

  function handleReset() {
    setCourses([])
    setClassCourse([])
    setCourseCode('')
    setClassCreditCode('')
    setClassCreditDetail([])
  }

  useEffect(() => {
    document.title = 'Đăng ký học phần'
    const fetchData = async () => {
      try {
        const res = await apiInforSv(localStorage.getItem('account_id'))
        if (res.status !== 200) {
          setLoading(true)
          return
        }
        setStudent(res.data.student)
        const resCourse = await getCourseNew(res.data.student[0].account_id, res.data.student[0].major._id)
        if (resCourse.status !== 200) {
          setLoading(true)
          return
        }
        setCourses(resCourse.data.courseNotClean)
        const clasCreditCompleteRegistration = await getClasCreditCompleteRegistration(
          localStorage.getItem('account_id'),
          getCurrentYearSemester()
        )
        if (clasCreditCompleteRegistration.status !== 200) {
          setLoading(true)
          return
        }
        setClasCreditCompleteRegistration(clasCreditCompleteRegistration.data.class)
        setLoading(false)
      } catch (e) {
        setLoading(true)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    handleReset()
    if (currenSemester !== getCurrentYearSemester()) {
      setOpenDialog(true)
      return
    }
    if (radioLoaidDKHP === 'radioHocMoi') {
      const fetchData = async () => {
        try {
          const resCourse = await getCourseNew(localStorage.getItem('account_id'), student[0].major._id)
          if (resCourse.status === 200) {
            setCourses(resCourse.data.courseNotClean)
          }
        } catch (error) {
          return
        }
      }
      fetchData()
    }
    if (radioLoaidDKHP === 'radioHocLai') {
      const fetchData = async () => {
        try {
          const resCourse = await getCourseByStatus(localStorage.getItem('account_id'), 'Học lại')
          if (resCourse.status === 200) {
            setCourses(resCourse.data.courseReCleans)
          }
        } catch (error) {
          return
        }
      }
      fetchData()
    }

    if (radioLoaidDKHP === 'radioHocCaiThien') {
      const fetchData = async () => {
        try {
          const resCourse = await getCourseByStatus(localStorage.getItem('account_id'), 'Hoàn thành')
          if (resCourse.status === 200) {
            setCourses(resCourse.data.courseReCleans)
          }
        } catch (error) {
          return
        }
      }
      fetchData()
    }
  }, [student, radioLoaidDKHP, currenSemester])

  useEffect(() => {
    setClassCreditCode('')
    setClassCourse([])
    setClassCreditDetail([])
    const fetchDataClasCourse = async () => {
      try {
        const resclassCredit = await getClasCreditCourseCode(courseCode)
        if (resclassCredit.status === 200) {
          setClassCourse(resclassCredit.data.classCredit)
        }
      } catch (error) {
        return
      }
    }
    fetchDataClasCourse()
  }, [courseCode])

  useEffect(() => {
    const fetchDataClasCourse = async () => {
      try {
        const resclassCreditDetails = await getClassCreditDetailsByClassCode(classCreditCode)
        if (resclassCreditDetails.status === 200 && resclassCreditDetails.data.message !== 'ERR_404') {
          setClassCreditDetail(resclassCreditDetails.data.class)
        }
      } catch (error) {
        return
      }
    }
    fetchDataClasCourse()
  }, [classCreditCode])

  const enrollmentYear = 2020
  const currentYear = new Date().getFullYear()
  const semesters = []

  for (let year = enrollmentYear; year <= currentYear; year++) {
    semesters.push(`HK1(${year}-${year + 1})`)
    semesters.push(`HK2(${year}-${year + 1})`)
  }
  const handleCloseConfirm = () => {
    setOpenDialogConfirm(false)
  }
  const handleClose = () => {
    setOpenDialog(false)
  }

  const handleCloseDialogTeacher = () => {
    setOpenDialogTeacher(false)
  }

  function handleOpenDialogTeacher(id) {
    const teacher = classCreditDetail.find((teacher) => teacher.classDetails.teachers._id === id)
    setTeachers(teacher.classDetails.teachers)
    setOpenDialogTeacher(true)
  }

  function handleRegisterClassCredit() {
    var group = document.getElementById('group')

    const data = {
      account_id: localStorage.getItem('account_id'),
      classCreditCode: classCreditCode,
      group: group.value
    }
    const fetchData = async () => {
      try {
        const res = await registerClassCredit(data)
        if (res.status === 200) {
          toast.success(res.data.message)
          window.location.reload()
        } else {
          toast.error(res.data.message)
        }
      } catch (error) {
        return
      }
    }
    fetchData()
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
      <Toaster toastOptions={{ duration: 2200 }} />
      <div className='grid gap-2 shadow shadow-gray-500 rounded-md p-4'>
        <div className='flex justify-start items-center font-bold text-lg border-b-2'>
          <span>Đăng ký học phần</span>
        </div>
        <Dialog
          open={openDialogConfirm}
          onClose={handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              Vui lòng xác nhận bạn chắc chắn đăng ký môn học này.
            </DialogContentText>
            <DialogContentText className='flex justify-center items-center text-red-500' id='alert-dialog-description'>
              <span>(Học phần sẽ không được hủy sau khi đã đăng ký)</span>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleRegisterClassCredit}>OK</Button>
            <Button onClick={handleCloseConfirm}>Cancel</Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={openDialog}
          onClose={handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>Đợt này sinh viên không được đăng ký</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>OK</Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={openDialogTeacher}
          onClose={handleCloseDialogTeacher}
          aria-labelledby='alert-dialog-title-teacher'
          aria-describedby='alert-dialog-description-teacher'
        >
          <DialogContent>
            <DialogContentText id='alert-dialog-description-teacher'>
              {'Tên giảng viên: ' + teachers.userName}
            </DialogContentText>
            <DialogContentText id='alert-dialog-description-teacher'>{'Email: ' + teachers.email}</DialogContentText>
            <DialogContentText id='alert-dialog-description-teacher'>
              {'Ngày sinh: ' + teachers.dateOfBirth}
            </DialogContentText>
            <DialogContentText id='alert-dialog-description-teacher'>
              {'Giới tính: ' + teachers.gender}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialogTeacher}>OK</Button>
          </DialogActions>
        </Dialog>
        <div className='flex gap-8 justify-center items-center'>
          <div className='h-fit flex justify-end gap-2'>
            <div className='font-bold text-black text-base flex items-center'>
              <span>Đợt đăng ký</span>
            </div>
            <select
              name=''
              id=''
              className='h-9 text-sm rounded-lg'
              onChange={(e) => {
                handleSelectSemester(e.target.value)
              }}
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
          <div className='flex items-center justify-center gap-2'>
            {radioLoaidDKHP === 'radioHocMoi' ? (
              <input
                className='cursor-pointer'
                name='rdoLoaiDangKyHocPhan'
                id='radioHocMoi'
                type='radio'
                checked
                onChange={() => {
                  setRadioLoaidDKHP('radioHocMoi')
                  handleReset()
                }}
              />
            ) : (
              <input
                className='cursor-pointer'
                name='rdoLoaiDangKyHocPhan'
                type='radio'
                onChange={() => {
                  setRadioLoaidDKHP('radioHocMoi')
                  handleReset()
                }}
              />
            )}
            <label htmlFor='radioHocMoi'>Học mới</label>
          </div>
          <div className='flex items-center justify-center gap-2'>
            {radioLoaidDKHP === 'rdoLoaiDangKyHocPhan' ? (
              <input
                className='cursor-pointer'
                name='rdoLoaiDangKyHocPhan'
                id='radioHocLai'
                type='radio'
                checked
                onChange={() => {
                  setRadioLoaidDKHP('radioHocLai')
                  handleReset()
                }}
              />
            ) : (
              <input
                className='cursor-pointer'
                name='rdoLoaiDangKyHocPhan'
                type='radio'
                onChange={() => {
                  setRadioLoaidDKHP('radioHocLai')
                  handleReset()
                }}
              />
            )}
            <label htmlFor='radioHocLai'>Học lại</label>
          </div>
          <div className='flex items-center justify-center gap-2'>
            {radioLoaidDKHP === 'radioHocCaiThien' ? (
              <input
                className='cursor-pointer'
                name='rdoLoaiDangKyHocPhan'
                id='radioHocCaiThien'
                type='radio'
                checked
                onChange={() => {
                  setRadioLoaidDKHP('radioHocCaiThien')
                  handleReset()
                }}
              />
            ) : (
              <input
                className='cursor-pointer'
                name='rdoLoaiDangKyHocPhan'
                type='radio'
                onChange={() => {
                  setRadioLoaidDKHP('radioHocCaiThien')
                  handleReset()
                }}
              />
            )}
            <label htmlFor='radioHocCaiThien'>Học cải thiện</label>
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
              <td className='w-14'>STT</td>
              <td className='w-28'>Mã học phần</td>
              <td className='w-96'>Tên môn học/học phần</td>
              <td className='w-14'>TC</td>
              <td className='w-28'>Bắt buộc</td>
              <td className='w-2/6'>
                học phần: học trước (a),
                <br />
                tiên quyết (b), <br />
                song hành (c)
              </td>
            </thead>
            <tbody className='text-color-cuorse text-base'>
              {courses.map((course, index) => (
                <tr key={index}>
                  <td className='cursor-pointer'>
                    {courseCode === course.courseCode ? (
                      <input type='radio' name='courseCode' className='cursor-pointer' checked />
                    ) : (
                      <input
                        type='radio'
                        name='courseCode'
                        className='cursor-pointer'
                        onChange={() => {
                          setCourseCode(course.courseCode)
                        }}
                      />
                    )}
                  </td>
                  <td>{index + 1}</td>
                  <td>{course.courseCode}</td>
                  <td className='text-left pl-4'>{course.courseName}</td>
                  <td>{course.courseCredit}</td>
                  <td>
                    {course.elective ? (
                      <div className='flex justify-center items-center text-red-500 text-xl'>
                        <IoCloseCircleSharp />
                      </div>
                    ) : (
                      <div className='flex justify-center items-center text-xl'>
                        <input
                          className='w-4 h-4 text-orange-500 rounded-full'
                          type='checkbox'
                          checked
                          disabled
                          name=''
                          id=''
                        />
                      </div>
                    )}
                  </td>
                  <td>
                    {course.prerequisites.map((prerequisite, index) =>
                      index !== course.prerequisites.length - 1 ? prerequisite + '(a), ' : prerequisite + '(a)'
                    )}
                  </td>
                </tr>
              ))}
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
                <td className='w-14'>STT</td>
                <td className='w-28'>Mã LHP</td>
                <td className='w-60 '>Tên lớp học phần</td>
                <td className='w-60'>Lớp dự kiến</td>
                <td className='w-28'>Sĩ số tối đa</td>
                <td className='w-28'>Đã đăng ký</td>
                <td className='w-60'>Trạng thái</td>
              </thead>
              <tbody className='text-base'>
                {classCourse.length === 0 && (
                  <tr>
                    <td colSpan='8' className='text-center'>
                      Không có lớp học phần cho môn học này
                    </td>
                  </tr>
                )}
                {classCourse.map((classCourse, index) => (
                  <tr key={index}>
                    <td className='cursor-pointer'>
                      <input
                        type='radio'
                        name='classCredit'
                        className='cursor-pointer'
                        onChange={() => {
                          setClassCreditCode(classCourse.classCode)
                        }}
                      />
                    </td>
                    <td>{index + 1}</td>
                    <td>{classCourse.classCode}</td>
                    <td>{classCourse.className}</td>
                    <td>{classCourse.expectedClass + ' - ' + classCourse.classCode}</td>
                    <td>{classCourse.maxStudents}</td>
                    <td>{classCourse.currentStudents.length}</td>
                    <td>Chờ sinh viên đăng ký</td>
                  </tr>
                ))}
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
            <select className='w-40 h-9 text-sm rounded-lg' name='group' id='group'>
              {classCreditDetail && classCreditDetail.length > 0 ? (
                classCreditDetail.map((classCreditDetail, index) => (
                  <option value={classCreditDetail.classDetails.group}>{classCreditDetail.classDetails.group}</option>
                ))
              ) : (
                <option value='1'>1</option>
              )}
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
                <td className='w-14'>STT</td>
                <td className='w-36'>Lịch học</td>
                <td className='w-36'>Nhóm TH</td>
                <td className='w-28'>Phòng</td>
                <td className='w-28'>Dãy nhà</td>
                <td>Cở sở</td>
                <td className='w-60'>Giảng viên</td>
                <td className='w-60'>Thời gian</td>
                <td className='w-28'></td>
              </thead>
              <tbody>
                {classCreditDetail && classCreditDetail.length > 0 ? (
                  classCreditDetail.map((classCreditDetail, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>
                        {classCreditDetail.classDetails.type +
                          ' Thứ ' +
                          classCreditDetail.classDetails.day +
                          ' (' +
                          classCreditDetail.classDetails.lesson +
                          ')'}
                      </td>
                      <td>{classCreditDetail.classDetails.group}</td>
                      <td>{classCreditDetail.classDetails.room}</td>
                      <td>{classCreditDetail.classDetails.house}</td>
                      <td>{classCreditDetail.classDetails.facility}</td>
                      <td>{classCreditDetail.classDetails.teachers.userName}</td>
                      <td>
                        {moment(classCreditDetail.time.startTime).format('DD-MM-YYYY') +
                          ' - ' +
                          moment(classCreditDetail.time.endTime).format('DD-MM-YYYY')}
                      </td>
                      <td className='text-link cursor-pointer'>
                        <button
                          id={classCreditDetail.classDetails.teachers._id}
                          onClick={(e) => handleOpenDialogTeacher(e.target.id)}
                        >
                          Xem
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan='9' className='text-center'>
                      Không có lớp học phần cho môn học này
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className='mt-2'>
              {classCreditCode === '' ? (
                <input
                  className='w-36 p-1 pl-2 pr-2 font-medium cursor-not-allowed bg-yellow-500 text-white'
                  type='button'
                  value='Đăng ký môn học'
                  disabled
                />
              ) : (
                <input
                  className='w-36 p-1 pl-2 pr-2 font-medium cursor-pointer bg-yellow-500 text-white active:bg-yellow-600 hover:bg-yellow-600'
                  type='button'
                  onClick={handleOpenConfirm}
                  value='Đăng ký môn học'
                />
              )}
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
                {clasCreditCompleteRegistration === undefined || clasCreditCompleteRegistration.length === 0 ? (
                  <tr>
                    <td colSpan='9' className='text-center'>
                      Không có lớp học phần nào
                    </td>
                  </tr>
                ) : (
                  clasCreditCompleteRegistration.map((classCredit, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{classCredit.classCode}</td>
                      <td>{classCredit.className}</td>
                      <td>{classCredit.expectedClass}</td>
                      <td>{classCredit.credits}</td>
                      <td>{classCredit.group}</td>
                      <td>{classCredit.courseFee}</td>
                      <td>
                        <input
                          className='w-4 h-4 text-orange-500 rounded-full'
                          type='checkbox'
                          checked
                          disabled
                          name=''
                          id=''
                        />
                      </td>
                      <td>{moment(classCredit.registerDate).format('YYYY-MM-DD')}</td>
                    </tr>
                  ))
                )}

                {/* <tr>
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
                </tr> */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterCourse
