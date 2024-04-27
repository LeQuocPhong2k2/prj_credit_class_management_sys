import accountRouter from './accounts.js'
import studentRouter from './students.js'
import teacherRouter from './teachers.js'
import departmentRouter from './departments.js'
import majorRouter from './majors.js'
import RegistrationController from './registrations.js'
import CourseController from './courses.js'
import GraduationController from './graduations.js'
import ClassController from './class.js'
function route(app) {
  app.use('/account', accountRouter)
  app.use('/student', studentRouter)
  app.use('/teacher', teacherRouter)
  app.use('/department', departmentRouter)
  app.use('/major', majorRouter)
  app.use('/registration', RegistrationController)
  app.use('/course', CourseController)
  app.use('/graduation', GraduationController)
  app.use('/class', ClassController)
}

export default route
