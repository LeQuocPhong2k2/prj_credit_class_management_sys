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

async function findAccountByID(account_id) {
  const res = await axios.post(
    'http://localhost:3003/account/findAccountByID',
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

export { login, checkAccountType, findAccountByID }
