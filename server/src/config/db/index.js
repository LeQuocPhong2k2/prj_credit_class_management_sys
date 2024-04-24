import mongoose from "mongoose";

async function connect() {
  try {
    await mongoose.connect("mongodb+srv://taicutm:sYvSx1WOBOMVp0U3@taicluster.1ufpd4z.mongodb.net/LopHocTinChi?retryWrites=true&w=majority");
    console.log("Kết nối db thành công!!!");
  } catch (err) {
    console.log("Connect failure!!!");
  }
}

export default { connect };
