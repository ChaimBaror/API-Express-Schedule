import express from "express";
import userRoute from "./Routes/user.route";
import timetableRoute from "./Routes/timetable";
import { connectMongo } from "./config";

connectMongo()
const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());


app.use('/user', userRoute)
app.use('/api', timetableRoute)
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
})

