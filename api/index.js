const CronJob = require('cron').CronJob
const CronTime = require('cron').CronTime
const bodyParser = require('body-parser')
const express = require('express')
const moment = require('moment')
const fs = require('fs')

const app = express()
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({extended: true})); 

const crontab = new CronJob('*/1 * * * * *', function() {
  fs.appendFile('TIME.txt', `${moment().format('HH:mm:ss')}\n`, function (err) {
    if (err) throw err;
  });
}, null, false)

crontab.start()

app.post('/setCronTime', (req, res) => {
  const cronTime = req.body.cronTime
  crontab.setTime(new CronTime(cronTime))
  crontab.start()
  res.send({ message: `Update CronTime Success!`})
})

app.listen(3000, () => {
  console.log('Start server at port 3000.')
})