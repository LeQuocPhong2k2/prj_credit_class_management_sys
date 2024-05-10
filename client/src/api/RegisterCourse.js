import axios from 'axios'
import Cookies from 'cookie-universal'

const cookies = Cookies()

async function getCourseNew(account_id, major_id) {
  const res = await axios.post(
    'http://localhost:3003/course/getCourseNew',
    {
      account_id: account_id,
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

async function getCourseByStatus(account_id, status) {
  const res = await axios.post(
    'http://localhost:3003/course/getCourseByStatus',
    {
      account_id: account_id,
      status: status
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

async function getClasCreditCourseCode(course_code) {
  const res = await axios.post(
    'http://localhost:3003/class/getClasCreditCourseCode',
    {
      course_code: course_code
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
export { getCourseNew, getCourseByStatus, getClasCreditCourseCode }
