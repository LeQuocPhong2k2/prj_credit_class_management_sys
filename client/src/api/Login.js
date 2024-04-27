import axios from 'axios'
async function login(userCode, password, accountType, recaptchaToken) {
  const res = await axios.post(
    'http://localhost:3003/account/login',
    {
      userCode: userCode,
      password: password,
      accountType: accountType,
      recaptchaToken: recaptchaToken
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
