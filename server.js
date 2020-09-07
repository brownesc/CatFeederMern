const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const mongoose = require('mongoose');
const Data = require('./dataModel');
const cors = require('cors');
/**
 * MONGO PORTION
 */
// async function save() {
//     let Tim = new Data({date: new Date('01-26-1992'),isFedOnce: true})

//     Tim.save()
//     .then((student)=> console.log(`Added ${student.date}`))
//     .then(db.close());

// }

// save();


const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = process.env.PORT || 3001

if (process.end.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
}

//Update for heroku
const mongoConnectionSRV = "mongodb+srv://brownesc:brownesc@cluster0.rls06.mongodb.net/<dbname>?retryWrites=true&w=majority";
const options = {useNewUrlParser: true, useUnifiedTopology: true, dbName: 'cat_feeding', };
mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://brownesc:brownesc@cluster0.rls06.mongodb.net/<dbname>?retryWrites=true&w=majority", options)
        .then(()=> console.log("Connected to MongoDB"))
        .catch((err)=> console.log(`Error connecting to MongoDB ${err}`));




app.get('/', (req, res) => {
    // res.send({hi:'yes','yo':'eys',abd:true})
  })

app.post('/',(req,res)=>{
  handleDateChange(req, res);

})

app.post('/submit',(req,res)=>{
  handleSubmit(req,res);
})

app.listen(port, ()=>{
    console.log(`listening on ${port}`)
})


/**
 * FUnction for the get method;
 * @param {*} req 
 * @param {*} res 
 * @param {*} givenDate 
 */
async function handleDateChange(req,res){
  let givenDate = req.body.date
  console.log(givenDate)
  //Try to find data on first Try

  let searchOutput = await Data.find({date: givenDate}); 
  console.log(searchOutput)
  var newest = null;
  if (searchOutput.length===0){
    let entry = Data({date: givenDate});
    await entry.save((err,entry)=>{
      res.send(entry)
    });
  }else{
    res.send(searchOutput[0])
  }

  
}
/**
 * Handle the updates from the submit button
 * @param {*} req 
 * @param {*} res 
 */
async function handleSubmit(req,res){
  let data = req.body;
  let givenDate = req.body.date
  
  //Try to find data on first Try
  await Data.findOne({date: givenDate}, (err, output) => {
    output.isFedOnce = data.isFedOnce
    output.isFedTwice = data.isFedTwice
    // output.firstSubmit = data.firstSubmit
    // output.secondSubmit = data.secondSubmit

    output.save();
  }); 
  res.status(200);
  
  // let searchOutput2 = await Data.find({date: givenDate}); 
  // console.log(searchOutput2)
}



