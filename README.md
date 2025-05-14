# Sweet-Tooth
**Sweet-Tooth** is a full-stack web application built using the MERN Stack. It is an online platform for the purpose of ordering sweets and deserts. It boasts a Client as well as an Admin Interface allowing for a smooth and effortless experiance for the User and the Administrantion Management Team

---

## Project Features

### User Interface
1. Browse sweet items by category
2. Search for specific items
3. Popup card that provides details about the sweet as well as allergen information
4. Deactivation of unavailable items
5. User Login as well as New User Sign-Up
6. User Logout feature
7. Reset password facility for User
8. Add One, Reduce One and Completely Remove items at checkout
9. Marks items in cart that are unavailable
10. An orders page that shows Pending and Completed Orders
11. Custom Payment Stimulator to test for payment success and failure (integerated in this manner as Stripe Payment was not available in my region)
12. An About Section that provides details about the organisation
13. A Terms and Condition and Privacy Policy section

### Admin Interface
1. Admin Login and Logout feature
2. Admin Dashboard that lists various functions
3. Reset password feature for Admin
4. Add / Edit / Delete a sweet category
5. Add / Edit / Delete a sweet item
6. Admin Authentication for every add / edit / delete action
7. Mark a sweet item as Availble / Unavailbale
8. Show and Update the status of pending orders
9. Show all completed orders

### Other Features
1. JWT Authentication
2. Check for Admin User Validity on Admin Interface
3. Password Hashing with Bcrypt
4. Toast type alerts for Sucess and Error messages
5. Storing User, Order, Category and Sweet Item Information in database
6. Storing Category and Sweet Item Images on database
7. Cleans up input for item and category addition by handling issues of case-sentivity and trailing spaces

---

## Access for Admin Dashboard
1. Create a User in Sign Up Page
2. Hard Code User Role to "admin" in the data base

---

## Tech Stack Used
- React JS
- CSS
- Node JS
- Express JS
- Mongo DB

 ---

## Run Locally
1. Run frontend and admin interface : npm run dev
2. Run backend : nodemone server.js
3. Add .env file which provides values for MONGO_COMPASS_URI and JWT_SECRET
 
  ---

  
  
