const express = require('express');
const jwt = require('jsonwebtoken');
const { findById } = require('../models/userSchema');

const User = require('../models/userSchema');
const { use } = require('../routes/user');
const userSignup = async(req,res) => {
    try{
        console.log(req)
        const newUser = new User({
            phone : req.body.phone,
            email : req.body.email,
            name : req.body.name,
            password : req.body.password,
            user_type : req.body.type,
            count : 0
        })
        // console.log(newUser)
        
        await newUser.save();

        const payload = {
            user: {
              id: newUser.id,
              user_type: newUser.user_type,
            },
          };
      
          // sendEmailVerificationLink(email, user.id);
      
          jwt.sign(
            payload,
            process.env.TOKEN_KEY,
            { expiresIn: '7d' },
            (err, token) => {
              if (err) throw err;
              return res.json({ token });
            },
          );

        // return res.status(200).json(newUser)
    }catch(err){
        console.log(err)
        return res.status(400).send(err);
    }
}

const userSignin = async(req,res) =>{
    try{
        const{email,password} = req.body;
        const query={$and:[{email:email},{password:password}]}
        const user = await User.findOne(query)
        // console.log(user);
        const payload = {
            user: {
              id: user.id,
              user_type: user.user_type,
            },
          };
          jwt.sign(
            payload,
            process.env.TOKEN_KEY,
            { expiresIn: '7d' },
            (err, token) => {
              if (err) throw err;
              return res.json({user, token });
            },
          );
    }catch(err){
        console.log(err)
        return res.status(400).send(err);
    }
}

const addTeacher = async(req,res)=>{
    try{
        const favTeacher = req.body.favTeacher;
        // console.log(req.user)
        const learnerId = req.user.id;
        const learnerUser = await User.findById(learnerId);
        let isNew = 1 , favMentor = learnerUser.favMentor;
        // console.log(favMentor)
        for(let  i = 0 ; i <favMentor.length ; i++){
            if(favMentor[i] === favTeacher){
                isNew = 0;
                break;
            }
        }
        if(isNew === 0){
            res.send("Teacher Already added")
          // learnerUser.favMentor = [];
          // learnerUser.save();
        }
        if(isNew === 1){
          favMentor.push(favTeacher);
          learnerUser.favMentor = favMentor;
          learnerUser.save();

          // console.log(learnerUser)

          const tmpUser = await User.find({name:favTeacher});
          const mentorUser = tmpUser[0];
          mentorUser.count = mentorUser.count+1;
          mentorUser.save();
          // console.log(mentorUser);
          res.json({mentorUser,learnerUser})

        }
        
    }catch(err){
      console.log(err)
      return res.status(400).send(err);
    }
}
const removeTeacher = async(req,res) => {
  try{
    const favTeacher = req.body.favTeacher;
    const learnerId = req.user.id;
    const learnerUser = await User.findById(learnerId);
    let isPresent = 1 , favMentor = learnerUser.favMentor,newMentor=[];
    for(let  i = 0 ; i <favMentor.length ; i++){
        if(favMentor[i] === favTeacher){
            isPresent = 1;
        }
        if(favMentor[i]!=favMentor){
          newMentor.push(favMentor[i])
        }
    }
    if(isPresent === 1){
        res.send("Teacher Not Present")
    }
    if(isPresent === 0){
      learnerUser.favMentor = newMentor;
      learnerUser.save();



      const tmpUser = await User.find({name:favTeacher});
      const mentorUser = tmpUser[0];
      mentorUser.count = mentorUser.count-1;
      mentorUser.save();
      res.json({mentorUser,learnerUser})

    }
   
  }catch(err){
    console.log(err)
    return res.status(400).send(err);
  }
}
const favouriteTeacher = async(req,res)=>{
  try{
    const pipeline=[
      {$match:{"user_type":"mentor"}},
      {$sort:{"count":-1}}
    ]
    const user = await User.aggregate(pipeline);
    const fav = user[0];
    console.log(fav);
    res.send(fav);
    
  }catch(err){
    console.log(err)
    return res.status(400).send(err);
  }
}
module.exports = {userSignup,userSignin,addTeacher,favouriteTeacher,removeTeacher}