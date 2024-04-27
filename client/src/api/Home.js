import axios from 'axios'

async function getInforSv(userCode) {
  const res = await axios.post(
    'http://localhost:3003/student/findStudentByAccountID',
    {
      userCode: userCode
    },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
  return res
}

export default getInforSv
