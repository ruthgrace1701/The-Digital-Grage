const express = require("express");
const router = express.Router();
const User = require("../models/User");
const fetchUser = require('../middlewares/fetchUser');
const Item = require("../models/Item");
const Order = require("../models/Order");
const Feedback = require("../models/Feedback");

router.post('/create-feedback', async (req, res) => {
  try {
    const userId = req.body.userId;
    console.log(userId)
    // Find the user's request
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    

    console.log(req.body)
    const {month,rating,message} = req.body;

    const feedback = new Feedback({
        month,
        rating,
        message,
        user:userId
    })

    await feedback.save();

    return res.status(200).json({ success: true, feedback:feedback});

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});
router.get('/get-feedbacks', async (req, res) => {
  try {
    // const userId = req.body.userId;
    // console.log(userId)
    // // Find the user's request
    // const user = await User.findOne({ _id: userId });

    // if (!user) {
    //   return res.status(404).json({ success: false, error: 'User not found' });
    // }

    const feedbacks = await Feedback.find()
      .populate({
        path: 'user',
        model: 'user',
      });

    return res.status(200).json({ success: true, feedbacks:feedbacks});

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});




module.exports = router;
