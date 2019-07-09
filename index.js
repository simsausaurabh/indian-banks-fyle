const express = require('express')
const bodyParser = require('body-parser')
const db = require('./query/index')
const jwt = require('jsonwebtoken')
const config = require('./config/config')
const app = express()

// Default port
const port = 3000

const Pool = require('pg').Pool
const pool = new Pool({
  user: '',
  host: 'localhost',
  database: 'indian_banks',
  password: 'password',
  port: 5432,
})

// Set secret
app.set('Secret', config.secret);

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

// index/home route
app.get('/', (request, response) => {
  response.json(`Bank and Branch details`)
})

const  ProtectedRoutes = express.Router();

app.use('/api', ProtectedRoutes);

ProtectedRoutes.use((req, res, next) =>{
  // check header for the token
  var token = req.headers['access-token'];
  // decode token
  if (token) {
    // verifies secret and checks if the token is expired
    jwt.verify(token, app.get('Secret'), (err, decoded) => {      
      if (err) {
        return res.json({ message: 'invalid token' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });
  } else {
    // if there is no token  
    res.send({ 
        message: 'No token provided.' 
    });
  }
});

/*
* This is a static authentication
* Username - "fyle"
* Password - "fyle"
**/
app.post('/authenticate', (req, res) => {
  if(req.body.username === "fyle") {
      if(req.body.password === "fyle") {
      //if eveything is okey, create token
      const payload = {
          check:  true
        };

      var token = jwt.sign(payload, app.get('Secret'), {
        expiresIn: 7200 // expires in 120 hours / 5 days
      });

      res.json({
        message: 'authentication done',
        token: token
      });
      } else {
        // Password is incorrect
        res.json({message:"Incorrect password!"})
      }
  } else {
    res.json({message:"user doesn't exist!"})
  }
})

// route to get all the banks
ProtectedRoutes.get('/banks', (req, res) => {
  db.getAllBanks(pool, req, res);
})

// route to get bank details using bank name
ProtectedRoutes.get('/banksByName/:name', (req, res) => {
  db.getBankDetailsByName(pool, req, res);
})

// // route to get bank details using bank ifsc code
ProtectedRoutes.get('/banksByIfsc/:ifsc', (req, res) => {
  db.getBankDetailsByIfsc(pool, req, res)
})

// // route to get bank details using bank name and city
ProtectedRoutes.get('/banksByNameAndCity/:name/:city', (req, res) => {
  db.getBankDetailsByNameAndCity(pool, req, res);
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
