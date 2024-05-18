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

async function findClassCredirBySemester(account_id, semester) {
  const res = await axios.post(
    'http://localhost:3003/class/findClassCredirBySemester',
    {
      account_id: account_id,
      semester: semester
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

async function getCreditsByAccountID(account_id) {
  const res = await axios.post(
    'http://localhost:3003/student/getCreditsByAccountID',
    {
      account_id: account_id
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

export { apiInforSv, findClassCredirBySemester, getCreditsByAccountID }
