const express = require('express');
const router = express.Router();

const User = require('../models/user.js');


// router logic will go here - will be built later on in the lab

router.get('/', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      res.render('foods/index.ejs', {
        foods: currentUser.foods,
      });
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  });
router.get('/new', (req, res) => {
    res.render('foods/new.ejs')

})



router.post('/', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      currentUser.foods.push(req.body);
      await currentUser.save();
      res.redirect(`/users/${currentUser._id}/foods`);
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  });

  router.get('/:applicationId', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      const food = currentUser.foods.id(req.params.foodId);
      res.render('foods/show.ejs', {
        food: food,
      });
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  });


  
module.exports = router;

