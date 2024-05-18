import axios from 'axios'
import Cookies from 'cookie-universal'

const cookies = Cookies()

async function apiInforAdmin(userCode) {
  const res = await axios.post(
    'http://localhost:3003/admin/getInfoAdmin',
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
export { apiInforAdmin }
