import axios from 'axios'
async function apiInforSv(userCode) {
  const res = await axios.post(
    'http://localhost:3003/student/findStudentByAccountID',
    {
      account_id: userCode
    },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )

  return res
}

export default apiInforSv
