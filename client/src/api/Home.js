import axios from 'axios'
import Cookies from 'cookie-universal'

const cookies = Cookies()

async function apiInforSv(userCode) {
  const res = await axios.post(
    'http://localhost:3003/student/findStudentByAccountID',
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

async function apiInforCourseByStudent(registeredCourses) {
  const res = await axios.post(
    'http://localhost:3003/course/findCoursesByCourseIDs',
    {
      courseIDs: registeredCourses
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

export { apiInforSv, apiInforCourseByStudent }
