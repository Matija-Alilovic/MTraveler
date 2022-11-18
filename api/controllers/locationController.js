import Location from '../models/Location.js';
import Room from '../models/Room.js';

export const createHotel = async (req, res, next) => {
  const newHotel = new Location(req.body);

  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    next(error);
  }
};

export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Location.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (error) {
    next(error);
  }
};

export const deleteHotel = async (req, res, next) => {
  try {
    await Location.findByIdAndDelete(req.params.id);
    res.status(200).json('Hotel is deleted');
  } catch (error) {
    next(error);
  }
};

export const getByIdHotel = async (req, res, next) => {
  try {
    const hotel = await Location.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (error) {
    next(error);
  }
};

export const getHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const hotels = await Location.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max || 999 },
    }).limit(req.query.limit);
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(',');
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Location.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Location.countDocuments({ type: 'hotel' });
    const apartmentCount = await Location.countDocuments({ type: 'apartment' });
    const resortCount = await Location.countDocuments({ type: 'resort' });
    const villaCount = await Location.countDocuments({ type: 'villa' });
    const cabinCount = await Location.countDocuments({ type: 'cabin' });

    res.status(200).json([
      { type: 'hotel', count: hotelCount },
      { type: 'apartments', count: apartmentCount },
      { type: 'resorts', count: resortCount },
      { type: 'villas', count: villaCount },
      { type: 'cabins', count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};

export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Location.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
