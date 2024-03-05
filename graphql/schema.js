const {
    GraphQLID,
    GraphQLObjectType,
    GraphQLBoolean,
    GraphQLString,
    GraphQLInputObjectType,
    GraphQLList,
    GraphQLSchema
} = require('graphql')
const resolvers = require('./resolvers')

const User = new GraphQLObjectType({
    name: 'User',
    fields: {
        _id: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString
        },
        lastname: {
            type: GraphQLString
        },
        email: {
            type: GraphQLString
        },
        avatar: {
            type: GraphQLString
        }
    }
})

const Message = new GraphQLObjectType({
    name: 'Message',
    fields: {
        _id: {
            type: GraphQLString
        },
        body: {
            type: GraphQLString
        },
        from: {
            type: User
        },
        to: {
            type: User
        },
        readed: {
            type: GraphQLBoolean
        }
    }
})
const UserFilterInput = new GraphQLInputObjectType({
    name: 'UserFilterInput',
    fields: {
        name: {
            type: GraphQLString
        },
        lastname: {
            type: GraphQLString
        },
        email: {
            type: GraphQLString
        }
    }
})

const MessageFilterInput = new GraphQLInputObjectType({
    name: 'MessageFilterInput',
    fields: {
        body: {
            type: GraphQLString
        },
        from: {
            type: GraphQLString
        },
        to: {
            type: GraphQLString
        }
    }
})

const queries = {
    hello: {
        type: GraphQLString, 
        resolve: resolvers.hello
    },
    User: {
        type: User,
        resolve: resolvers.User,
        args: {
            id: {
                type: GraphQLString
            }
        }
    },
    Users: {
        type: GraphQLList(User),
        resolve: resolvers.Users
    },
    UsersByFilter: {
        type: GraphQLList(User),
        resolve: resolvers.UsersByFilter,
        args: {
            filter: {
                type: UserFilterInput
            }
        }
    },
    Message: {
        type: Message,
        resolve: resolvers.Message,
        args: {
            id: {
                type: GraphQLString
            }
        }
    },
    Messages: {
        type: GraphQLList(Message),
        resolve: resolvers.Messages
    },
    MessagesByFilter: {
        type: GraphQLList(Message),
        resolve: resolvers.MessagesByFilter,
        args: {
            filter: {
                type: MessageFilterInput
            }
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