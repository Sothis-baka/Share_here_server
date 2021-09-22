const bcrypt = require('bcryptjs');

const User = require('../models/User');
const generateToken = require('../utils/generateToken');

module.exports = {
    Mutation: {
        login: async (_, { userInput: { username, password }}) => {
            const user = await User.findOne({ username });

            // Unauthenticated
            const failedResponse = { status: 401 };

            // In case username doesn't exist in database
            if(!user)
                return failedResponse;

            const match = bcrypt.compare(password, user.password);
            // In case password doesn't match with information in database
            if(!match)
                return failedResponse;

            // Generate token and return user information
            const token = generateToken(user);

            return {
                // Success
                status: 200,
                user: {
                    id: user._id,
                    token,
                    ...user._doc
                }
            }
        },

        register: async (_, { userInput: { username, password }}) => {
            // Username already in database, conflict
            if(await User.findOne({ username }))
                return { status: 409 };

            // Only save hashed password for security.
            password = await bcrypt.hash(password, 10);
            const user = new User({
                username,
                password,
                joinDate: new Date().toLocaleString(),
                posts: [],
                likes: []
            });

            // Save the user in database
            await user.save();

            // Generate token and return user information
            const token = generateToken(user);

            return {
                // Created
                status: 201,
                user: {
                    id: user._id,
                    token,
                    ...user._doc
                }
            };
        }
    }
}

