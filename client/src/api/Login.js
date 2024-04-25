import axios from 'axios'
async function login(userCode, password) {
  const res = await axios.post(
    'http://localhost:3003/account/login',
    {
      userCode,
      password,
      accountType: 'student'
    },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
  return res
}

export default login
