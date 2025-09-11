import express from 'express';
import Receipt from './db/Receipt.js';
import User from './db/User.js';

const router = new express.Router()

router.post('/receipts', async (req, res) => {
  try {
    const { userId, receiptId, receiptData } = req.body;
    const existReceipt = await Receipt.findOne({receiptId: receiptId});
    if (existReceipt) {
      return res.status(409).json({error: 'Receipt already exists'})
    }

    const post = await Receipt.create({userId, receiptId, receiptData})
    res.status(200).json(post);
  } catch (e) {
    res.status(500).json({error: e});
  }
})

router.get('/receipts', async (req, res) => {
  try {
    const receipts = await Receipt.find();
    res.status(200).json(receipts);
  } catch (e) {
    res.status(500).json({error: e});
  }
})

router.get('/receipts/:id', async (req, res) => {
  try {
    const receipt = await Receipt.findOne({receiptId: req.params.id});
    if (!receipt) {
      return res.status(404).json({message: 'Receipt not found'});
    }
    res.status(200).json(receipt);
  } catch (e) {
    res.status(500).json({error: e});
  }
})

router.put('/receipts/', async (req, res) => {
  try {
    const { userId, receiptId, receiptData } = req.body;
    const updatedReceipt = await Receipt.findOneAndUpdate(
      {receiptId},
      {userId, receiptData},
      {new: true}
    );
    if (!updatedReceipt) {
      return res.status(404).json({message: 'Receipt not found'});
    }
    res.status(200).json(updatedReceipt);
  } catch (e) {
    res.status(500).json({error: e});
  }
})

router.delete('/receipts/:id', async (req, res) => {
  try {
    const deletedReceipt = await Receipt.findOneAndDelete({receiptId: req.params.id});
    if (!deletedReceipt) {
      return res.status(404).json({message: 'Receipt not found'});
    }
    res.status(200).json({message: 'Receipt deleted successfully'});
  } catch (e) {
    res.status(500).json({error: e});
  }
})

router.get('/receipts/user/:userId', async (req, res) => {
  try {
    const receipts = await Receipt.find({userId: req.params.userId});
    res.status(200).json(receipts);
  } catch (e) {
    res.status(500).json({error: e});
  }
})

router.get('/receipts/check/:id', async (req, res) => {
  try {
    const receipt = await Receipt.findOne({receiptId: req.params.id});
    if (receipt) {
      res.status(200).json({exists: true, receipt: receipt});
    } else {
      res.status(200).json({exists: false});
    }
  } catch (e) {
    res.status(500).json({error: e});
  }
})

router.post('/login', async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: 'id is required' });
    }

    let user = await User.findOne({ id });

    if (user) {
      return res.status(200).json(user);
    }

    user = await User.create({ id, goals: 0, receipts: [] });

    return res.status(201).json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
})

router.post('/credit-user', async (req, res) => {
  try {
    const { userId, goals, receiptData } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    if (!goals || goals <= 0) {
      return res.status(400).json({ error: 'goals must be a positive number' });
    }

    if (!receiptData) {
      return res.status(400).json({ error: 'receiptData is required' });
    }

    // Найти пользователя по ID
    const user = await User.findOne({ id: userId });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Генерируем уникальный ID для чека
    const receiptId = `receipt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Обновляем пользователя: добавляем goals и новый чек в массив receipts
    const updatedUser = await User.findOneAndUpdate(
      { id: userId },
      { 
        $inc: { goals: goals },
        $push: { 
          receipts: {
            receiptId: receiptId,
            receiptData: receiptData
          }
        }
      },
      { new: true }
    );

    res.status(200).json({
      message: 'User updated successfully',
      user: updatedUser
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
})

export default router;
