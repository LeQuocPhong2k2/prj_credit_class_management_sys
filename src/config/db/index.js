const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect("mongodb://localhost:27017/credit_classroom_management_sys", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected DB to success");
  } catch (error) {
    console.log("Connected DB to failure");
  }
}
module.exports = { connect };
