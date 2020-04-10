# soen487-a2

website: [https://jerry4013.github.io/soen487-a2-client/](https://jerry4013.github.io/soen487-a2-client/)

super user: abc123

password: 123456

We deploy the frontend on the github page, and backend on the Heroku server.

### IMPORTANT: The backend server needs a few seconds to awake.

[https://soen487-library.herokuapp.com/](https://soen487-library.herokuapp.com/)

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

## Grading Scheme

### Task 1 & 2

* common structure (lightweight, no business)

We defined all the data structures in the "model" package, the entities in the "dataobject" package, and also the CommonReturnType class as the data object transformed between servers and clients.

### Task 3

* persistency

We use JPA, so we defined the entity class in Spring, then all the tables in the database can be created automatically. We also defined some interfaces called ***JpaRepository, which can be injected in the services.

* configuration

For Spring boot projects, all the configuration files are in the `application.properties` file.

* functionality

The business logic is in the service package. The CRUD operations can be tested with the client.

* exceptions

We defined a enum Business Exception class. Any time there is something wrong, we will throw an Exception with a status("fail") and an error code and an error message, which can be read by the client.

For example, if we search for a book with an invalid id, we can see the error displayed.

### Task 4

* member system and loan system

In the "loan" module, we implemented these two systems.

* Persistency and configuration in the member system and the loan system

Similarly, we use JPA as the persistency, and the configuration file is the `application.properties` file.

* Exceptions

For SOAP, it is SoapFault classes. They are in the loan project and the exception package.

### Task 5

* REST

In the library project and the library2 project, we wrote the REST services. We can test the CRUD functionalities using the client.

* JSON, XML

The JSON and XML type are supported automatically by Spring boot 2, so we only need to specify the `Accept: Application/json` or `Accept: Application/xml` as one of the headers.

* HTML and XSLT

Unfortunately, Spring boot 2 does not support XSLT by default. So we found a tool/dependency called Saxon and Summer. These dependences are only supported by Spring boot 1.5. Therefore, the library2 project is based on Spring boot 1.5. 

[https://www.greeneyed.org/post/xml-xslt-3-0-development-with-spring-boot-saxon-and-summer/](https://www.greeneyed.org/post/xml-xslt-3-0-development-with-spring-boot-saxon-and-summer/)

The xslt file locates in `library2\src\main\resources\xslt` directory.

Then we can get a html file as following:

```java
    @GetMapping(value = "/list")
    public ModelAndView getList() {
        BookList myBookList = new BookList("myBookList", bookService.list());
        return new XsltModelAndView("book-process", myBookList);
    }
```

* TEXT

We can simply return a string instead of MedelAndView in the code above.

* Parameter arguments

In Spring, we can add an anotation `@RequestParam` or `@PathVariable` as parameters. For example, we can pass the id of a book.

* error handling

If we search for a book with an invalid id, we can see the error displayed.

### Task 6

* SOAP, members, loans

The loan module is implemented with SOAP and Spring. The models is defined in `resources/loans.xsd`.

The service can be tested using curl. The `request.xml` file must be put in the same directory.
The content of this file is:

```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                  xmlns:gs="http://spring.io/guides/gs-producing-web-service">
    <soapenv:Header/>
    <soapenv:Body>
        <gs:getMemberInfoRequest>
            <gs:id>1</gs:id>
        </gs:getMemberInfoRequest>
    </soapenv:Body>
</soapenv:Envelope>
```

Then,
```
curl --header "content-type: text/xml" -d @request.xml http://localhost:8081/loan
```

We can get a response like this:
```xml
<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/"><SOAP-ENV:Header/><SOAP-ENV:Body><ns2:getMemberInfoResponse xmlns:ns2="http://spring.io/
guides/gs-producing-web-service"><ns2:member><ns2:id>1</ns2:id><ns2:name>member1</ns2:name><ns2:contact>1234567</ns2:contact></ns2:member></ns2:getMemberInfoResponse>
</SOAP-ENV:Body></SOAP-ENV:Envelope>
```

* faults

If we request a member with an invalid id, for example, if we can the id in the `request.xml` file to 5, we can get a SOAP fault as below:
```xml
<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/"><SOAP-ENV:Header/><SOAP-ENV:Body><SOAP-ENV:Fault><faultcode xmlns:ns0="http://spring.io/
guides/gs-producing-web-service">ns0:MEMBER_NOT_FOUND</faultcode><faultstring xml:lang="en">@faultString</faultstring></SOAP-ENV:Fault></SOAP-ENV:Body></SOAP-ENV:Enve
lope>
```

* wsdl

Because in the assignment requirements, there is nothing talking about the wsdl file.

If you want to generate a wsdl file in Spring, we need to add a plugin in the pom.xml and also add a new configuration class.

[https://spring.io/guides/gs/consuming-web-service/](https://spring.io/guides/gs/consuming-web-service/)

### Task 7

* correct UX/UI

Because we use Angular material as the frontend framework, it support JSON easily. 

* error handling

If we search for a book with an invalid id, we can see the error displayed.

* service availability

This can be tested on the website.

* configuration

`library-client/src/environments` is the place storing environment variables.

* super-user

In the configuration file, we define two values:

```
login.username=abc123
login.password=123456
```

The front end pass these values to the server and get the authentication. The front end can do nothing untill the user type in the correct user name and password.

### Task 8

UML diagram are generated by IntelliJIDEA automatically.

dependencies can be found in pom.xml.

The library system and loan system are totally independent to each other, but only sharing a same data structure.





