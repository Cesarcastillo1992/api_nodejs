const UserSchema = require('../models/user')
const MessageSchema = require('../models/message')

const resolvers = {    
        hello: () => {
            return "Hola Mundo!";
        },
        User: async (_, {id}) => {
            try {
                return user = await UserSchema.findById(id);
            }catch(e){
                console.log()
            }
        },
        Users: async () => {
            try{
                return await UserSchema.find();
            }
            catch(e){
                console.log(e)
            }
        },  
        UsersByFilter: async (_, {filter}) => {
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
                    const users = await UserSchema.find(query)
                    return users;
                }
            }catch(e){
                console.log("Error obteniendo el usuario")
            }
        },
        Message: async (_, {id}) => {
            try {
                return message = await MessageSchema.findById(id).populate({
                    path: 'from',
                    select: '-password'})
                .populate({
                    path: 'to',
                    select: '-password'}) ;
            }catch(e){
                console.log()
            }
        },
        Messages: async () => {
            try{
                return await MessageSchema.find().populate({
                    path: 'from',
                    select: '-password'})
                .populate({
                    path: 'to',
                    select: '-password'});
            }
            catch(e){
                console.log(e)
            }
        }, 
        MessagesByFilter: async (_, {filter}) => {
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
                    const message = await MessageSchema.find(query).populate('from').populate('to') 
                    return message;
                }
            }catch(e){
                console.log("Error obteniendo el mensaje")
            }
        },
}
module.exports = resolvers