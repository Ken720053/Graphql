const { graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInterfaceType,
    GraphQLScalarType,
    GraphQLEnumType,
    Kind
} = require('graphql');

const DateType = new GraphQLScalarType({
    name:'DateType',
    parseValue(value){
        return new Date(value)
    },
    serialize(value){
        return value.getTime()
    },
    parseLiteral(ast){
        if(ast.kind === Kind.INT){
            return new Date(+ast.value)
        }
        return null;
    }
})

const user = {
    id:1,
    email:'A56565@gmail.com',
    friends: ['bob','buaa'],
    work_state:1,
    created_at: new Date(),
    updated_at: new Date()
}

const DateTimeInterface = new GraphQLInterfaceType({
    name:'DateTimeInterface',
    fields:{
        created_at:{
            type:DateType
        },
        updated_at:{
            type:DateType
        }
    }
})

const WorkStateType = new GraphQLEnumType({
    name:'WorkStateType',
    values: {
        STOP: {
            value:0
        },
        COMPLETED: {
            value:2
        },
        SUESSFUL: {
            value:1
        }
    }
})

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name:'Query',
        fields:{
            user:{
                type: new GraphQLObjectType({
                    interfaces:[DateTimeInterface],
                    name:'User',
                    fields:{
                        id:{
                            type: new GraphQLNonNull(GraphQLID)
                        },
                        email:{
                            type: GraphQLString
                        },
                        friends:{
                            type: new GraphQLList(GraphQLString)
                        },
                        work_state:{
                            type: WorkStateType
                        },
                        created_at:{
                            type:DateType
                        },
                        updated_at:{
                            type:DateType
                        }
                    }
                }),
                resolve: (parent, args) => {
                    return user
                }   
            }
        }
    })
    // mutation: new GraphQLObjectType({
    //     name:'Mutation'
    // })
})

graphql({
    schema:schema,
    source:`query{user{
        id
        email
        created_at
        updated_at
        friends
        work_state
    }}`
}).then(res => {
    console.log(res)
}).catch(err => {
    console.error(err)
})




