const Post = require("./models/Post.model")
const resolvers = {
    Query: {
        hello: () => {
            return "Hello world"
        },
        getAllPosts: async () => {
            const posts = await Post.find()
            return posts
        },
        getPost: async (parent, args, context, info) => {
            const { id } = args;
            const post = await Post.findById(id)
            return post
        }

    },
    Mutation: {
        createPost: async (parent, args, context, info) => {
            const { title, description } = args.post
            const post = new Post({ title, description });
            await post.save()
            return post
        },
        deletePost: async (parent, args, context, info) => {
            const { id } = args;
            await Post.findByIdAndDelete(id)
            return "post deleted"
        },
        updatePost: async (parent, args, context, info) => {
            const { id } = args;
            const { title, description } = args.post
            const update= {}
            if(title !==undefined){
                update.title = title
            }
            if(description !==undefined){
                update.description = description
            }
            // const post = await Post.findByIdAndUpdate(id, { title, description }, { new: true })
            const post = await Post.findByIdAndUpdate(id, update, { new: true })
            return post
        }

    }
}
module.exports = resolvers