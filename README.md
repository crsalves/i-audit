# i-audit
  
#### About
  The project's goal is to build a web application for financial management. The I-Audit website is a personal project that I've been working on to learn and practice modern technologies used in the industry to develop software applications.
  In this project, the frontend and the backend parts are implemented in a single component. 
  Node.js, Javascript, and EJS are the tools I used to develop the backend part of the system.
  The frontend code was generated using HTML, CSS, and Javascript.
  MySQL is the database used to store the application's data.
  Also, I worked with Docker containers to host the MySQL database and the node application.
  
  The following sections contain more details about the project:  
  
  #### System Design
    This section contains details of the I-Audit system design.
 1. **Functional Requirements** 
 
    Functional requirements define the features that a system should have. So, this section describes the main functional requirements of the I-Audit system:
    * The system should have a login and a logout function
    * The system should allow the use to record the folloing list of transactions:
      - Debit
      - Credit
    * The system should allow the users to **edit** and **delete** transactions already registered  

 2. **Database Schema**
    
    Through UML diagram, first I designed the tables and their relationships. So, some tables have one-to-many relation, while others have one-to-one relation, but none has many-to-many relationship. 
    Second, I created the schema using the MySQL Workbench.
    
 3. **Node-app Design**
    
    This folder contains:
    - [controller](https://github.com/crsalves/i-audit/tree/main/node-app/controller): files containing the codes with the logic of the program.
    - [model](https://github.com/crsalves/i-audit/tree/main/node-app/model): files containing the database query for CRUD functions.
    - [public](https://github.com/crsalves/i-audit/tree/main/node-app/public): it holds the CSS folder and the index.js that holds the jQuery coding.
    - [routes](https://github.com/crsalves/i-audit/tree/main/node-app/routes): these files define the routing  methods of the Express app object that correspond to HTTP methods such as get, and post.
    - [sql](https://github.com/crsalves/i-audit/tree/main/node-app/sql): it holds the scripts folder and the schema files.
    - [views](https://github.com/crsalves/i-audit/tree/main/node-app/views): it holds the partial folder that contains the header.ejs and footer.ejs files. In addition, this directory has the all web pages available in this application.
    
    Furthermore, it contains javacript files to configure and connect the database. Moreover, it holds some json files. Finally, there is the sever.js that is the main file of the application.
    
  
  #### Project Structure
  This project contains two main folders:
- [docker/mysql](https://github.com/crsalves/i-audit/tree/main/docker/mysql): contains a docker-compose file used to run a docker container with a MySQL database. 
- [node-app](https://github.com/crsalves/i-audit/tree/main/node-app): hosts the code of the main node.js backend application. 
  
  
#### Screenshots

![image](https://user-images.githubusercontent.com/43006731/147156977-497f1606-6a54-4c50-848a-c6ee94013cff.png)

![image](https://user-images.githubusercontent.com/43006731/147157956-7725bf38-f338-4348-80a1-3786cc55bb51.png)

![image](https://user-images.githubusercontent.com/43006731/147157986-63b9b416-de42-457f-9b2e-5ec2c1f30b0f.png)
