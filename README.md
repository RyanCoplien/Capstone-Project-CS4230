# Application and Information Systems Capstone Project

This project is an accumulation of programs and modules created for CS 4230 (Application in Information Systems)
Out of a total of 10 project parts, it mainly utilizes Javascript and MongoDB, as well as Python to process:
  - Creation and updating of sequential and indexed, fixed, and variable-length records
  - Implementation of various sorting algorithims including BubbleSort, QuickSort and MongoDB sort, comparing the execution time
  - Implementation of various searching algorithims including Sequential Search, Binary Search and MongoDB find, comparing the execution time
  - Modularization of code, using HTML and JS templates to neatly organize structures
  - Implementation of string processing within Javascript and MongoDB, using both client-side JS and server-side MongoDB to calculate results and compare execution time
  - Managing and testing code through integration testing practices inside installation, UI, and database cases
  - Managing feature requests and test plans through co-operation with other teams on "enhancement requests" and descriptions of test plans
Addtionally, the project contains usecase diagrams, data flow diagrams, architecture diagrams, and a presentation of the project
 
INSTRUCTION FOR RUNNING:

1. Navigate to where the main Folder is and open the main Folder in terminal. (cd to where the file is located)
2. Have Meteor (https://www.meteor.com/install) and MongoDB (https://docs.mongodb.com/manual/installation/) installed.
3. Install meteor npm install @babel/runtime@latest meteor-node-stubs@latest
4. Start Meteor from there (Meteor run).
5. Open the link from terminal (This is usally http://localhost:3000/).


MongoDB Instructions:

This can be done through commands or utiling the MongoDB Compass. I would reccomend the compass as its very easy to do this compared to commands but links to commands are also provided.

1. Create a MongoDB database called Hospital (https://beginnersbook.com/2017/09/mongodb-create-database/). 
2. Create collection called RawData (https://beginnersbook.com/2017/09/mongodb-create-collection/).
3. Import data.csv into RawData (https://kb.objectrocket.com/mongo-db/how-to-import-a-csv-into-mongodb-327).
4. Run the follwoing command before running the Meteor: meteor npm install --save mongodb

Contributors include Jack Rasmussen, Bailey Watkins, Michael Kelly II, and Ryan Coplien
