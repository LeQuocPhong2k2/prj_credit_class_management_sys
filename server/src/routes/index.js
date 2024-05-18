import accountRouter from "./accounts.js";
import studentRouter from "./students.js";
import teacherRouter from "./teachers.js";
import departmentRouter from "./departments.js";
import majorRouter from "./majors.js";
import CourseController from "./courses.js";
import ClassController from "./class.js";
import AdminController from "./admin.js";
function route(app) {
  app.use("/account", accountRouter);
  app.use("/student", studentRouter);
  app.use("/teacher", teacherRouter);
  app.use("/department", departmentRouter);
  app.use("/major", majorRouter);
  app.use("/course", CourseController);
  app.use("/class", ClassController);
  app.use("/admin", AdminController);
}

export default route;
