const express = require("express");
const router = express.Router();
const User = require("../models/User");
const fetchUser = require('../middlewares/fetchUser');
const Item = require("../models/Item");
const Order = require("../models/Order");


router.post('/create-order', async (req, res) => {
  try {
    const userId = req.body.userId;
    console.log(userId)
    // Find the user's request
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    

    console.log(req.body)
    const {items} = req.body;

    let ids=[]
    let totalCost=0;
    for(let i=0;i<items.length;i++){
        
        const {name,price,image,rating,address}= items[i];

        totalCost+=price;
        const item = new Item({
            name,price,image,rating,address
        })
        await item.save();
        ids.push(item._id);

    }

    const order = new Order({
        userId,
        items:ids,
        totalCost
    })
    await order.save();

    return res.status(200).json({ success: true, order:order});

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});
router.get('/get-orders', async (req, res) => {
  try {
    // const userId = req.body.userId;
    // console.log(userId)
    // // Find the user's request
    // const user = await User.findOne({ _id: userId });

    // if (!user) {
    //   return res.status(404).json({ success: false, error: 'User not found' });
    // }

    const orders = await Order.find()
      .populate({
        path: 'userId',
        model: 'user',
      })
      .populate({
        path: 'items',
        model: 'Item',
      });

    return res.status(200).json({ success: true, orders:orders});

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

router.post('/get-users-orders', async (req, res) => {
  try {
    const userId = req.body.userId;
    console.log(userId)
    // Find the user's request
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    const orders = await Order.find({userId:userId})
      .populate({
        path: 'userId',
        model: 'user',
      })
      .populate({
        path: 'items',
        model: 'Item',
      });

    return res.status(200).json({ success: true, orders:orders});

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

router.patch('/accept-order', async (req, res) => {
  try {
    // const userId = req.body.userId;
    // console.log(userId)
    // // Find the user's request
    // const user = await User.findOne({ _id: userId });

    // if (!user) {
    //   return res.status(404).json({ success: false, error: 'User not found' });
    // }
   
    const { orderId } = req.body;

    const order = await Order.findByIdAndUpdate(
      orderId,
      { $set: { orderStatus: 'accepted' } },
      { new: true }
    ).populate('userId items');

    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }

    const orders = await Order.find()
    .populate({
      path: 'userId',
      model: 'user',
    })
    .populate({
      path: 'items',
      model: 'Item',
    });

    return res.status(200).json({ success: true,orders:orders });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});


router.delete('/delete-order', async (req, res) => {
  try {
    // const userId = req.body.userId;
    // console.log(userId)
    // // Find the user's request
    // const user = await User.findOne({ _id: userId });

    // if (!user) {
    //   return res.status(404).json({ success: false, error: 'User not found' });
    // }
   
    const { orderId } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }

    // Perform the deletion
    await order.deleteOne({ _id: orderId });

    return res.status(200).json({ success: true, message: 'Order deleted Successfully' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});


module.exports = router;
