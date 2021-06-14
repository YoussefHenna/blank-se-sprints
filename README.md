# Black SE Project - Sprints

## Initial steps:

Note: this project uses yarn instead of npm

Run these to install required packages

_Server_

```
cd server
yarn install
```

_Client_

```
cd client
yarn install
```

## Running:

For both client and server:

```
yarn start
```

## References

- [Basic React + Typescript tutorial](https://www.youtube.com/watch?v=Z5iWr6Srsj8&ab_channel=BenAwad)
- [Material-UI](https://material-ui.com/components/buttons/) Use this library for basic ui elements - library already added to packages
- [React Hooks](https://reactjs.org/docs/hooks-intro.html) (since we'll be using functional components)
- [State hoisting](https://reactjs.org/docs/lifting-state-up.html) Quick read on where state should be held
- [Basic authentication](https://dev.to/eidorianavi/authentication-and-jwt-in-node-js-4i13) with hashing, salt, and JWTs (important for whoever is implementing sign in/register)
- [VSCode](https://code.visualstudio.com/) use this editor, has integrated github that you should use
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) vscode plugin to format the code and make it look nice

## Project structure (for client)

├── src  
│ ├── assets (any images/fonts etc)  
│ │ └──images  
│ │ └── fonts  
│ ├── pages  
│ │&nbsp;&nbsp; └── pageA (folder per page of website)  
│ │&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── PageA.css (styles for page)  
│ │&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── PageA.tsx (actual page ui implementation)  
│ │&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── PageARequests.ts (all api requests of page done here)  
│ │&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── components (any sub/small components used in this particular page)  
│ │&nbsp;&nbsp; └── common (any common components used througout multiple pages)  
│ ├── util (any helper files)  
│ ├── index.tsx (ignore this, just starts app)  
│ ├── App.tsx (will include navigation between pages)

This is just a guide, you can alter it to how you see fit, just try to be consistent

## Project structure (for server)

Server will not need more than 1 - 3 files. Put them all in src directory
