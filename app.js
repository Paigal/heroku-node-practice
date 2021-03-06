'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()

app.set('port', (process.env.PORT || 5000))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// Process application/json
app.use(bodyParser.json())

// Index route
app.get('/', function (req, res) {
    res.send("Hello world, I seem to be working")
    
})

// for Facebook verification
app.get('/webhook', function (req, res) {
    if (req.query['hub.verify_token'] === process.env.VERIFY_TOKEN) {
      res.send(req.query['hub.challenge']);
   } else {
      res.send('Error, wrong validation token');    
   }
})

// Spin up the server
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
})

app.post('/webhook/', function (req, res) {
    let messaging_events = req.body.entry[0].messaging
    for (let i = 0; i < messaging_events.length; i++) {
        let event = req.body.entry[0].messaging[i]
        let sender = event.sender.id
        if (event.message && event.message.text) {
            let text = event.message.text
            sendTextMessage(sender, "Text received, echo: " + text.substring(0, 200))
        }
    }
    res.sendStatus(200)
})

const token = EAAUhbHLA5tcBANJbmvhA8Hlb58NI4DEHX7rygXMB0sRjpV78pVxBRt6sYxdZAmU2gOEGuVAqM2nmQaChXKY985FjNjWbsYZCCoW1rBuZAbRd3x7cHGAHc9FcX0e8DViYi9oNOINttoGfW0QcdTTDH3lvPL16oAeeLOBpwAPXgZDZD