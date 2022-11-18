import express from 'express';

import {
  createHotel,
  updateHotel,
  deleteHotel,
  getByIdHotel,
  getHotels,
  getHotelRooms,
  countByCity,
  countByType,
} from '../controllers/locationController.js';

import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

router.post('/', verifyAdmin, createHotel);

router.put('/:id', verifyUser, updateHotel);

router.delete('/:id', verifyAdmin, deleteHotel);

router.get('/find/:id', getByIdHotel);
router.get('/', getHotels);
router.get('/countByCity', countByCity);
router.get('/countByType', countByType);
router.get('/room/:id', getHotelRooms);

export default router;
