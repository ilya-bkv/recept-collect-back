import express from 'express';
import Receipt from './db/Receipt.js';
import User from './db/User.js';

const router = new express.Router()

router.post('/receipts', async (req, res) => {
  try {
    const { userId, receiptData } = req.body;
    if (!userId || !receiptData) {
      return res.status(400).json({ error: 'userId and receiptData are required' });
    }

    const receiptId = receiptData && receiptData.receiptId;
    if (!receiptId) {
      return res.status(400).json({ error: 'receiptData.receiptId is required' });
    }

    const existReceipt = await Receipt.findOne({ receiptId });
    if (existReceipt) {
      return res.status(409).json({ error: 'Receipt already exists' });
    }

    const createdReceipt = await Receipt.create({ userId, receiptId, receiptData });
    res.status(201).json({ exists: false, receipt: createdReceipt });
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
    if (!receiptId) {
      return res.status(400).json({ error: 'receiptId is required' });
    }
    const updatedReceipt = await Receipt.findOneAndUpdate(
      { receiptId },
      { userId, receiptData },
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
    const { userId, goals, receiptId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    if (!goals || goals <= 0) {
      return res.status(400).json({ error: 'goals must be a positive number' });
    }

    if (!receiptId) {
      return res.status(400).json({ error: 'receiptId is required' });
    }

    const user = await User.findOne({ id: userId });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Обновляем пользователя: добавляем goals и ID чека в массив receipts
    const updatedUser = await User.findOneAndUpdate(
      { id: userId },
      {
        $inc: { goals: goals },
        $push: { receipts: receiptId }
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

// Debug: reset a user's goals and receipts
router.post('/debug/reset-user', async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    const updatedUser = await User.findOneAndUpdate(
      { id: userId },
      { $set: { goals: 0, receipts: [] } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({ message: 'User reset successfully', user: updatedUser });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
})

// Debug: clear all receipts from the database
router.post('/debug/receipts/clear', async (req, res) => {
  try {
    const result = await Receipt.deleteMany({});
    return res.status(200).json({ message: 'All receipts cleared', deletedCount: result.deletedCount });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
})

export default router;
