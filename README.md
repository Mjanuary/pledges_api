this is the backend api

inorder to use it well

\*1st run npm install to install all package

to start in development server

\*run npm run dev

this ☝🏿 command will start nodemon

**\*\*\*\***\_**\*\*\*\*** about database make sure you imported database in postgres dbms \***\*\_\_\_\*\***

you have to make same hanges about in config folder

\*path: config/default.json

change this lines 👇🏾 according to your postgres database

/\*\*\*\*

"user": "postgres",
"host": "localhost",
"database": "imihigo_db",
"password": "test@123",
"port": 5432,

\*\*\*/

****\*\*****\_\_\_****\*\***** about files some changes you have to make **\*\*\*\***\_\_**\*\*\*\***

⭐ make sure before you register user you network otherwise you will get error ➡ "email not send" but user will be
registered

⭐ in user router line 111 you have to change to your email ohterwise you don't get an email of registered user or get an error "email not send"
