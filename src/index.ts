const express = require('express')
const {ApolloServer} = require("@apollo/server")
const {expressMiddleware} = require("@apollo/server/express4")
const bodyParse = require("body-parser")
const cors = require("cors")
// const {default:axios} = require("axios")

const startServer = async () => {
    const app = express()
    const server = new ApolloServer({
        typeDefs: `
        type User {
            id: ID!,
            name: String!,
            email: String!,
            username: String!,
            phone: String!,
        }
        type Todo {
            id: ID!,
            title: String!,
            completed: Boolean
        }

        type Comment {
            id: ID!,
            body: String!,
            postId: ID!
        }

        type Query {
            getTodos: [Todo],
            getAllUsers: [User],
            getUser(id: ID!): User
            getAllComments: [Comment]
        }
        `,
        resolvers: {
            Query: {
                // getTodos: async () => (await axios.get("https://jsonplaceholder.typicode.com/todos")).data,
                // getAllUsers: async () => (await axios.get("https://jsonplaceholder.typicode.com/users")).data,
                // getUser: async (root:any, {id}) => (await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)).data,
                // getAllComments: async (root:any, {id}) => (await axios.get(`https://jsonplaceholder.typicode.com/comments`)).data
            }
        }
    })
    app.use(bodyParse.json())
    app.use(cors())
    await server.start()
    app.use('/graphql', expressMiddleware(server))
    app.listen(3000, () => console.log("Starting"))
}

startServer()
