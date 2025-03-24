// Acquiring modules
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const ejs = require('ejs');
//const {check, validationResult} = require('express-validator');


// Creating a server and listening the port
const app = express();
app.listen(1212, () => {
    console.log('The server is up and running');
})



// Using body-parser to encode user data
//app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: true}));
app.use(express.static(__dirname + "/public"));


//const urlencodedParser = bodyParser.urlencoded({extended: false});

// Rendering EJS files

// middleware
app.use(express.json());



// Connecting mysql with nodeJs
const connect = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'chiremba_db'
});


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
    

     connect.query('INSERT INTO chiremba_user_in SET ?', {Username: Username, user_password: hashedpassword}, (err, results) => {
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
    connect.query('INSERT INTO intro_tb SET ?', {society_aid:societyAid, treatment_cause:causesForTreament}, (err, results) => {
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
    const {name, userAge, parentPhoneNumber, userID, userPhoneNumber, userGender} = req.body;
    //Query for inserting data to the database + rendering the chirembaAU page
    connect.query('INSERT INTO chiremba_tb SET ?', {student_name: name, age: userAge, parents_number: parentPhoneNumber, student_id: userID, student_number: userPhoneNumber, gender: userGender}, (err)=>{
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
    connect.query('INSERT INTO chirembaau_tb SET ?', {date_of_birth: userDateOfBirth, faculty_or_department: department, allergies: allergies, nationality: nationality, marital_status: maritalStatus}, (err) => {
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



// Rendering intro page using GET-----------------INTRO PAGE---------------
app.get("/admin", (req, res) => {
    res.render(__dirname + '/views/admin.ejs');
});











app.set('view engine', 'ejs');