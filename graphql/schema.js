const {
    GraphQLID,
    GraphQLInt,
    GraphQLObjectType,
    GraphQLBoolean,
    GraphQLString,
    GraphQLInputObjectType,
    GraphQLList,
    GraphQLSchema
} = require('graphql')
const resolvers = require('./resolvers');

const user = new GraphQLObjectType({
    name: 'user',
    fields: {
        _id: {type: GraphQLString},
        name: {type: GraphQLString},
        lastname: {type: GraphQLString},
        email: {type: GraphQLString},
        avatar: {type: GraphQLString}
    }
})

const message = new GraphQLObjectType({
    name: 'message',
    fields: {
        _id: {type: GraphQLString},
        body: {type: GraphQLString},
        from: {type: user},
        to: {type: user},
        readed: {type: GraphQLBoolean}
    }
})

const house = new GraphQLObjectType({
    name : "house",
    fields : {
        _id : { type : GraphQLString },
        address : { type : GraphQLString },
        city : { type : GraphQLString },
        state : { type : GraphQLString },
        size : { type : GraphQLInt },
        type : { type : GraphQLString },
        zipCode : { type : GraphQLString },
        rooms : { type : GraphQLInt },
        bathrooms : { type : GraphQLInt },
        parking : { type : GraphQLBoolean },
        price : { type : GraphQLInt },
        code : { type : GraphQLString },
        image : { type : GraphQLString },
    }
})

const userFilterInput = new GraphQLInputObjectType({
    name: 'userFilterInput',
    fields: {
        name: {type: GraphQLString},
        lastname: {type: GraphQLString},
        email: {type: GraphQLString}
    }
})

const messageFilterInput = new GraphQLInputObjectType({
    name: 'messageFilterInput',
    fields: {
        body: {type: GraphQLString},
        from: {type: GraphQLString},
        to: {type: GraphQLString}
    }
})

const houseFilterInput =  new GraphQLInputObjectType({
    name : "houseFilterInput",
    fields : {
        _id : { type : GraphQLString },
        address : { type: GraphQLString},
        city : { type : GraphQLString },
        size : { type : GraphQLInt},
        parking : { type : GraphQLBoolean } 
    }
});

const queries = {
    hello: {
        type: GraphQLString, 
        resolve: resolvers.hello
    },
    user: {
        type: user,
        resolve: resolvers.user,
        args: {
            id: {
                type: GraphQLString
            }
        }
    },
    users: {
        type: GraphQLList(user),
        resolve: resolvers.users
    },
    usersByFilter: {
        type: GraphQLList(user),
        resolve: resolvers.usersByFilter,
        args: {
            filter: {
                type: userFilterInput
            }
        }
    },
    message: {
        type: message,
        resolve: resolvers.message,
        args: {
            id: {
                type: GraphQLString
            }
        }
    },
    messages: {
        type: GraphQLList(message),
        resolve: resolvers.messages
    },
    messagesByFilter: {
        type: GraphQLList(message),
        resolve: resolvers.messagesByFilter,
        args: {
            filter: {
                type: messageFilterInput
            }
        }
    },
    house : {
        type : house,
        resolve : resolvers.house,
        args : {
            id : {type : GraphQLString}
        }
    },
    houses : {
        type : new GraphQLList(house),
        resolve : resolvers.houses
    },
    housesByFilter : {
        type : new GraphQLList(house),
        resolve : resolvers.housesByFilter,
        args : {
            filter : { type : houseFilterInput }
        }
    }
}

const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: queries
})

const schema = new GraphQLSchema({
    query: queryType
})

module.exports = schema
