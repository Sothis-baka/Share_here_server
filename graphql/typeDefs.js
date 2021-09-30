const { gql } = require('apollo-server');

module.exports = gql`
    "Mutation type need authentication, use this interface to return status id"
    interface ResponseWithStatus{
        status: ID!
    }
    
    type User{
        id: ID!
        "Unique username, can use to identify user"
        username: String!
        "JWT"
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
        findPost(postId: String): Post
        getReplies(postId: String): [Reply]!
    }

    type UserResponse implements ResponseWithStatus{
        status: ID!
        user: User
    }

    type PostResponse implements ResponseWithStatus{
        status: ID!
        post: Post
    }

    type ReplyResponse implements ResponseWithStatus{
        status: ID!
        reply: Reply
    }
    
    type LikeResponse implements ResponseWithStatus{
        status: ID!
        like: Boolean
    }

    "Can't use interface directly"
    type SimplifiedResponse implements ResponseWithStatus{
        status: ID!
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
        
        createPost(postInput: PostInput!): PostResponse!
        "Also remove the post from user profile"
        deletePost(postId: String!): SimplifiedResponse!

        reply(postId: String!, content: String!): ReplyResponse!
        "Also remove the reply from user profile"
        deleteReply(replyId: String!): SimplifiedResponse!

        toggleLike(postId: String!): LikeResponse!
    }
`;