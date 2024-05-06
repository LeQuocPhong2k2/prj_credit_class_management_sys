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

async function apiClass(classID) {
  const res = await axios.post(
    'http://localhost:3003/class/findClassByClassID',
    {
      classID: classID
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

export { apiInforSv, apiClass }
