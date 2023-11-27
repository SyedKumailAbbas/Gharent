APIs:
/posts 
/posts/byid/
/comments
/comments/
/auth/register

Before starting project these modules you have to download;
FOR BACKEND:
	express
	cors
	nodemon
	mysql2
	sequelize
	sequelize-cli
	npm install -g sequelize-cli (if sequelize-cli not introduced to your terminal or cmd)
	bcrypt
	jsonwebtoken

Here we are using INSOMNIA for manual api testing in place of POSTMAN api

"nodemon": "^3.0.1",

USER TABLE STRUCTURE FOR API TESTING
	{
			"username":"kumail123",
			"firstname":"Kumail",
			"lastname":"Abbas",
			"gender":"male",
			"phoneno": "12345678901",
			"email":"Kumailabbas46@gmail.com",
			"password":"noice12N"
	}
POSTS TABLE STRUCTURE FOR API TESTING
{
  "Title":"New post number 1",
  "Description": "here is the description of the first post",
  "Price":34000
}


FOR FRONTEND:
install 
	axios
	react-router-dom
	formik	
	yup
	styled-components
