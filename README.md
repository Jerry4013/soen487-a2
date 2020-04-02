# soen487-a2

website: [https://soen487-library.herokuapp.com](https://soen487-library.herokuapp.com)

super user: abc123

password: 123456

## Techniques used in this project

Spring boot, Angular Material, PostgreSQL, Heroku.

## Modules

There are four modules in this repository, library, library2, loan, and library-client.

* library and library2 are RESTful APIs for task 1, 3, and 5. The difference between library and library2 is the returned content type. 
* library can produce(return) JSON and XML. library2 can produce plain text and HTML. 
* loan is a SOAP API for task 2, 4, and 6
* library-client is an Angular frontend project. 

## How to run the code

### Install some Applications

* Install PostgreSQL and create a new database called soen487a2. 
* Install NodeJS, npm if you don't have them.
* Install Angular CLI using `npm install -g @angular/cli`.

### Config and Run

* Clone all the four modules to your computer. 
* Check the `application.properties` in src/main/resources in all the three Spring modules(library, library2, and loan). Modify the username and password as you set in your OS.
* Run the `library` Spring boot module(at port 8080). Because I wrote all the RESTful APIs in this module, including loan system and member system, this one backend is enough.
* Go to the `library-client` folder and run `ng serve`. This may need some time to build the project.
* Open a browser and go to localhost:4200

