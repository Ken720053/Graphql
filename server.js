const { graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInterfaceType,
    GraphQLScalarType,
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


const DateTimeInterface = new GraphQLInterfaceType({
    name:'DateTimeInterface',
    fields:{
        craeted_at:{
            type:DateType
        },
        updated_at:{
            type:DateType
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
                        craeted_at:{
                            type:DateType
                        },
                        updated_at:{
                            type:DateType
                        }
                    }
                })
            }
        }
    }),
    // mutation: new GraphQLObjectType({
    //     name:'Mutation'
    // })
})

graphql({
    schema:schema,
    source:`query{user{
        id
        email
    }}`
}).then(res => {
    console.log(res)
}).catch(err => {
    console.error(err)
})




