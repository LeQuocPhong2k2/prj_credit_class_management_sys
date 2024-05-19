import mongoose from "mongoose";
import Class from "../../app/models/Class.js";

async function autoUpdateClassStatus() {
  const classes = await Class.find();
  const now = new Date();
  for (const c of classes) {
    if (c.status !== "Đã khóa") {
      console.log(c.time.registrationCloseTime);
      if (now > c.time.registrationCloseTime) {
        c.status = "Đã khóa";
        await c.save();
      }
    }
  }
  console.log("Auto update class status success!!!");
}

function startAutoUpdate() {
  setInterval(autoUpdateClassStatus, 3600000);
}

async function connect() {
  try {
    await mongoose.connect("private");
    // startAutoUpdate();
    console.log("Kết nối db thành công!!!");
  } catch (err) {
    console.log("Connect failure!!!");
  }
}

export default { connect };
