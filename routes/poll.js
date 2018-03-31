const express = require('express');
const router = express.Router();
var Pusher = require('pusher');
const mongoose = require('mongoose');
const Vote = require('../models/Vote');

//Initialize Pusher
var pusher = new Pusher({
    appId: '501469',
    key: '7f7fa7d8e65cee73e3d0',
    secret: 'cc483e0291f57c1e11a5',
    cluster: 'ap2',
    encrypted: true
  });
  

router.get('/',(req,res) => {

Vote.find().then( votes => {
 res.json({
     success : true,
     votes : votes
 })
});

});


router.post('/',(req,res) => {

    newVote = {
        subject : req.body.subject,
        points : 1
    }

    new Vote(newVote).save().then( vote => {
        pusher.trigger('elective-poll', 'elective-vote', {
            points : vote.points,
            subject : vote.subject
           });
     
     
           return res.json({
               success : true ,
               message : "Thank You For Voting"
           })
    })
   
});
module.exports = router;

