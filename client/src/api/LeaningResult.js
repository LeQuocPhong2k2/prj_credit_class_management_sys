import axios from 'axios'
import Cookies from 'cookie-universal'

const cookies = Cookies()

async function getLearningResult(account_id) {
  const res = await axios.post(
    'http://localhost:3003/student/getLearningResult',
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

export { getLearningResult }
