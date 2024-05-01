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
  if (res.data.student) {
    localStorage.setItem('student', JSON.stringify(res.data.student))
  }

  return res
}

async function apiInforCourseByStudent(registeredCourses) {
  const res = await axios.post(
    'http://localhost:3003/course/findCoursesByCourseIDs',
    {
      courseIDs: registeredCourses
    },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
  return res
}

export { apiInforSv, apiInforCourseByStudent }
