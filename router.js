import express from 'express';
import Receipt from './db/Receipt.js';

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

export default router;
