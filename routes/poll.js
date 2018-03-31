const express = require('express');
const router = express.Router();
var Pusher = require('pusher');


//Initialize Pusher
var pusher = new Pusher({
    appId: '501469',
    key: '7f7fa7d8e65cee73e3d0',
    secret: 'cc483e0291f57c1e11a5',
    cluster: 'ap2',
    encrypted: true
  });
  

router.get('/',(req,res) => {

res.send('POLL');

});


router.post('/post',(req,res) => {

    pusher.trigger('elective-poll', 'elective-vote', {
       points : 1,
       subject : req.body.subject
      });


      return res.json({
          success : true ,
          message : "Thnak You For Voting"
      })
});
module.exports = router;

