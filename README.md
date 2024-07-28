# Simple React JS Project

## What is the use of this Repo

This Project is a Book Ecommerce store using ReactJs which includes the following functionalities :

1. Google books API is used in this project so You can search any book by its name, author or genre.
2. You can see the Details of the book by clicking the details button or you can add the book to the cart if looged in
3. You can sign up and Login, Right now the authentication data is stored in the local storage.
4. You can see the cart and also manupulate the quanity as well as you can remove items from the cart or you can empty the cart comletely.
5. A demo payment gatway is created so that a purchase experience can be given to users.

## Prerequisites

### Install Node JS

Refer to https://nodejs.org/en/ to install nodejs

## Live Application URL

The Application is deployed in https://Yet to be updated.

Click on the link to see the application

## Cloning and Running the Application in local

Clone the project into local

Install all the npm packages. Go into the project folder and type the following command to install all npm packages

```bash
npm install
```

In order to run the application Type the following command

```bash
npm start
```

The Application Runs on **localhost:3000**

## Application design

### Pages

1. **Homepage** : Here you can see header main page and a fotter. You can search books here and also you can login and signup.
2. **Books Page** : you can see the books here according to your search criteria, you can add the book to your cart or you can see the details of the book

3. **Book Detail Page** : you will see the details of the book here like Name of the books, Author, Category of the book, price and page count.

4. **Cart Page** : here you will see the books you added to the cart. You can increase or decrease the quantity of the books, remove the item, clear the cart or you can chekout and proceed to dummy payments.

5. **Login Page** : Here you will see the login page wher you can login to your account if you previously signed up.

6. **Sign Up Page** : you can sign up for your account here, some validation rules are required.

#### HTTP client

**axios** library is used to make API Calls

## Resources

**create-react-app** : The following link has all Resources :
https://github.com/Deepanshu1337/Bookworm

**ReactJS** : Refer to https://reactjs.org/ to understand the concepts of ReactJS
