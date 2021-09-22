# Share here

### Author

Sothis-baka



### Description

An online forum. (the code in this rep is for **back end**)

##### Backend

Apollo server (GraphQL)

##### Frontend

React.js



### Use

Clone the repo

```
git clone https://github.com/Sothis-baka/Share_here_client.git
```

<span style="color:red;"><u>**You need to set up your mongoDB information and your secret in .env file**</u></span>

```
TODO
```

Run

```
npm start
```

Then go to localhost:8000. Apollo Server is running there.



### Deployment

Client deployed at [Heroku](https://share-here-cli.herokuapp.com/)

Server deployed at [Heroku](https://share-here-server.herokuapp.com/)



### Source code

[client](https://github.com/Sothis-baka/Share_here_client)

[server](https://github.com/Sothis-baka/Share_here_server)



### Version

2.0



### Last update

9/15/2021



### Consideration

Turned off client side introspection in production mode.

User schema don't have a field for password, in GraphQL there is no way to get it even if it's returned from the server.

Use bcrypt to store password since it's designed slow to ensure the security. Original password won't be processed into database.

"getPosts" query will return all post together. Use this method because there isn't much data, using pagination will only lead to more request and bad performance.

