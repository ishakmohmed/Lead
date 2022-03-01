# Lead!

### Note to myself: you didn't use the custom hook called useApi to its maximum capabilities in this project.

### [1] See Live Version Immediately
Since I don't have an iPhone or Mac yet as of the development of this app, I couldn't test the application on iPhone although this is a cross-platform app. If you're an Android user, you can head over to the following link to install the application's APK: https://drive.google.com/file/d/1nwjxhIJCalZeTouFtGETD8-4cdLHNpZF/view?usp=sharing

### [2] Demo Credentials (also included in login page)
* Email: masteruser@email.com
* Password: Masteruser975

### [3] Introduction
"Lead!" is a full stack, cross-platform mobile application that I've built to elect board members of clubs and societies at my university. With this app, users can vote for their favourite candidates, add new session, end a session (only creator can end a session), edit profile, and so on. It is built using React Native, Node.js, Express.js, MongoDB, and other technologies.

### [4] Technologies Used/Features Implemented
* React Native
* React Navigation
* React Hooks
* Expo 
* Apisauce
* Formik
* Yup
* Node
* Express
* MongoDB
* Mongoose
* Caching
* JWT authentication
* Heroku 
* LottieFiles

Note: no design library is used. The entire UI of this application is built from the ground up.

### [5] Some Screenshots (Not All)
![Mohmed Ishak](https://user-images.githubusercontent.com/52876913/147257836-e5c1d33b-32c0-4db6-8d04-0681c42e8d04.png)
![Mohmed Ishak](https://user-images.githubusercontent.com/52876913/147257770-0a5980d2-7759-4507-9462-c4faee0d39fe.png)
![Mohmed Ishak](https://user-images.githubusercontent.com/52876913/147257775-87198e9c-6a0a-4c2e-8073-9187a4558e23.png)
![Mohmed Ishak](https://user-images.githubusercontent.com/52876913/147257760-b57b2fd1-1ebe-4d98-b03f-9afef0ed8be8.png)
![Mohmed Ishak](https://user-images.githubusercontent.com/52876913/147257787-7389c39e-8009-4b36-a0d4-6b24c770eac7.png)
![Mohmed Ishak](https://user-images.githubusercontent.com/52876913/147257780-77f070e2-65b3-4185-bf72-461723b30e2d.png)
![Mohmed Ishak](https://user-images.githubusercontent.com/52876913/147257782-7832c7e1-bdf0-4945-acba-61cd6d724a13.png)
![Mohmed Ishak](https://user-images.githubusercontent.com/52876913/147257777-c1f29208-55d4-424b-bf89-278741332c66.png)
![Mohmed Ishak](https://user-images.githubusercontent.com/52876913/147257778-70f30c08-5cb1-44d6-8f5a-f685b4853ccb.png)

### [6] How to Run the Project Locally
If you want to just view the completed, hosted version of this app, refer point 1 above. Otherwise, keep reading. Fork this repository and clone it to your machine. Make sure you've got Node, MongoDB, and Expo CLI installed on your machine. Also, install Expo Go on your mobile phone. You may Google how to do so as it's very simple and I don't want to pollute my README file and bore you with too much of instructions. In the backend folder, add a `.env` file and paste the following code:
    
    NODE_ENV=development
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/temporaryDB
    JWT_SECRET_KEY=thisisademojwtsecretkey
Then install all frontend and backend dependencies for frontend and backend folder individually. In frontend folder, there's a subfolder called ```config``` which has a file named ```settings.js```. Change the development URL to the URL of your local backend including the IP address of your backend. Run the backend server using ```nodemon index.js``` from backend folder. Launch the app from the frontend folder using ```npm start```. A website will be launched. Follow the instructions in that site to view the app on your mobile phone (usually you just need to scan the QR code from your Expo Go app). If the instructions change in future, please paste this phrase to Google search engine and do a super quick research: "How to run an Expo app from my mobile phone".  

### [7] Hosting
* Frontend: -
* Backend: Heroku
* Database: MongoDB Atlas
