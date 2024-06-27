const createHttpError = require('http-errors')
const LaptopModel = require('../model/laptop')
const mongoose = require('mongoose');

exports.create = async (req, res, next) => {
    const {
        name,
        brand,
        storage,
        ram,
        processor,
        location
    } = req.body;
    
    try {
        const { image } = req.files;
        if (!image) {
            throw createHttpError(404, "Image not found")
        }
        if (!image.mimetype.startsWith('image')) {
            throw createHttpError(400, 'Only images are allowed');
        }
        let filepath = __dirname + '../../../public/laptops/' + image.name
        image.mv(filepath);

        let filepathtoUplaod = '/public/laptops/' + image.name

        if (!name || !brand || !storage || !ram || !location) { 
            throw createHttpError(400, 'Please provide all the required fields');
        }

        const laptop = new LaptopModel({
            name,
            brand,
            storage,
            ram,
            image: filepathtoUplaod,
            processor,
            location,
            status: 'available'
        });

        const result = await laptop.save();

        res.status(201).send(result);





    } catch (error) {

        next(error)

    }

}

exports.update = async (req, res, next) => {

    const petid = req.params.id;

    const {
        name,
        brand,
        storage,
        ram,
        processor,
        location
    } = req.body;

    try {

        if (!petid) {
            throw createHttpError(400, 'Please provide laptop id');
        }

        //check mongoose id
        if (!mongoose.isValidObjectId(petid)) {
            throw createHttpError(400, 'Please provide valid laptop id');
        }

        //if req.files is not empty
        let pth;
        if (req.files) {
            const { image } = req.files;
            if (!image) {
                throw createHttpError(404, "Image not found")
            }
            if (!image.mimetype.startsWith('image')) {
                throw createHttpError(400, 'Only images are allowed');
            }
            let filepath = __dirname + '../../../public/laptops/' + image.name
            image.mv(filepath);

            pth = '/public/laptops/' + image.name
        }

        const laptop = await LaptopModel.findById(petid).exec();

        if (!laptop) {
            throw createHttpError(404, 'laptop not found');
        }

        laptop.name = name || laptop.name;
        laptop.brand = brand || laptop.brand;
        laptop.storage = storage || laptop.storage;
        laptop.ram = ram || laptop.ram;
        laptop.image = pth || laptop.image;
        laptop.processor = processor || laptop.processor;
        laptop.location = location || laptop.location;

        const result = await laptop.save();

        res.status(200).send(result);



    } catch (error) {

        next(error)

    }
}

exports.getAll = async (req, res, next) => {

    try {
        const result = await LaptopModel.find().exec();
        res.status(200).send(result);
    } catch (error) {
        next(error)
    }

}

exports.getById = async (req, res, next) => {

    try {
        const id = req.params.id;
        const result = await LaptopModel.findById(id).exec();
        res.status(200).send(result);
    } catch (error) {
        next(error)
    }

}

exports.search = async (req, res, next) => {

    // const search = req.params.search;

    try {
        const search = req.params.search;
        
        //user regex to search for name,type,breed, case insensitive, and return all results
        const result = await LaptopModel.find({ $or: [{ name: { $regex: search, $options: 'i' } }, { brand: { $regex: search, $options: 'i' } }, { storage: { $regex: search, $options: 'i' } }] }).exec();

        res.status(200).send(result);
    } catch (error) {
        next(error)
    }

}
exports.delete = async (req, res, next) => {

    try {
        const id = req.params.id;
        const result = await LaptopModel.findByIdAndDelete(id).exec();
        res.status(200).send(result);
    } catch (error) {
        next(error)
    }

}

