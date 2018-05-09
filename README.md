# qr-register-app

After cloning this repository, make sure you have the following installed.

* MongoDB
* Node.js

run the following commands

``` bash
    npm install
```

Now, open two terminals (hyper at [hyper.is](https://hyper.is/) is preffered because it is cross platform and has ability to run two or more terminals in one window )

If using hyper, open it, go to File > Split Horizontally. This should give you two terminals.

If you have mongodb installed correctly then run these commands

```bash
    # In this first terminal run..
    mongod
```

```bash
    # In this first terminal run..
    mongo
```
This should start mongodb correctly.

run ...

```bash
    npm start
```

This should start the project at port 3000.

navigate to "localhost:3000/session/...any name here ..... you can enter any name here for example 'Oracle' "

This should open up the sign-in page. I have not added any functionality to this page yet.

click the register link to navigate to the register page. This page does work

For a new user to register, he/she has to enter a first name, last name and then confirm the last name.

This registers the user and then puts the information of the user into the mongodb database.
