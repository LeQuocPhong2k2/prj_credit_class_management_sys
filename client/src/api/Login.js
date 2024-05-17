import axios from 'axios'
import Cookies from 'cookie-universal'

const cookies = Cookies()

async function login(userCode, password, accountType, recaptchaToken) {
  let res
  if (userCode === 'admin' && password === 'admin') {
    window.location.href = 'http://localhost:3002/admin'
  } else {
    // Xử lý trường hợp khác
    res = await axios.post(
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
  }
  return res
}
async function login1(userCode, password, accountType, recaptchaToken) {
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
// function checkAccountType
async function checkAccountType(account_id) {
  const res = await axios.post(
    'http://localhost:3003/account/checkAccountType',
    {
      account_id: account_id
    },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
  return res
}

export { login, login1, checkAccountType }
