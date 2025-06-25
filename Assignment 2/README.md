File management tool using core modules:

The project uses nodemon for live server updation. 
Check package.json for dependencies.

You can simply type the following command to run the server:
npm start

Server will run at : http://localhost:3000

You can use Postman API for testing or send requests in the following format:

Reading:
GET /read?file=filename.txt
http://localhost:3000/read?file=example.txt

Creation:
POST /create?file=filename.txt&content=YourTextHere
http://localhost:3000/create?file=hello.txt&content=HelloWorld

Deletion:
DELETE /delete?file=filename.txt
http://localhost:3000/delete?file=hello.txt

I'd love to hear your feedback: aayush.makhija@gmail.com