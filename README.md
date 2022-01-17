# i-audit

### Table of Content

- [About](#about)
- [System Design](#system-design)
  - [1. Functional Requirements](#1-functional-requirements)
  - [2. Database Schema](#2-database-schema)
  - [3. Node-app Design](#3-node-app-design)
- [Project Local Setup:](#project-local-setup)
- [Other folders](#other-folders)
  - [1. docker](#1-docker)
  - [2. Scripts](#2-scripts)
- [Screenshot](#screenshot)
 
## About

The project's goal is to build a web application for financial management. The I-Audit website is a personal project that I've been working on to learn and practice modern technologies used to develop software applications. In this project, the frontend and the backend parts are implemented in a single component. Node.js, Javascript, and EJS are the tools I used to develop the system's backend part. The frontend code was generated using HTML, CSS, and Javascript. MySQL is the database used to store the application's data. Also, I worked with Docker containers to host the MySQL database and the node application.

The following sections contain more details about the project:

## System Design

This section contains details of the I-Audit system design.

##### 1. Functional Requirements

   Functional requirements define the features that a system should have. So, this section describes the main functional requirements of the I-Audit system:

 * The system should have register, login, and logout functions
 * The system should allow the user to record debit/credit transactions among the items on the category list:
    - Cash Back
    - Education
    - Electricity
    - Entertainment
    - Food
    - House Rent
    - Internet
    - Personal Care
    - Phone
    - Salary
    - Transportation
 * The system should allow the users to **edit** and **delete** transactions already registered
 * The system should allow the users to add a new bank account
 * The system should allow the users to filter the transactions by month and year
 * The system should allow the users to see the balance of the account after each transaction      
   

##### 2. Database Schema

   This section contains the database schema designed to support the implementation of the functional requirements.
   First, I designed the tables and their relationships through the UML diagram. Some tables have one-to-many relations, while others have one-to-one relations, but none has a many-to-many relationship. Second, I created the schema using the MySQL Workbench.

   ![image](https://github.com/crsalves/i-audit/blob/main/docs/sql/er-schema.jpg)


##### 3. Node-app Design

[node-app](https://github.com/crsalves/i-audit/tree/main/node-app): hosts the code of the main node.js backend application. This folder hosts the code responsible for the I-Audit application's backend and frontend parts. The project organization is based on the model-view-controller pattern (MVC). The MVC is a software design pattern used to organize the program logic into three interconnected components (model, view, and controller). Below are the details of the following subfolders:

- [controller](https://github.com/crsalves/i-audit/tree/main/node-app/controller): files containing the codes with the logic of the program.
- [model](https://github.com/crsalves/i-audit/tree/main/node-app/model): files containing the database query for CRUD functions.
- [public](https://github.com/crsalves/i-audit/tree/main/node-app/public): it holds the CSS folder and the index.js that contains the jQuery coding.
- [routes](https://github.com/crsalves/i-audit/tree/main/node-app/routes): these files define the routing methods of the Express app object that correspond to HTTP, such as the get and post methods.
- [views](https://github.com/crsalves/i-audit/tree/main/node-app/views): it holds the partial folder that contains the header.ejs and footer.ejs files. In addition, this directory has all web pages available in this application.

  Furthermore, it contains javascript files to configure and connect the database. Moreover, it holds some JSON files.
  Finally, there is the sever.js that is the main file of the application.

## Project Local Setup:

These are the steps required to run the project:

1. Clone the repository from github

         git clone git@github.com:crsalves/i-audit.git

2. Open the project in an IDE (for example: WebStorm);
3. Setup the **database**:
   
   In this step, we use docker-compose to setup a MySQL database. Below are the required steps:

   I) Using a command line, go to the folder docker/mysql:   

         cd ./docker/mysql

   II) Now, we create a container using a docker-compose file. First, confirm that you have the docker installed running the command `docker -v`. Then, run the command below: 

         docker-compose -f ./mysql-compose.yml up -d

   <i>Additional information to generate the mysql container without docker-compose:</i>

         docker run --name mysql-i-audit --hostname mysql-i-audit -p 3307:3306 -e MYSQL_ROOT_PASSWORD=password -d mysql:5.7
   
   III) Check if the mysql container is running. You should see a container named `mysql-i-audit` in the list of running containers:

         docker ps

   IV) Setup a new connection in the MySQL Workbench to run the database script and create the tables used by this application:
      - Create connection with `Connection Name: i-audit-db` and `Port: 3307` which is the port of your computer that will be used by this container   
   
      ![image](https://github.com/crsalves/i-audit/blob/main/docs/sql/workbench-screenshot/1-create-connection.png)

      - Click on `Test connection` and get the message `Successfully made the MySQL connection`. Note, if it asks for a password, then you can simply use the word `password`
   
      ![image](https://github.com/crsalves/i-audit/blob/main/docs/sql/workbench-screenshot/2-test-connection.png)        

      - Store the passport in Keychain using the word `password` as your password
     
   ![image](https://github.com/crsalves/i-audit/blob/main/docs/sql/workbench-screenshot/3-password-keychain.png)

      - Click `ok`

   V) On `File`, click `Open SQL Script`, go to the folder `scripts` and open `i-audit.sql` file that contains the sql script code required for this application.
   
   VI) Execute the entire script, and you should get the green check mark indicating the creation of the database.
   
   ![image](https://github.com/crsalves/i-audit/blob/main/docs/sql/workbench-screenshot/4-script-success.png)

   VII) Refresh the schemas in the left-hand side to see the `i_audit` database and its tables that hold the basic information to use this application.


4. Setup the **node-app**:

   In this step, we use docker-compose to setup the node-app. Below are the required steps:

   I) Using a command line, go to the folder docker/mysql:

         cd ./docker/node-app

   II) Now, we <u>build</u> an **image** and <u>create</u> a **container** using a docker-compose file. Run the command below:

         docker-compose -f ./node-compose.yml up

   <i>Additional information to generate the image and create the container for the node-app application without docker-compose:</i>

         docker build -t i-audit-img-node-app ./node-app

         docker run --name i-audit-container-node-app --hostname i-audit-node-app -p 8080:8080 i-audit-img-node-app

   III) Check if the node-app container is running. You should see a container named `i-audit-container-node-app` in the list of running containers:

         docker ps

5. Click on the Running on `http://0.0.0.0:8080/` or write `localhost:8080` in the Internet browser.
6. Register your account.
7. Insert bank account and transactions.

## Other folders

##### 1. docker

This folder contains Docker artifacts required to host and run the database and the node-app using Docker containers.

##### 2. Scripts

This folder holds the script to create, drop, and insert a few data into the database.

## Screenshot

Below are a few screenshots of the i-audit application:

![image](https://github.com/crsalves/i-audit/blob/main/docs/screenshot/transaction-page.png)

![image](https://github.com/crsalves/i-audit/blob/main/docs/screenshot/edit-modal.png)

![image](https://github.com/crsalves/i-audit/blob/main/docs/screenshot/delete-modal.png)
