import mongoose from "mongoose";

const connectDB = () => {
  try {
    mongoose
      .connect(process.env.DB_URL)
      .then(() => console.log("DataBase is Connected"));

    // mongoose.connection
    //   .once("open", () => console.log("DB is connected!!!"))
    //   .on("error", (err) => {
    //     console.log("error from db.on");
    //     console.error(err);
    //   });
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
