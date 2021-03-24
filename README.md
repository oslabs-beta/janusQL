<h1 align="center">JanusQL</h1>

<p align="center">
  <img src=https://img.shields.io/badge/React-^16.13.1-yellow>
  <img src=https://img.shields.io/badge/Electron-^8.2.2-yellow>
  <img src=https://img.shields.io/badge/node-^12.13.0-yellow>
  <img src=https://img.shields.io/badge/Redis-^3.0.2-yellow>
  <img src=https://img.shields.io/badge/Typescript-94%25-yellow>
</p>

<p align="center">
  <img width="600" src=https://user-images.githubusercontent.com/75049208/112365029-660b5800-8c94-11eb-9836-fe5264d4a0e5.png> <br>
</p>

# **Description**
JanusQL is an easy-to-use Electron powered GUI for GraphQL API security and performance testing. It allows users to test the performance of their GraphQL API by displaying a query's response time, throughput, andd loadcapacity. It can also test if their GraphQL API is protected against DDOS attacks.

Users can keep track of all analytics ran while exploring the API by sending it different kinds of data to see what values are returned.

Currently in Beta.

# **Installation**
To get started, download the [application](https://www.janusql.com/) from our website, which is available on MacOS, Window, and Linux.

Now, let's generate some tests!

# **How to use**
Sign up for an account, or if already registered, log into the application using your credentials. 

## **Viewing Analytics Information**
After logging in, you'll see three sections - an area to input the URI of the GraphQL API along with a code editor, another code editor, and the analytics sections.

### **Testing response time, throughput, or load** <br>
Enter the URL of the GraphQL API and type in the query you want to test. <br>
*insert photo/gif*

### Response Time, Query Overhead, Status and Throughput Testing <br>
Choose from the drop down menu, _Response/Data_, and click on the _Submit_ button to get the response time plotted on the graph, the status of the query, and the throughput time. Click on the _Submit_ button again to plot more response times on the graph. <br>
*insert photo of graph*

### Throughput Testing <br>
Click on the throughput button to find out how many responses we can get back within a second. <br>
*insert photo of throughput section and arrow pointing to it*

### Load Testing <br>
Click on the load button to find out how long it takes to query this query 50 times. <br>
*insert photo*

### Testing the security of your GraphQL API <br>
Enter the URL of the GraphQL API. You don't need to enter a query string. If a query is entered, it won't affect the results. Then click on the 

# Tech Stack
Javascript, Typescript, React (Hooks, Router, Context API), Express/Node.js, Electron, Redis, Material UI, Webpack, Jest, Supertest, Enzyme

# Read More
Medium article

## Co-Creators: <br>
Adrian Inza-Cruz - [@ainzacruz](https://github.com/ainzacruz) | [LinkedIn](https://www.linkedin.com/in/adrian-inza-cruz/)<br>
Kim Chiu - [@kimchiuu](https://github.com/kimchiuu) | [LinkedIn](https://www.linkedin.com/in/kimchiuu/)<br> 
Lucas Mobley - [@lucasmobley](https://github.com/lucasmobley) | [LinkedIn](https://www.linkedin.com/in/lucasmobley/)<br>
Phillip Kekoa Bannister - [@phillipkb](https://github.com/phillipkb) | [LinkedIn](https://www.linkedin.com/in/phillipkekoabannister/)<br>
Tammy Le - [@letammy979](https://github.com/letammy979) | [LinkedIn](https://www.linkedin.com/in/letammy/)
