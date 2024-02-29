const { MongoClient } = require("mongodb");
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const URL = "mongodb://localhost:27017";

const client = new MongoClient(URL);
let mobileNumbers;
const app = express();
const port = 3000;

// Use cors middleware to enable CORS
app.use(cors());

// Use body-parser middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));





// To handle CORS
// Cross Origin Resource Sharing
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin",
        "http://localhost:4200");

    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-with, Content-Type, Accept");

    next();
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get('/userList', userListFunc);
function userListFunc(req, res) {
    res.send(mobileNumbers);
}
app.post('/createUserDetails', async (req, res) => {
    const dataFromBody = req.body;
    console.log('Received data on the server:', dataFromBody);
    let client = await GetConnection();
    const user = await client.findOne({ 'mobileNo': parseInt(dataFromBody.mobileNo) });
    if (user == null) {
        InsertData(dataFromBody);
        console.log("in user == null ");
        res.json({ message: 'Data received successfully on the server' });
    }
    else {
        console.log("in else ");

        res.json('Already registered');
    }
});

app.post('/login', async (req, res) => {
    const loginData = req.body;
    console.log(loginData.mobileNo);
    console.log(loginData.password);


    let client = await GetConnection();
    const user = await client.findOne({ 'mobileNo': parseInt(loginData.mobileNo) })
    console.log(user);
    if (user == null) {
        console.log("No Account");
        return res.json({ message: 'No Account on this number' });
    }
    else {

        if (loginData.password == user.password) {
            console.log("Credentials matched");
            return res.json({ message: 'Credential Matched' });
        }
        else {
            console.log("password not matched");
            return res.json({ message: 'Invalid Mobile no or password' });
        }
    }
});

app.post('/details', async (req, res) => {
    const detailByMobileNumber = req.body.mobileNo;
    console.log("data came successfully from details to server", detailByMobileNumber);
    let client = await GetConnection();
    const user = await client.findOne({ 'mobileNo': parseInt(detailByMobileNumber) });
    console.log(user);
    return res.json(user);
})
async function GetConnection() {
    let result = await client.connect();
    let db = result.db("UserDetails");

    return db.collection("User");
}
async function InsertData(data1) {
    let data = await GetConnection();
    let result = await data.insertOne(data1);
    if (result.acknowledged) {
        console.log("Data gets updated successfully");
    }
}
async function ReadData() {
    let data = await GetConnection();
    data = await data.find().toArray();
    console.log(data);

}
async function main() {
    let ret = GetConnection();
    let ret2 = GetConnectionForDetails
    console.log("Both Database connected");
    ReadData1()

}
main();


async function GetConnectionForDetails() {
    let result = await client.connect();
    let db = result.db("MilkDetails");

    return db.collection("details");
}

async function ReadData1() {
    let data = await GetConnectionForDetails();
    data = await data.find().toArray();
    console.log(data);
}

app.post('/createMilkdetails', async (req, res) => {
    const data = req.body;
    console.log("data came successfully from details to server", data);
    let client = await GetConnectionForDetails();
    let result = await client.insertOne(data);
    if (result.acknowledged) {
        console.log("Data gets updated successfully");
    }
})

app.post('/fetchMilkdetails', async (req, res) => {
    const data = req.body;
    console.log("data came successfully from details to server", data);

    try {
        let client = await GetConnectionForDetails();
        const results = await client.find({ 'mobileNo': parseInt(data.mobileNo) }).toArray();

        console.log('Result : ', results);


        return res.json(results);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

