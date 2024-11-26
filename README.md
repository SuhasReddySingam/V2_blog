This is the V1 of the website it has user authentication feature and ability to add blogs for the user.
AI integration needs to be implemented
GET AN API KEY FROM HUGGING FACE WHICH IS ABLE TO USE Lllama-3-8B-Instruct
For Windows users change the dev and start in package.json to "dev"="SET NODE_ENV=development & nodemon backend/index.js" AND 
"start": "SET NODE_ENV=production & node backend/index.js",
### Setup .env file

```bash
MONGO_URI=your_mongo_uri
PORT=5000
JWT_SECRET=your_secret_key
NODE_ENV=development
CLIENT_URL= http://localhost:5173

```

### Run this app locally

```shell
npm run build
```
### After doing the above run this to just to be safe so the code can run smoothly
```shell
npm audit fix
```
### Start the app

```shell
npm run start
```

For Windows users change the dev and start in package.json to "dev"="SET NODE_ENV=development & nodemon backend/index.js" AND "start": "SET NODE_ENV=production & node backend/index.js",

