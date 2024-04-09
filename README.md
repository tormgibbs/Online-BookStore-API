# Online-BookStore-API
An API for managing an online bookstore with MongoDB, Node js and Express

## INSTALLATION.

-  Clone the repository: git clone https://github.com/tormgibbs/Online-BookStore-API
-  Navigate to project directory: cd Online-BookStore-API
-  Install dependencies using npm install command in your terminal or cmd : npm install
-  Start server by running nodemon server.js (if you have installed nodemon) else use node server.js
-  Open http://localhost:8000 on your browser to see the documentation of APIs.
  
##  FEATURES OF THE PROJECT
1. User Registration & Login: Users can register themselves into the system and then login to access other functionalities.
1. User Registration & Authentication
2. Manage Books (Create, Read, Update, Delete a Book)
3. Search For Books By Title, Author, Genre etc.
4. Add / Remove books from Shopping Cart
5. Place Order
6. Payment Gateway Integration (Stripe is used as payment gateway)
7. Send Email Confirmations To Users After Signing Up And Placing Orders
8. Admin Dashboard With CRUD Operations On Books, Users, Orders, Reviews
9. Implemented JWT based authentication for restricted routes.

### NOTE: The provided codebase assumes that Stripe
public key has been added to the .env file. If not present, please add it there. Also, make sure to set up the email service keys are stored in environment variables which need to be keys are stored in environment variables. You need to keys are stored in environment variables. If not present keys are stored in environment variables. If not set keys are stored in environment variables. 

