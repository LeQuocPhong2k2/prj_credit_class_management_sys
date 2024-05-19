import axios from 'axios'
import Cookies from 'cookie-universal'

const cookies = Cookies()

async function apiInforAdmin(userCode) {
  const res = await axios.post(
    'http://localhost:3003/admin/getInfoAdmin',
    {
      account_id: userCode
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + cookies.get('accses_token')
      }
    }
  )
  return res
}
async function getAllMajor() {
  const res = await axios.post('http://localhost:3003/major/getAllMajor', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + cookies.get('accses_token')
    }
  })
  return res
}
async function getAllCourseOfMajor(major_id) {
  const res = await axios.post(
    'http://localhost:3003/course/getAllCourseOfMajor',
    {
      major_id: major_id
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + cookies.get('accses_token')
      }
    }
  )
  return res
}

async function addCourse(data) {
  console.log('data', data)
  const res = await axios.post(
    'http://localhost:3003/course/addCourse',
    {
      courseCode: data.courseCode,
      courseName: data.courseName,
      credits: data.credits,
      elective: data.elective,
      prerequisites: data.prerequisites,
      major_id: data.major_id,
      courseFee: data.courseFee
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + cookies.get('accses_token')
      }
    }
  )
  return res
}

async function createClass(data) {
  console.log('data', data)
  const res = await axios.post(
    'http://localhost:3003/class/createClass',
    {
      majorCredit: data.majorCredit,
      courseNameCredit: data.courseNameCredit,
      expectedClass: data.expectedClass,
      maxStudent: data.maxStudent,
      registrationOpenTime: data.registrationOpenTime,
      registrationCloseTime: data.registrationCloseTime,
      startTime: data.startTime,
      endTime: data.endTime,
      classDetails: data.classDetails,
      semester: data.semester
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + cookies.get('accses_token')
      }
    }
  )
  return res
}

async function addUpdateCourse(data) {
  console.log('data', data)
  const res = await axios.post(
    'http://localhost:3003/course/addUpdateCourse',
    {
      courseCode: data.courseCode,
      courseName: data.courseName,
      credits: data.credits,
      elective: data.elective,
      prerequisites: data.prerequisites,
      major_id: data.major_id,
      courseFee: data.courseFee
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + cookies.get('accses_token')
      }
    }
  )
  return res
}

async function deleteCourse(courseCode) {
  const res = await axios.post(
    'http://localhost:3003/course/deleteCourse',
    {
      courseCode: courseCode
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + cookies.get('accses_token')
      }
    }
  )
  return res
}
async function deleteCreditClass(classCode) {
  const res = await axios.post(
    'http://localhost:3003/class/deleteClass',
    {
      classCode: classCode
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + cookies.get('accses_token')
      }
    }
  )
  return res
}
async function getAllTeacher() {
  const res = await axios.post('http://localhost:3003/teacher/getAllTeacher', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + cookies.get('accses_token')
    }
  })
  return res
}
async function getAllClass() {
  const res = await axios.post('http://localhost:3003/class/getAllClass', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + cookies.get('accses_token')
    }
  })
  return res
}
//cancelWaitList
async function cancelWaitList(classCode) {
  const res = await axios.post(
    'http://localhost:3003/class/cancelWaitList',
    {
      classCode: classCode
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + cookies.get('accses_token')
      }
    }
  )
  return res
}

//confrimWaitList
async function confrimWaitList(classCode) {
  const res = await axios.post(
    'http://localhost:3003/class/confrimWaitList',
    {
      classCode: classCode
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + cookies.get('accses_token')
      }
    }
  )
  return res
}

export {
  apiInforAdmin,
  getAllMajor,
  getAllCourseOfMajor,
  addCourse,
  deleteCourse,
  addUpdateCourse,
  getAllTeacher,
  createClass,
  getAllClass,
  deleteCreditClass,
  cancelWaitList,
  confrimWaitList
}
