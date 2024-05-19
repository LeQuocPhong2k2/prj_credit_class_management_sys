import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { Toaster } from 'react-hot-toast'
import 'react-toastify/dist/ReactToastify.css'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container'
import { Row } from 'react-bootstrap'
import Table from 'react-bootstrap/Table'
import Col from 'react-bootstrap/Col'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import Modal from 'react-bootstrap/Modal'
import { checkAccountType } from '../../api/Login'
import Cookies from 'cookie-universal'
import {
  getAllMajor,
  getAllCourseOfMajor,
  addCourse,
  deleteCourse,
  addUpdateCourse,
  getAllTeacher,
  createClass,
  getAllClass,
  deleteCreditClass,
  confrimWaitList,
  cancelWaitList
} from '../../api/DashBoard'

export default function DashBoardAdmin() {
  const cookies = Cookies()
  const [numClasses, setNumClasses] = useState(1)
  const [currenSemester, setCurrentSemester] = useState()
  const [tab, setTab] = useState('class-credit')
  const [majors, setMajors] = useState([])
  const [majorId, setMajorId] = useState('')
  const [courses, setCourses] = useState([])
  const [classes, setClasses] = useState([])
  const [teachers, setTeachers] = useState([])

  const [frmCourseCode, setFrmCourseCode] = useState('')
  const [frmCredits, setFrmCredits] = useState(0)
  const [frmElective, setFrmElective] = useState('')
  const [frmPrerequisites, setFrmPrerequisites] = useState('')
  const [enventUpdateCourse, setEventUpdateCourse] = useState(false)
  const [fetchData, setFetchData] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  if (!cookies.get('accses_token')) {
    window.location.href = '/login'
  }
  function getCurrentYearSemester() {
    const currentYear = new Date().getFullYear()
    const currentMonth = new Date().getMonth() + 1

    if (currentMonth >= 1 && currentMonth <= 6) {
      return `HK1(${currentYear}-${currentYear + 1})`
    }
    if (currentMonth >= 7 && currentMonth <= 12) {
      return `HK2(${currentYear}-${currentYear + 1})`
    }
  }
  function handleFormateNumber(event) {
    let value = event.target.value

    value = value.replace(/,/g, '')

    const formattedValue = formatNumberWithCommas(value)

    event.target.value = formattedValue
  }

  function handleCanncelWaitList(classCode) {
    const res = cancelWaitList(classCode)
    res.then((res) => {
      if (res.status === 200) {
        setFetchData(!fetchData)
      }
    })
  }
  function handleConfirmWaitList(classCode) {
    const res = confrimWaitList(classCode)
    res.then((res) => {
      if (res.status === 200) {
        setFetchData(!fetchData)
      }
    })
  }

  function formatNumberWithCommas(number) {
    const num = Number(number)
    return num.toLocaleString('en-US')
  }

  function handleDeleteCreditClass(event) {
    setIsLoading(true)
    const res = deleteCreditClass(event.target.value)
    res.then((res) => {
      if (res.status === 200) {
        setFetchData(!fetchData)
        setIsLoading(false)
      }
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllCourseOfMajor(majorId)
        if (res.status === 200) {
          setCourses(res.data.courses)
        }
        const resClass = await getAllClass()
        if (resClass.status === 200) {
          setClasses(resClass.data.classes)
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [fetchData, majorId])

  function handleDeleteCourse(event) {
    setIsLoading(true)
    const res = deleteCourse(event.target.value)
    res.then((res) => {
      if (res.status === 200) {
        setFetchData(!fetchData)
        setIsLoading(false)
        handleCancelUpdateCourse()
      }
    })
  }

  function handleUpdateCourse(event) {
    setEventUpdateCourse(true)
    courses.forEach((course) => {
      if (course.courses.courseCode === event.target.value) {
        setFrmCourseCode(course.courses.courseCode)
        document.getElementById('FrmCourseName').value = course.courses.courseName
        setFrmCredits(course.courses.credits)
        setFrmElective(course.courses.elective)
        let strPrerequisites = ''
        course.courses.prerequisites.map((prerequisite) => {
          strPrerequisites += prerequisite.courseCode + ','
        })
        document.getElementById('FrmPrerequisites').value = strPrerequisites
        document.getElementById('FrmCourseFee').value = course.courses.courseFee
      }
    })
  }
  function handleCancelUpdateCourse() {
    setEventUpdateCourse(false)
    setFrmCourseCode('')
    document.getElementById('FrmCourseName').value = ''
    setFrmCredits(0)
    setFrmElective('')
    setFrmPrerequisites('')
    document.getElementById('FrmPrerequisites').value = ''
    document.getElementById('FrmCourseFee').value = ''
  }

  function checkValidCours() {
    let courseName = document.getElementById('FrmCourseName').value
    let courseFee = document.getElementById('FrmCourseFee').value
    if (courseName === '' || courseFee === '') {
      return false
    }
    return true
  }

  function handleAddCourse() {
    if (!checkValidCours()) {
      toast('Vui lòng nhập đầy đủ thông tin')
      return
    }

    let data = {
      courseCode: frmCourseCode,
      courseName: document.getElementById('FrmCourseName').value,
      credits: frmCredits,
      elective: frmElective,
      prerequisites: frmPrerequisites,
      courseFee: document.getElementById('FrmCourseFee').value,
      major_id: majorId
    }
    if (!enventUpdateCourse) {
      setIsLoading(true)
      const res = addCourse(data)
      res.then((res) => {
        if (res.status === 200) {
          setFetchData(!fetchData)
          handleCancelUpdateCourse()
          setIsLoading(false)
        }
      })
    } else {
      setIsLoading(true)
      const res = addUpdateCourse(data)
      res.then((res) => {
        if (res.status === 200) {
          setFetchData(!fetchData)
          handleCancelUpdateCourse()
          setIsLoading(false)
        }
      })
    }
  }

  function handleAddCreditClass() {
    let classDetails = []
    for (let i = 0; i < numClasses; i++) {
      let typeCheck = document.getElementById(`type-${i}`).value
      let group = document.getElementById(`group-${i}`).value
      if (typeCheck === 'LT') {
        group = ''
      }
      let data = {
        facility: document.getElementById(`facility-${i}`).value,
        house: document.getElementById(`house-${i}`).value,
        room: document.getElementById(`room-${i}`).value,
        teacher: document.getElementById(`teacher-${i}`).value,
        type: document.getElementById(`type-${i}`).value,
        day: document.getElementById(`day-${i}`).value,
        lesson: document.getElementById(`lesson-${i}`).value,
        group: group
      }
      classDetails.push(data)
    }

    let data = {
      majorCredit: document.getElementById('majorCredit').value,
      courseNameCredit: document.getElementById('courseNameCredit').value,
      expectedClass: document.getElementById('expectedClass').value,
      maxStudent: document.getElementById('maxStudent').value,
      registrationOpenTime: document.getElementById('registrationOpenTime').value,
      registrationCloseTime: document.getElementById('registrationCloseTime').value,
      startTime: document.getElementById('startTime').value,
      endTime: document.getElementById('endTime').value,
      semester: document.getElementById('semester').value,
      classDetails: classDetails
    }
    const res = createClass(data)
    res
      .then((res) => {
        if (res.status === 200) {
          toast('Thêm lớp học thành công')
          setFetchData(!fetchData)
        } else {
          toast('Thêm lớp học thất bại')
        }
      })
      .catch((error) => {
        console.error(error)
        toast('Thêm lớp học thất bại')
      })
  }

  useEffect(() => {
    setCurrentSemester(getCurrentYearSemester())
    const fetchAccountType = async () => {
      try {
        const response = await checkAccountType(localStorage.getItem('account_id'))
        if (response.status === 200)
          if (response.data.account_type !== 'admin') {
            window.location.href = '/login'
          }
      } catch (error) {
        console.error(error)
      }
    }
    fetchAccountType()
  }, [])

  useEffect(() => {
    const courses = async () => {
      try {
        const res = await getAllCourseOfMajor(majorId)
        if (res.status === 200) {
          setCourses(res.data.courses)
        }
      } catch (error) {
        console.error(error)
      }
    }
    courses()
  }, [majorId])

  useEffect(() => {
    setCurrentSemester(getCurrentYearSemester())
    const courses = async () => {
      try {
        const res = await getAllMajor()
        if (res.status === 200) {
          setMajors(res.data.majors)
          setMajorId(res.data.majors[0]._id)
        }
        const resTeacher = await getAllTeacher()
        if (resTeacher.status === 200) {
          setTeachers(resTeacher.data.teachers)
        }
      } catch (error) {
        console.error(error)
      }
    }
    courses()
  }, [tab])

  const addClass = (event) => {
    event.preventDefault()
    setNumClasses(numClasses + 1)
  }

  const removeClass = (event) => {
    event.preventDefault()
    if (numClasses > 1) {
      setNumClasses(numClasses - 1)
    }
    if (numClasses === 1) {
    }
  }

  const [show, setShow] = useState(false)
  const [classDetails, setClassDetails] = useState([])

  const handleClose = () => setShow(false)
  const handleShow = (details) => {
    setClassDetails(details)
    setShow(true)
  }

  const enrollmentYear = 2020
  const currentYear = new Date().getFullYear()
  const semesters = []

  for (let year = enrollmentYear; year <= currentYear; year++) {
    semesters.push(`HK1(${year}-${year + 1})`)
    semesters.push(`HK2(${year}-${year + 1})`)
  }

  const handleSelect = (k) => {
    setTab(k)
  }

  return (
    <div className='p-4 bg-white'>
      <Tabs
        onSelect={handleSelect}
        defaultActiveKey='class-credit'
        id='uncontrolled-tab-example'
        className='p-2 bg-white mt-10'
      >
        <Tab eventKey='class-credit' title='Lớp học phần'>
          <Container className='bg-white'>
            <ToastContainer duration={3500} />
            <Row>
              <h3
                style={{
                  marginTop: '5px',
                  textAlign: 'center',
                  fontSize: '30px',
                  fontWeight: 'bold',
                  color: '#007bff'
                }}
              >
                Quản Lý Lớp Học
              </h3>
            </Row>

            <Form>
              <Row>
                <Col>
                  <Form.Group className='mb-3' controlId='formBasicEmail'>
                    <Form.Label className=' d-flex'>Chọn chuyên ngành</Form.Label>
                    {/* <Form.Control type='email' placeholder='Enter email' /> */}
                    <select
                      className='h-10 text-base active:ring-0 focus:ring-0'
                      name='majorCredit'
                      id='majorCredit'
                      onChange={(e) => setMajorId(e.target.value)}
                    >
                      {majors.map((major, index) => (
                        <option key={index} value={major._id}>
                          {major.majorName}
                        </option>
                      ))}
                    </select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className='mb-3' controlId='formBasicEmail'>
                    <Form.Label className=' d-flex'>Chọn môn học</Form.Label>
                    {/* <Form.Control type='email' placeholder='Enter email' /> */}
                    <Form.Select aria-label='Default select example' name='courseNameCredit' id='courseNameCredit'>
                      {courses.map((course, index) => (
                        <option key={index} value={course.courses._id}>
                          {course.courses.courseName}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group className='mb-3' controlId='formBasicEmail'>
                    <Form.Label className=' d-flex'>Lớp danh nghĩa</Form.Label>
                    <Form.Select aria-label='Default select example' name='expectedClass' id='expectedClass'>
                      <option value='DHKTPM16A'>DHKTPM16A</option>
                      <option value='DHKTPM16B'>DHKTPM16B</option>
                      <option value='DHKTPM16C'>DHKTPM16C</option>
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group className='mb-3'>
                    <Form.Label className=' d-flex'>Mã lớp</Form.Label>
                    <Form.Control type='text' placeholder='Password' name='classCode' disabled />
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group className='mb-3'>
                    <Form.Label className=' d-flex'>Số lượng SV tối đa</Form.Label>
                    <Form.Control type='number' required placeholder='max Student' name='maxStudent' id='maxStudent' />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group className='mb-3'>
                    <Form.Label className=' d-flex'>Ngày bắt đầu đăng ký</Form.Label>
                    <Form.Control
                      required
                      type='datetime-local'
                      placeholder='Select date and time'
                      name='registrationOpenTime'
                      id='registrationOpenTime'
                    />
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group className='mb-3'>
                    <Form.Label className=' d-flex'>Ngày kết thúc đăng ký</Form.Label>
                    <Form.Control
                      required
                      type='datetime-local'
                      placeholder='Select date and time'
                      name='registrationCloseTime'
                      id='registrationCloseTime'
                    />
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group className='mb-3'>
                    <Form.Label className=' d-flex'>Thời gian bắt đầu môn học</Form.Label>
                    <Form.Control
                      required
                      type='datetime-local'
                      placeholder='Select date and time'
                      name='startTime'
                      id='startTime'
                    />
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group className='mb-3'>
                    <Form.Label className=' d-flex'>Thời gian kết thúc môn học</Form.Label>
                    <Form.Control
                      required
                      type='datetime-local'
                      placeholder='Select date and time'
                      name='endTime'
                      id='endTime'
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className='mb-3'>
                    <Form.Label className='d-flex' style={{ fontSize: '18px', fontWeight: 'bold', color: '#007bff' }}>
                      Chi tiết lớp học
                      <button
                        onClick={(event) => addClass(event)}
                        style={{
                          marginLeft: '10px',
                          backgroundColor: '#007bff',
                          color: 'white',
                          border: 'none',
                          borderRadius: '5px',
                          padding: '5px 10px',
                          fontSize: '10px'
                        }}
                      >
                        +
                      </button>
                      <button
                        onClick={(event) => removeClass(event)}
                        style={{
                          marginLeft: '10px',
                          backgroundColor: '#dc3545',
                          color: 'white',
                          border: 'none',
                          borderRadius: '5px',
                          padding: '5px 10px',
                          fontSize: '10px'
                        }}
                      >
                        -
                      </button>
                    </Form.Label>
                  </Form.Group>
                </Col>

                {Array.from({ length: numClasses }, (_, index) => (
                  <div
                    key={index}
                    data-index={index}
                    style={{ border: '2px solid blue', borderRadius: '5px', padding: '10px', marginTop: '10px' }}
                  >
                    <Row>
                      <Col>
                        <Form.Group className='mb-3' controlId={`facility-${index}`}>
                          <Form.Label className=' d-flex'>Cơ sở</Form.Label>
                          <Form.Select aria-label='Default select example' name='facility' id={`facility-${index}`}>
                            <option value='Cơ sở 1 Hồ Chí Minh'>Cơ sở 1 Nguyễn Văn Bảo TPHCM</option>
                            <option value='Cơ sở 2 Phạm Văn Chiêu TPHCM'>Cơ sở 2 Phạm Văn Chiêu TPHCM</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>

                      <Col>
                        <Form.Group className='mb-3' controlId={`house-${index}`}>
                          <Form.Label className='d-flex'>Dãy nhà</Form.Label>
                          <Form.Select aria-label='Default select example' name='house' id={`house-${index}`}>
                            <option value='A'>A</option>
                            <option value='B'>B</option>
                            <option value='C'>C</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group className='mb-3' controlId={`room-${index}`}>
                          <Form.Label className='d-flex'>Phòng</Form.Label>
                          <Form.Select aria-label='Default select example' name='room' id={`room-${index}`}>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                            <option value='5'>5</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group className='mb-3' controlId={`teacher-${index}`}>
                          <Form.Label className='d-flex'>Giảng viên</Form.Label>
                          <Form.Select aria-label='Default select example' name='teacher' id={`teacher-${index}`}>
                            {teachers.map((teacher, teacherIndex) => (
                              <option key={teacherIndex} value={teacher._id}>
                                {teacher.userName}
                              </option>
                            ))}
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <Form.Group className='mb-3' controlId={`type-${index}`}>
                          <Form.Label className='d-flex'>Type</Form.Label>
                          <Form.Select aria-label='Default select example' name='type' id={`type-${index}`}>
                            <option value='TH'>Phòng học Thực Hành</option>
                            <option value='LT'>Phòng học Lý Thuyết</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group className='mb-3' controlId={`day-${index}`}>
                          <Form.Label className='d-flex'>Thứ</Form.Label>
                          <Form.Select aria-label='Default select example' name='day' id={`day-${index}`}>
                            <option value='2'>Thứ 2</option>
                            <option value='3'>Thứ 3</option>
                            <option value='4'>Thứ 4</option>
                            <option value='5'>Thứ 5</option>
                            <option value='6'>Thứ 6</option>
                            <option value='7'>Thứ 7</option>
                            <option value='8'>Chủ Nhật</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group className='mb-3' controlId={`lesson-${index}`}>
                          <Form.Label className='d-flex'>Tiết học</Form.Label>
                          <Form.Select aria-label='Default select example' name='lesson' id={`lesson-${index}`}>
                            <option value='1-3'>1-3</option>
                            <option value='4-6'>4-6</option>
                            <option value='7-9'>7-9</option>
                            <option value='10-12'>10-12</option>
                            <option value='13-15'>13-15</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group className='mb-3' controlId={`group-${index}`}>
                          <Form.Label className='d-flex'>Nhóm thực hành</Form.Label>
                          <Form.Select aria-label='Default select example' name='group' id={`group-${index}`}>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>
                  </div>
                ))}
              </Row>

              <Row>
                <Col>
                  <Form.Group className='flex gap-4 pt-4 items-center '>
                    <Form.Label className=' d-flex'>Học Kỳ</Form.Label>
                    <select name='semester' id='semester' className='h-9 text-sm rounded-lg'>
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
                  </Form.Group>
                </Col>
              </Row>

              <Col>
                <Button
                  variant='primary'
                  style={{
                    marginRight: '10px'
                  }}
                  type='submit'
                  onClick={handleAddCreditClass}
                >
                  Submit
                </Button>

                <Button variant='secondary' type='reset'>
                  Clear
                </Button>
              </Col>
              <br />
            </Form>

            <div className='h-96 overflow-y-auto '>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Class Name</th>
                    <th>Class Code</th>
                    <th>Max Students</th>
                    <th>Current Students</th>
                    <th colSpan={3}>Wail list</th>

                    <th>Status</th>
                    <th>Expected Class</th>
                    <th>Semester</th>
                    <th>Details</th>
                    <th colSpan={2}></th>
                  </tr>
                </thead>
                <tbody>
                  {classes.map((classItem, index) => (
                    <tr key={classItem._id.$oid}>
                      <td>{index + 1}</td>
                      <td>{classItem.className}</td>
                      <td>{classItem.classCode}</td>
                      <td>{classItem.maxStudents}</td>
                      <td>{classItem.currentStudents.length}</td>
                      <td>{classItem.waitlist.length}</td>
                      <td>
                        <Button variant='primary' onClick={() => handleCanncelWaitList(classItem.classCode)}>
                          Canncel
                        </Button>
                      </td>
                      <td>
                        <Button variant='primary' onClick={() => handleConfirmWaitList(classItem.classCode)}>
                          Confirm
                        </Button>
                      </td>
                      <td>{classItem.status}</td>
                      <td>{classItem.expectedClass}</td>
                      <td>{classItem.semester}</td>
                      <td>
                        <Button variant='primary' onClick={() => handleShow(classItem.classDetails)}>
                          Show
                        </Button>
                      </td>
                      <td>
                        <Button
                          variant='danger'
                          value={classItem.classCode}
                          onClick={(event) => handleDeleteCreditClass(event)}
                        >
                          Xóa
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Class Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {classDetails.map((detail, index) => (
                  <div key={index}>
                    <p>Facility: {detail.facility}</p>
                    <p>House: {detail.house}</p>
                    <p>Room: {detail.room}</p>
                    <p>Teacher: {detail.teacher.$oid}</p>
                    <p>Type: {detail.type}</p>
                    <p>Day: {detail.day}</p>
                    <p>Lesson: {detail.lesson}</p>
                    <p>Group: {detail.group}</p>
                  </div>
                ))}
              </Modal.Body>
              <Modal.Footer>
                <Button variant='secondary' onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </Container>
        </Tab>

        <Tab eventKey='mon-hoc' title='Môn học'>
          <div className='grid grid-flow-row gap-4'>
            <div className='flex items-center justify-center gap-4 text-link text-base p-2'>
              <span>Quản lý môn học</span>
              <select
                className='h-10 text-base active:ring-0 focus:ring-0'
                name='major'
                id='major'
                onChange={(e) => setMajorId(e.target.value)}
              >
                {majors.map((major, index) => (
                  <option key={index} value={major._id}>
                    {major.majorName}
                  </option>
                ))}
              </select>
            </div>

            <div className='grid grid-flow-col justify-center gap-10'>
              <div className='flex items-center justify-start gap-2'>
                <span>Tên môn học:</span>
                <input id='FrmCourseName' className='h-7 p-2' type='text' />
              </div>
              <div className='flex items-center justify-start gap-2'>
                <span>Mã môn học:</span>
                <input className='h-7 p-2' type='text' disabled value={frmCourseCode ? frmCourseCode : 'auto'} />
              </div>
              <div className='flex items-center justify-start gap-2'>
                <span>Số tín chỉ:</span>
                <select
                  onChange={(e) => setFrmCredits(e.target.value)}
                  className='h-10 text-base outline-0 ring-0 border-0 active:ring-0 focus:ring-0'
                  name=''
                  id=''
                >
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                  <option value='6'>6</option>
                  <option value='7'>7</option>
                  <option value='8'>8</option>
                  <option value='9'>9</option>
                  <option value='10'>10</option>
                </select>
              </div>

              <div className='flex items-center justify-start gap-10'>
                <div className='flex items-center justify-start gap-2'>
                  {frmElective ? (
                    <input onChange={() => setFrmElective('Bắt buộc')} type='radio' name='type-course' checked />
                  ) : (
                    <input onChange={() => setFrmElective('Bắt buộc')} type='radio' name='type-course' />
                  )}
                  <span>Bắt buộc</span>
                </div>
                <div className='flex items-center justify-start gap-2'>
                  {!frmElective ? (
                    <input onChange={() => setFrmElective('Tự chọn')} type='radio' name='type-course' checked />
                  ) : (
                    <input onChange={() => setFrmElective('Tự chọn')} type='radio' name='type-course' />
                  )}
                  <span>Tự chọn</span>
                </div>
              </div>
            </div>

            <div className='grid grid-flow-col justify-center gap-10'>
              <div className='flex items-center justify-start gap-2'>
                <span>Môn tiên quyết:</span>
                <input
                  id='FrmPrerequisites'
                  className='h-7 p-2'
                  type='text'
                  onChange={(e) => setFrmPrerequisites(e.target.value)}
                />
              </div>
              <div className='flex items-center justify-start gap-2'>
                <span>Học phí:</span>
                <input id='FrmCourseFee' className='h-7 p-2' type='text' onChange={(e) => handleFormateNumber(e)} />
              </div>
              <div className='flex items-center justify-center gap-2'>
                <div
                  onClick={handleAddCourse}
                  className='flex items-center justify-start h-7 p-2 text-gray-50 rounded active:bg-blue-400 bg-blue-500 text-center'
                >
                  <input id='btnAddCourse' className='' type='button' value={enventUpdateCourse ? 'Lưu' : 'Thêm mới'} />
                </div>
                <div
                  className={
                    enventUpdateCourse
                      ? 'flex items-center justify-start h-7 p-2 text-gray-50 rounded active:bg-red-400 bg-red-500 text-center'
                      : 'flex items-center justify-start h-7 p-2 text-gray-50 rounded d-none'
                  }
                  onClick={handleCancelUpdateCourse}
                >
                  <input className='' type='button' value='Hủy sửa' />
                </div>
              </div>
            </div>

            <div className='max-h-96 overflow-y-auto'>
              <table className='w-full'>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Tên môn học</th>
                    <th>Mã môn học</th>
                    <th>Số tín chỉ</th>
                    <th>Loại môn học</th>
                    <th>Môn tiên quyết</th>
                    <th>Học phí</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan='8'>
                        <Toaster toastOptions={{ duration: 2200 }} />
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
                      </td>
                    </tr>
                  ) : (
                    courses.map((course, index) => (
                      <tr key={course.courses._id}>
                        <td>{index + 1}</td>
                        <td>{course.courses.courseName}</td>
                        <td>{course.courses.courseCode}</td>
                        <td>{course.courses.credits}</td>
                        {course.courses.elective ? <td>Bắt buộc</td> : <td>Tự chọn</td>}
                        <td>{course.courses.prerequisites.map((prerequisite) => prerequisite.courseCode + ',')}</td>
                        <td>{course.courses.courseFee}</td>
                        <td className='flex gap-2 items-center justify-center'>
                          <Button
                            variant='primary'
                            value={course.courses.courseCode}
                            onClick={(event) => handleUpdateCourse(event)}
                          >
                            Sửa
                          </Button>
                          <Button
                            value={course.courses.courseCode}
                            onClick={(event) => handleDeleteCourse(event)}
                            variant='danger'
                          >
                            Xóa
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </Tab>
      </Tabs>
    </div>
  )
}
