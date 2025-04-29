// Acquiring modules
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
//const {check, validationResult} = require('express-validator');

// Creating a server and listening the port
const app = express();
app.listen(1212, () => {
    console.log('The server is up and running');
})

// Setting the view engine
app.set('view engine', 'ejs');
// Using body-parser to encode user data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: true}));
app.use(express.static(__dirname + "/public"));

// middleware
app.use(express.json());

// Connecting mysql with nodeJs
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'chiremba_db'
});

connection.connect((err) => {
    if(err) {
        console.log(err);
        
    } else {
        console.log("Database Connected Successfully");
    }
})

// Rendering sign in page with GET request-----------INTRO PAGE
app.get("/login", (req, res) => {
    res.render(__dirname + '/views/login');
 });

 // Rendering sign in page with POST request
 app.post("/login", async (req, res) => {

    // distructuring name fields that we use for passing data
     const { Username, password } = req.body;

     // Hashed password
     let hashedpassword = await bcrypt.hash(password, 8);
    

     connection.query('INSERT INTO chiremba_user_in SET ?', {Username: Username, user_password: hashedpassword}, (err, results) => {
        if(err) {
            console.log(err);
        } else {
            res.render(__dirname + '/views/intro.ejs');
        }

     })
     
  });
 

//app.post("/login", 
    // checking for username
    //check("Username", "Please Enter you Username")
    //check("Username")
    //.trim()
    //.notEmpty()
    //.withMessage('Please enter a valid username')
    //.isLength( {min: 6} ),
    //.isLength({min: 6, max: 12}),

    // checking for password
    //check("password", "Please enter your password")
    //check("password")
    //.trim()
    //.notEmpty('')
    //.withMessage('Please enter a valid password')
    //.isAlphanumeric()
    //.isEmail()
    //.normalizeEmail()
 //(req, res) => {
    // Inserting data to the database and validating it
    //const sql = "INSERT INTO chiremba_sign_in (`user_name`, `user_password`) VALUES (?)"
    //const values = [
      //  req.body.Username,
      //  req.body.password
    //]
    




    //connect.query ('INSERT INTO users SET ?', person, function(err, results) {
        //if (err) {
          //  console.log(err);
       // } else {
            //console.log(results);
       // }//
   // })


    // res.render(__dirname + '/views/login.ejs');
    //res.json(req.body);
    // Handling errors
    //const errors = validationResult(req)
    //if(!errors.isEmpty()) {
      //  return res.status(422).json({errors:errors.array()})
   // }
    //res.status(200).json({msg:'form is validated'})
// });





// Rendering intro page using GET-----------------INTRO PAGE---------------
app.get("/intro", (req, res) => {
    res.render(__dirname + '/views/intro.ejs');
});

// Rendering intro page using POST
app.post("/intro", (req, res) => {
    //distructuring the names for collecting user data
    const { societyAid, causesForTreament} = req.body;

    // Query for inserting user data
    connection.query('INSERT INTO intro_tb SET ?', {society_aid:societyAid, treatment_cause:causesForTreament}, (err, results) => {
        if(err) {
            console.log(err);
        } else {
            res.render(__dirname + '/views/chiremba.ejs');
        }
        
    })
});

// Rendering first sign page using GET method---------------CHIREMBA PAGE-------
app.get("/chiremba", (req, res) => {
    res.render(__dirname + '/views/chiremba.ejs');
});

//posting data to chiremba page using GET method
app.post("/chiremba", (req, res) => {
    // Distructuring input names
    const {name, parentPhoneNumber, userID, userPhoneNumber, userGender} = req.body;
    //Query for inserting data to the database + rendering the chirembaAU page
    connection.query('INSERT INTO chiremba_tb SET ?', {student_name: name, parents_number: parentPhoneNumber, student_id: userID, student_number: userPhoneNumber, gender: userGender}, (err)=>{
        if (err) {
            console.log(err);
        } else {
            res.render(__dirname + '/views/chirembaAU.ejs');
        }
    })
});

// Rendering chirembaAU page--------------------chirembaAU---------------------
app.get("/chirembaAU", (req, res) => {
    res.render(__dirname + '/views/chirembaAU.ejs');
});

// Rendering second sign page
app.post("/chirembaAU", (req, res) => {
    //Distructuring passed user dataS
    const {userDateOfBirth, department, allergies, nationality, maritalStatus} = req.body;

    //Database queries + rendering the submit page
    connection.query('INSERT INTO chirembaau_tb SET ?', {date_of_birth: userDateOfBirth, faculty_or_department: department, allergies: allergies, nationality: nationality, marital_status: maritalStatus}, (err) => {
        if (err) {
            console.log(err);
        } else {
            res.render(__dirname + '/views/submit.ejs');
        }
    })
});

// Rendering second sign page
app.get("/submit", (req, res) => {
    res.render(__dirname + '/views/submit.ejs');
});

app.post("/submit", (req, res) => {
    res.render(__dirname + '/views/intro.ejs');
});

// Rendering reception page
app.get("/reception", (req, res) => {
    res.render(__dirname + '/views/reception.ejs');
});

app.post("/reception", (req, res) => {
   //Distructuring the user's id
    const {BodyTemperature, bloodPressure, BodyWeight, BodyHeight} = req.body;
     // Inserting user data into the database
     connection.query('INSERT INTO reception_tb SET ?', { body_temperature:BodyTemperature, blood_pressure:bloodPressure, body_weight:BodyWeight, body_height: BodyHeight}, (err, results) => {
        if (err){
            console.log(err);
        } else {
            res.render(__dirname + '/views/doctor.ejs');
        }
     })
});

// Rendering reception page
app.get("/doctor", (req, res) => {
    res.render(__dirname + '/views/doctor.ejs');
});

app.post("/doctor", (req, res) => {
    //Distructuring the user's id
     const {doctorsDiagnosis, doctorsMedication, timesTaken, dayOrWeek, daysOfTheWeek, frequencyMeds} = req.body;
      // Inserting user data into the database
      connection.query('INSERT INTO doctor_tb SET ?', { diagnosis: doctorsDiagnosis, medication: doctorsMedication, times_taken: timesTaken, times_per_day_week: dayOrWeek, days_of_week: daysOfTheWeek, med_frequency: frequencyMeds}, (err, results) => {
         if (err){
             console.log(err);
         } else {
            res.render(__dirname + '/views/dispensary.ejs');
         }
      })
 });

// Rendering reception page
app.get("/dispensary", (req, res) => {
    res.render(__dirname + '/views/dispensary.ejs');
});

app.get("/dispensary", (req, res) => {
    connection.query('SELECT * FROM chiremba_tb', (err, results) => {
        if(err) {
            console.log(err);

        } else {

            console.log(results);
            
            res.render(__dirname + '/views/dispensary.ejs', { doctor_tb: results });
            
           
        }
    });
});

// Rendering counselling page
app.get("/counselling", (req, res) => {
    res.render(__dirname + '/views/counselling.ejs');
});

// Rendering reception page
app.post("/counselling", (req, res) => {
    res.render(__dirname + '/views/counselling.ejs');
});


// -----------------------------------------------------------
// Displaying user data in doctor
//------------------------------------------------------------