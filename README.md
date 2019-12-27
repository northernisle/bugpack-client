# Bugpack

A soon-to-be simple bug tracker, currently under development.  
Written in React using Redux and SASS, bootstrapped with Create React App.
The [back-end](https://github.com/northernisle/bugpack-api) is written in TypeScript on top of Node.js.

### Prerequisites

Create a `.env` file at the root of the project. It requires the following environment variables to run.

| Environment Variable  | Example Value           | Description         |
| --------------------- | ----------------------- | ------------------- |
| `REACT_APP_API_URL`   | `http://localhost:3001` | the URL of the API  |

### Running the application

#### Make sure that:
1. The server is running either in a container or locally with Node.js.
2. The DB is running in its container.

#### Using NPM
1. `npm install`
2. `npm start`
