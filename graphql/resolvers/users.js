const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../model/User');
const { SECRET_KEY } = require('../../config');

const generateToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            username: user.username
        },
        SECRET_KEY,
        { expiresIn: '1h' }
    );
}

module.exports = {
    Mutation: {
        login: async (_, { userInput: { username, password }}) => {
            const user = await User.findOne({ username });

            const failedResponse = {
                message: "Can't find user with given information",
                success: false
            };

            // in case username doesn't exist in database
            if(!user){
                return failedResponse;
            }

            const match = bcrypt.compare(password, user.password);
            // in case password doesn't match with information in database
            if(!match){
                return failedResponse;
            }

            // generate token and return
            const token = generateToken(user);

            return {
                success: true,
                message: "Token generated",
                user: {
                    id: user._id,
                    token,
                    ...user._doc
                }
            }
        },

        register: async (_, { userInput: { username, password }}) => {
            // in case username already in database
            if(await User.findOne({ username })){
                return{
                    message: "Username already exists in database",
                    success: false
                };
            }

            password = await bcrypt.hash(password, 10);
            const user = new User({
                username,
                password,
                joinDate: new Date().toLocaleString(),
                posts: [],
                likes: []
            });

            // save the user in database
            await user.save();

            // Generate token
            const token = generateToken(user);

            return {
                success: true,
                message: "User " + username + "created",
                user: {
                    id: user._id,
                    token,
                    ...user._doc
                }
            };
        }
    }
}