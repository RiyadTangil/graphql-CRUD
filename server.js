const express = require("express")
const {ApolloServer,gql}=require("apollo-server-express")
const typeDefs =require("./typeDefs")
const resolvers =require("./resolvers")
const mongoose = require("mongoose")
// const typeDefs=gql`
// type Query{
//     hello:String,
// }
// `;

// const resolvers={
//     Query:{
//         hello:()=>{
//             return "Hello world"
//         }
//     }
// }


async function startServer(){
const app = express();
const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
})
await apolloServer.start()
apolloServer.applyMiddleware({app:app});
// ,path:"/riyad"
// app.use((req, res) => {
//     res.send("hello from apollo server")
// })
await mongoose.connect('mongodb+srv://food-user:Ri11559988@cluster0.oq5xc.mongodb.net/food-db?retryWrites=true&w=majority',{
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
console.log("mongodb connected")
app.listen(4000,()=>console.log("server is running "))
}
startServer()