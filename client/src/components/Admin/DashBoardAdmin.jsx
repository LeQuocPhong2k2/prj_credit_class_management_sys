import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css'
import Toast from 'react-bootstrap/Toast'
import Container from 'react-bootstrap/Container'
import { Row } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'
import Table from 'react-bootstrap/Table'
import Col from 'react-bootstrap/Col'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import Modal from 'react-bootstrap/Modal'
import { checkAccountType } from '../../api/Login'

export default function DashBoardAdmin() {
  const [numClasses, setNumClasses] = useState(1)

  useEffect(() => {
    const fetchAccountType = async () => {
      try {
        const response = await checkAccountType(localStorage.getItem('account_id'))
        if (response.status === 404) {
          window.location.href = '/login'
        } else {
          if (response.data.account_type !== 'admin') {
            window.location.href = '/login'
          }
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchAccountType()
  }, [])

  const addClass = (event) => {
    event.preventDefault()
    setNumClasses(numClasses + 1)
    toast('Thêm lớp học thành công')
  }

  const removeClass = (event) => {
    event.preventDefault()
    if (numClasses > 1) {
      setNumClasses(numClasses - 1)
      toast('Xóa lớp học thành công')
    }
    if (numClasses === 1) {
      toast('Không thể xóa lớp học')
    }
  }
  const classes = [
    {
      _id: {
        $oid: '662938e7d345847e14103704'
      },
      className: 'Kỹ Thuật Lập Trình',
      classCode: '4230002425',
      course: {
        $oid: '60d5ec1ef8b1411d68fe8466'
      },
      maxStudents: 30,
      currentStudents: [
        {
          $oid: '60d5ec1ef8b1411d68fe8490'
        },
        {
          $oid: '66461c23a442d73cd26c2ec9'
        },
        {
          $oid: '66461c23a442d73cd26c2ec9'
        }
      ],
      waitlist: [],
      time: {
        registrationOpenTime: {
          $date: '2025-03-01T00:00:00.000Z'
        },
        registrationCloseTime: {
          $date: '2025-03-31T00:00:00.000Z'
        },
        startTime: {
          $date: '2025-04-01T00:00:00.000Z'
        },
        endTime: {
          $date: '2025-07-01T00:00:00.000Z'
        }
      },
      status: 'Chờ Sinh viên đăng ký',
      classDetails: [
        {
          facility: 'Cơ sở 1 Hồ Chí Minh',
          house: 'A',
          room: 'A.01',
          teacher: {
            $oid: '60d5ec1ef8b1411d68fe8466'
          },
          type: 'TH',
          day: '2',
          lesson: '1-3',
          group: '1'
        },
        {
          facility: 'Cơ sở 1 Hồ Chí Minh',
          house: 'X',
          room: 'X.018',
          teacher: {
            $oid: '60d5ec1ef8b1411d68fe8470'
          },
          type: 'LT',
          day: '4',
          lesson: '7-9'
        }
      ],
      expectedClass: 'DHKTPM16B',
      semester: 'HK2(2023-2024)'
    },
    {
      _id: {
        $oid: '66390a68806ae034c5c17eb2'
      },
      className: 'Nhập môn lập trình',
      classCode: '4230002426',
      course: {
        $oid: '60d5ec1ef8b1411d68fe8465'
      },
      maxStudents: 30,
      currentStudents: [
        {
          $oid: '60d5ec1ef8b1411d68fe8490'
        },
        {
          $oid: '66461c23a442d73cd26c2ec9'
        }
      ],
      waitlist: [],
      time: {
        registrationOpenTime: {
          $date: '2025-03-01T00:00:00.000Z'
        },
        registrationCloseTime: {
          $date: '2025-03-31T00:00:00.000Z'
        },
        startTime: {
          $date: '2025-04-01T00:00:00.000Z'
        },
        endTime: {
          $date: '2025-07-01T00:00:00.000Z'
        }
      },
      status: 'Chờ Sinh viên đăng ký',
      classDetails: [
        {
          facility: 'Cơ sở 1 Hồ Chí Minh',
          house: 'A',
          room: 'A.01',
          teacher: {
            $oid: '60d5ec1ef8b1411d68fe8466'
          },
          type: 'TH',
          day: '2',
          lesson: '1-3',
          group: '2'
        },
        {
          facility: 'Cơ sở 1 Hồ Chí Minh',
          house: 'X',
          room: 'X.018',
          teacher: {
            $oid: '60d5ec1ef8b1411d68fe8466'
          },
          type: 'LT',
          day: '4',
          lesson: '7-9'
        }
      ],
      expectedClass: 'DHKTPM16A',
      semester: 'HK1(2023-2024)'
    }
  ]
  const [show, setShow] = useState(false)
  const [classDetails, setClassDetails] = useState([])

  const handleClose = () => setShow(false)
  const handleShow = (details) => {
    setClassDetails(details)
    setShow(true)
  }
  return (
    <div>
      <Tabs defaultActiveKey='profile' id='uncontrolled-tab-example' className='mb-3'>
        <Tab eventKey='home' title='Home'>
          <Container>
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
                    <Form.Label className=' d-flex'>Chọn môn học</Form.Label>
                    {/* <Form.Control type='email' placeholder='Enter email' /> */}
                    <Form.Select aria-label='Default select example'>
                      <option value='1'>Kỹ Thuật Lập Trình</option>
                      <option value='2'>Nhập môn lập trình</option>
                      <option value='3'>Cấu trúc rời rạc</option>
                      <option value='4'>Tương tác người máy</option>
                      <option value='5'>Thiết Kế Trang Phục</option>
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group className='mb-3' controlId='formBasicEmail'>
                    <Form.Label className=' d-flex'>Lớp danh nghĩa</Form.Label>
                    {/* <Form.Control type='email' placeholder='Enter email' /> */}
                    <Form.Select aria-label='Default select example'>
                      <option value='1'>DHKTPM16A</option>
                      <option value='2'>DHKTPM16B</option>
                      <option value='3'>DHKTPM16C</option>
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group className='mb-3' controlId='formBasicPassword'>
                    <Form.Label className=' d-flex'>Mã lớp</Form.Label>
                    <Form.Control type='text' placeholder='Password' value='12231' disabled />
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group className='mb-3' controlId='formBasicPassword'>
                    <Form.Label className=' d-flex'>Số lượng SV tối đa</Form.Label>
                    <Form.Control type='number' placeholder='max Student' />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group className='mb-3' controlId='formBasicPassword'>
                    <Form.Label className=' d-flex'>Ngày bắt đầu đăng ký</Form.Label>
                    <Form.Control type='datetime-local' placeholder='Select date and time' />
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group className='mb-3' controlId='formBasicPassword'>
                    <Form.Label className=' d-flex'>Ngày kết thúc đăng ký</Form.Label>
                    <Form.Control type='datetime-local' placeholder='Select date and time' />
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group className='mb-3' controlId='formBasicPassword'>
                    <Form.Label className=' d-flex'>Thời gian bắt đầu môn học</Form.Label>
                    <Form.Control type='datetime-local' placeholder='Select date and time' />
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group className='mb-3' controlId='formBasicPassword'>
                    <Form.Label className=' d-flex'>Thời gian kết thúc môn học</Form.Label>
                    <Form.Control type='datetime-local' placeholder='Select date and time' />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className='mb-3' controlId='formBasicPassword'>
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
                  <div style={{ border: '2px solid blue', borderRadius: '5px', padding: '10px', marginTop: '10px' }}>
                    <Row>
                      <Col>
                        <Form.Group className='mb-3' controlId='formBasicPassword'>
                          <Form.Label className=' d-flex'>Cơ sở</Form.Label>
                          <Form.Select aria-label='Default select example'>
                            <option value='Cơ sở 1 Hồ Chí Minh'>Cơ sở 1 Nguyễn Văn Bảo TPHCM</option>
                            <option value='Cơ sở 2 Phạm Văn Chiêu TPHCM'>Cơ sở 2 Phạm Văn Chiêu TPHCM</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>

                      <Col>
                        <Form.Group className='mb-3' controlId='formBasicPassword'>
                          <Form.Label className=' d-flex'>Dãy nhà</Form.Label>
                          <Form.Select aria-label='Default select example'>
                            <option value='A'>A</option>
                            <option value='B'>B</option>
                            <option value='C'>C</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>

                      <Col>
                        <Form.Group className='mb-3' controlId='formBasicPassword'>
                          <Form.Label className=' d-flex'>Phòng</Form.Label>
                          <Form.Select aria-label='Default select example'>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                            <option value='5'>5</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>

                      <Col>
                        <Form.Group className='mb-3' controlId='formBasicPassword'>
                          <Form.Label className=' d-flex'>Giảng viên</Form.Label>
                          {/* <Form.Control type='text' placeholder='Enter teacher' />
                           */}
                          <Form.Select aria-label='Default select example'>
                            <option value='Giảng viên A'>Giảng viên A</option>
                            <option value='Giảng viên B'>Giảng viên B</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <Form.Group className='mb-3' controlId='formBasicPassword'>
                          <Form.Label className=' d-flex'>Type</Form.Label>
                          {/* <Form.Control type='text' placeholder='Enter teacher' />
                           */}
                          <Form.Select aria-label='Default select example'>
                            <option value='TH'>Phòng học Thực Hành</option>
                            <option value='LT'>Phòng học Lý Thuyết</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>

                      <Col>
                        <Form.Group className='mb-3' controlId='formBasicPassword'>
                          <Form.Label className=' d-flex'>Thứ</Form.Label>
                          <Form.Select aria-label='Default select example'>
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
                        <Form.Group className='mb-3' controlId='formBasicPassword'>
                          <Form.Label className=' d-flex'>Tiết học</Form.Label>
                          <Form.Select aria-label='Default select example'>
                            <option value='1-3'>1-3</option>
                            <option value='4-6'>4-6</option>
                            <option value='7-9'>7-9</option>
                            <option value='10-12'>10-12</option>
                            <option value='13-15'>13-15</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>

                      <Col>
                        <Form.Group className='mb-3' controlId='formBasicPassword'>
                          <Form.Label className=' d-flex'>Nhóm thực hành</Form.Label>
                          <Form.Select aria-label='Default select example'>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='C'>3</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>
                  </div>
                ))}
              </Row>

              <Row>
                <Col>
                  <Form.Group className='mb-3' controlId='formBasicPassword'>
                    <Form.Label className=' d-flex'>Học Kỳ</Form.Label>
                    {/* <Form.Control type='text' placeholder='Enter teacher' />
                     */}
                    <Form.Select aria-label='Default select example'>
                      <option value='1'>HK2(2023-2024)</option>
                      <option value='2'>HK1(2024-2025)</option>
                      <option value='3'>HK2(2024-2025)</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Col>
                <Button
                  variant='primary'
                  type='submit'
                  style={{
                    marginRight: '10px'
                  }}
                >
                  Submit
                </Button>

                <Button variant='secondary' type='reset'>
                  Clear
                </Button>
              </Col>
              <br />
            </Form>

            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Class Name</th>
                  <th>Class Code</th>
                  <th>Max Students</th>
                  <th>Current Students</th>
                  <th>Status</th>
                  <th>Expected Class</th>
                  <th>Semester</th>
                  <th>Details</th>
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
                    <td>{classItem.status}</td>
                    <td>{classItem.expectedClass}</td>
                    <td>{classItem.semester}</td>
                    <td>
                      <Button variant='primary' onClick={() => handleShow(classItem.classDetails)}>
                        Show Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

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
        <Tab eventKey='profile' title='Profile'>
          {
            // khởi tạo table hiện thông tin của lớp học }
          }
        </Tab>
      </Tabs>
    </div>
  )
}
