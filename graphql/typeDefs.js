const { gql } = require('apollo-server');

module.exports = gql`
    # all prerequisites should be checked in frontend. 
    
    interface MyResponse{
        success: Boolean!
        message: String!
    }
    
    type User{
        id: ID!
        username: String!
        token: String!
        joinDate: String!
        "Array of post id"
        posts: [String]
        "Array of post id"
        likes: [String]
    }
    
    type Reply{
        id: ID!
        username: String!
        content: String!
        replyAt: String!
        postId: String!
    }
    
    type Post{
        id: ID!
        title: String!
        content: String!
        username: String!
        postAt: String!
        lastActive: String!
        "Array of username"
        likes: [String]
    }
    
    type Query{
        getPosts: [Post]!
        findPost: Post
        getReplies(postId: String): [Reply]!
    }

    type UserResponse implements MyResponse{
        success: Boolean!
        message: String!
        user: User
    }
    
    type PostResponse implements MyResponse{
        success: Boolean!
        message: String!
        post: Post
    }
    
    type ReplyResponse implements MyResponse{
        success: Boolean!
        message: String!
        reply: Reply
    }
    
    type SimplifiedResponse implements MyResponse{
        success: Boolean!
        message: String!
    }
    
    input UserInput{
        username: String!
        password: String!
    }
    
    input PostInput{
        title: String!
        content: String!
    }
    
    type Mutation{
        register(userInput: UserInput!): UserResponse!
        login(userInput: UserInput!): UserResponse!
        
        "Display the post intantly"
        createPost(postInput: PostInput!): PostResponse!
        "also remove the post from user profile"
        deletePost(postId: String!): SimplifiedResponse!
        
        reply(postId: String!, content: String!): ReplyResponse!
        deleteReply(replyId: String!): SimplifiedResponse!

        toggleLike(postId: String!): SimplifiedResponse!
    }
`;