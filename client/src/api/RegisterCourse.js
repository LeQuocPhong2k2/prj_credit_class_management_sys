import axios from 'axios'
import Cookies from 'cookie-universal'

const cookies = Cookies()

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
async function getAllCourseOfMajor1(major_id) {
  const res = await axios.post(
    'http://localhost:3003/course/getAllCourseOfMajor',
    {
      major_id: major_id
    },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
  return res
}

export { getAllCourseOfMajor, getAllCourseOfMajor1 }
