import Course from "../app/models/Course.js";

function generateCourseCode(prefix = "42024") {
  let randomDigits = "";
  for (let i = 0; i < 7; i++) {
    randomDigits += Math.floor(Math.random() * 10);
  }

  const courseCode = prefix + randomDigits;

  return courseCode;
}

export default generateCourseCode;
