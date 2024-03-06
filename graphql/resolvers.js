const userSchema = require('../models/user')
const messageSchema = require('../models/message')
const houseSchema = require("../models/house");

const resolvers = {    
    hello: () => {
        return "Hola Mundo!";
    },
    user: async (_, {id}) => {
        try {
            return user = await userSchema.findById(id);
        }catch(e){
            console.log()
        }
    },
    users: async () => {
        try{
            return await userSchema.find();
        }catch(e){
            console.log(e)
        }
    },  
    usersByFilter: async (_, {filter}) => {
        try{
            let query = {};
            if(filter){
                if(filter.name){
                    query.name = { $regex: filter.name, $options: 'i' }
                }
                if(filter.email){
                    query.email = { $regex: filter.email, $options: 'i'}
                }
                if(filter.lastname){
                    query.lastname = { $regex: filter.lastname, $options: 'i' }
                }
                const users = await userSchema.find(query)
                return users;
            }
        }catch(e){
            console.log("Error obteniendo el usuario")
        }
    },
    message: async (_, {id}) => {
        try {
            return message = await messageSchema.findById(id).populate({
                path: 'from',
                select: '-password'})
            .populate({
                path: 'to',
                select: '-password'}) ;
        }catch(e){
            console.log()
        }
    },
    messages: async () => {
        try{
            return await messageSchema.find().populate({
                path: 'from',
                select: '-password'})
            .populate({
                path: 'to',
                select: '-password'});
        }catch(e){
            console.log(e)
        }
    }, 
    messagesByFilter: async (_, {filter}) => {
        try{
            let query = {};
            if(filter){
                if(filter.from){
                    query= {from: filter.from} 
                }
                if(filter.to){
                    query = { to: filter.to}
                }
                if(filter.body){
                    query.body = { $regex: filter.body, $options: 'i'}
                }
                const message = await messageSchema.find(query).populate('from').populate('to') 
                return message;
            }
        }catch(e){
            console.log("Error obteniendo el mensaje")
        }
    },
    house: async (_, { id }) => {
        try {
            return (house = houseSchema.findById(id));
        } catch (error) {
            console.log(error);
        }
    },
    houses: async () => {
        try {
            let houses = houseSchema.find();
            return houses;
        } catch (error) {
            console.log(error);
        }
    },
    housesByFilter: async (_, { filter }) => {
        try {
            let query = {};
            if (filter) {
                if (filter.address) {
                    query = { address: filter.address };
                }
                if (filter.city) {
                    query = { city: filter.city };
                }
                if (filter.size) {
                    query = { size : filter.size };
                }
                if(filter.parking){
                    query = { parking : filter.parking};
                }   
                const house = await houseSchema.find(query);
                return house;
            }
        } catch (e) {
            console.log("Error obteniendo la casa");
        }
    },
};

module.exports = resolvers