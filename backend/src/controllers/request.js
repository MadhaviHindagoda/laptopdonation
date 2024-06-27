const createHttpError = require('http-errors')
const bcrypt = require('bcrypt');
const OrderModel = require('../model/requests')
const BuyerModel = require('../model/users');
const PetModel = require('../model/laptop')

exports.create = async (req, res, next) => {
    const user_id = req.body.user_id
    const laptop_id = req.body.laptop_id
    try {
    
    
        if (!user_id || !laptop_id) {
            throw createHttpError(400, 'Missing required parameters')
        }

        const isUserAvailable = await BuyerModel.findById( user_id ).exec();
        
        
        if (!isUserAvailable) {
            throw createHttpError(400, 'User doesnt exists')
        }
        
        const isPet = await PetModel.findById(laptop_id).exec();
        console.log(isUserAvailable)

        if (!isPet) {
            throw createHttpError(400, 'laptop doesnt exists')
        }


        const order = new OrderModel({
            user_id: user_id,
            user_name: isUserAvailable.name,
            laptop_id: laptop_id,
            laptop_name: isPet.name,
            status: "Request",
            date: new Date().toISOString()
        })

        const result = await order.save();

        res.status(201).send(result);

    } catch (error) {
        next(error)

    }

}

exports.getAll = async (req, res, next) => {

    try {
        const result = await OrderModel.find({status:"Request"}).exec();
        res.status(200).send(result);
    } catch (error) {
        next(error)
    }

}



