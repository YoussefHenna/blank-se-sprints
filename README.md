# Blank SE Project - Sprints

## **_For Grading/Evalutation:_**

## [** YouTube demonstration here_**](https://youtu.be/U_HBUkYcFHU)

### Sample Users for testing

**_Admin ->_** username: youssefadmin, password: qwertyuiop  
**_Student ->_** username: youssef, password: qwertyuiop  
**_Instructor ->_** username: mohammed, password: password

You can also create your own accounts, these just have data associated with them and will make testing easier.

---

---

---

## **_For setting up project:_**

## Initial steps:

### Node + Yarn

[Download Node](https://nodejs.org/en/download/)  
[Install Yarn](https://classic.yarnpkg.com/en/docs/install/#windows-stable)

### Database

[Download MongoDB](https://www.mongodb.com/try/download/community?tck=docs_server)  
[Install Mongo](https://docs.mongodb.com/manual/administration/install-community/)

- Make sure you install MongoDB Compass as well (should be checkbox in setup process)
- To create a db follow [this](https://streamable.com/ql4ee6)

Make sure you use name = 'blank-db', and create collection 'users'  
&nbsp;

&nbsp;

For now, each one of us will use a different local DB, we will host a shared DB online when we're done

### Server

Exceute in terminal while in project directory

```
cd server
yarn install
```

### Client

Execute in terminal while in project directory

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
- [Mongo Docs for CRUD](https://docs.mongodb.com/drivers/node/current/fundamentals/crud/)
- [Material-UI](https://material-ui.com/components/buttons/) Use this library for basic ui elements - library already added to packages
- [React Hooks](https://reactjs.org/docs/hooks-intro.html) (since we'll be using functional components)
- [State hoisting](https://reactjs.org/docs/lifting-state-up.html) Quick read on where state should be held
- [Basic authentication](https://dev.to/eidorianavi/authentication-and-jwt-in-node-js-4i13) with hashing, salt, and JWTs (important for whoever is implementing sign in/register)
- [VSCode](https://code.visualstudio.com/) use this editor, has integrated github that you should use
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) vscode plugin to format the code and make it look nice

## Sample UI Style

![ui](https://i.imgur.com/YWTIfOm.png)
This is mock I made. Try to match these styles.  
Material-UI has theming support, so use components from there and eveything should look good.

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

Source codes for the server will be in the src directory,
it is recommended to group APIs, classes or functions based
on their purpose to facilitate separation of concerns. This also
allows us to have nicer looking and well-organized code base.

## Recommended structure for the server side

#### the code in the test folder in 'src' is a nice guide

├── src\
│ ├── (sectionName) (name of the section (e.g. schedule, studentGrades,etc... ))\
│ │ └── apis.ts (where functions and APIs that handle requests from the client (and other logic) are stored)\
│ │ └── dbOperations.ts (where functions that query the database are stored)\
│ │ └── (other files if needed).ts (extra files that can be included)\

#### classes and interfaces that are used by both client & server is in `SharedObjects` folder

#### NOTE : in both both folders of client and server, there is a symbolic link (shortcut) with the name `SharedObjects` which points back to the folder in the root directory
