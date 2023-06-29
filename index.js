const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

app.use(require('morgan')('dev'));
app.use(express.urlencoded({extended:true})); // body parser
app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

// users router
const userRouter = require('./userRouter');
app.use('/api', userRouter);

// test log router
const logRouter = require('./logRouter');
app.use('/api', logRouter);



const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
