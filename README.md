# todo app
A coding test given by </ salt> with four days to complete it. Create a to-do list using the following requirements:
- User can create to-do items
- User can create multiple to-do lists where each list has its unique sharable URL
- User can mark to-do items as “done”
- User can filter the to-do list and view items that were marked as “done”
- Another user can collaborate in real-time with user.


## Built with 

### client-side
- React
- TypeScript
- SASS
  
### server-side
- Node JS
- Express
- Socket.io
### database
- MongoDB
- Mongoose

### devops
- Heroku

## Deployment

[tout-doux-app (client-side)](https://https://tout-doux-app.herokuapp.com/)

[tout-doux-server (server-side)](https://https://tout-doux-app.herokuapp.com/)

## Installation

```bash
# in the server folder
npm i
npm run start # node
#or
npm run dev # nodemon for development purposes

#in the client folder
npm i
npm run start
```


To run the application locally, an .env file has to be provided in the server folder with the following information:
- MONGO_URI - to connect to the MongoDB database

## What I have learned from this project
I love the MERN tech stack for its flexibility and smooth development workflow, so I'm always having fun building this type of full-stack app. I wish I were allowed to use Redux to deal with all the small interactions in the to-do list. Consequently, this project made me practice more complex ReactJS when I had to deal with many different states for all the actions performed in the app. 

I got more comfortable with React Router, especially with using parameters for navigation.

Implementing sockets to make the app collaborative is something I have not done. Combining the db.collection.watch() method from MongoDB with sockets from socket.io made it very easy to monitor the changes made in the database!

## What's next to do?
[see to-do list on Notion](https://www.notion.so/marinakinalone/To-do-app-d3c1a1721d4f46c6b96fa447be7d96f8)
## Resources

- A few design inspirations for inputs and buttons:
     * [input to create tasks and new to-do lists](https://uiverse.io/detail/alexruix/slippery-snail-18)
     * [back button](https://uiverse.io/detail/Jedi-hongbin/modern-sloth-8)
     * [input to create subtasks](https://uiverse.io/detail/satyamchaudharydev/fast-dodo-69)
- To get started with Socket.io, a couple articles (to complete the official documentation):
    * [Socket.IO, React and Node.js](https://www.valentinog.com/blog/socket-react/)
    * [Build your own Realtime Database with Socket.io and MongoDB](https://medium.com/swlh/build-your-own-realtime-database-with-socket-io-and-mongodb-1c561c2bb87)

## Team

[![Marina Kinalone Simonnet](https://avatars.githubusercontent.com/u/63544936?v=3&s=144)](https://github.com/marinakinalone) |
---|
[Marina Kinalone Simonnet](https://github.com/marinakinalone) |

## [License](https://github.com/marinakinalone/todo-list/blob/main/LICENSE.txt)

MIT © [Marina Kinalone Simonnet](https://github.com/marinakinalone)

