How to Run the App
1.	Extract the Project
Unzip the zipped project folder.
2.	Open the Project in VS Code
Launch Visual Studio Code (VS Code) and open the extracted project folder.
3.	Start the Backend Server
Open a new terminal in VS Code.
Navigate to the backend folder:
cd backend
4.	Start the server
npm start
This ensures the server is running and the MongoDB database is connected.
5.	Start the Frontend
Open another terminal.
Navigate to the frontend folder:
cd frontend
Start the frontend:
npm start
The frontend will launch in your default web browser, where you can interact with the application.

Note: 
You may need to create your own mongodb link and replace it my link in the backend/.env file
You may need to commit/host the project in your github account

User Roles & Functionalities
The app has three user roles: Customer, Professional, and Administrator.
1. Customer
✅ Account Management
•	Register or log in using email and password.
•	Log out at any time.
✅ Requesting a Service
•	Choose a service category from a dropdown (e.g., Carpenter, Electrician, Plumber, Locksmith, Mason, Painter, etc.).
•	Fill out a request form with:
o	Problem description
o	Urgency level
o	Location
•	Submit the request.
✅ Finding a Professional
•	The system suggests available professionals based on location and availability.
•	View a list of nearby technicians along with their service categories.
•	Select a technician and confirm the request.
•	Receive a tracking code after confirmation.
✅ Service & Payment Process
•	Once a professional accepts the request, they can:
o	Check In → Starts a time countdown.
o	Check Out → Stops the countdown and prompts payment.
•	The service cost is $80/hr.
•	Payment is made via PayPal, requiring only the PayPal email.
✅ Rating & Reviews
•	After the service is completed and paid for, customers can:
o	Rate the professional (1-5 stars).
o	Leave a comment in a textbox.

2. Professional
✅ Account Management
•	Register or log in using email and password.
•	Log out at any time.
✅ Verification & Profile Activation
•	Sign a digital contract (mandatory checkbox) before activation.
•	Upload required documents (ID/Passport + Academic Certificate).
•	Once approved, professionals can log in and start receiving requests.
✅ Dashboard Functionalities
•	Edit and update profile details.
•	View customer reviews from previous jobs.
•	Define availability (days and times they can work).
•	View assigned calls/requests with details:
o	Problem description, urgency, location, date, and time.
✅ Accepting & Completing Requests
•	Accept or decline requests based on availability.
•	Check In → Starts the timer when the work begins.
•	Check Out → Stops the timer and prompts the customer for payment.

3. Administrator
✅ Account Management
•	Register using a secret code (333444).
•	Log in using email and password.
•	Log out at any time.
✅ Verifying Professionals
•	View and verify professional documents and information.
•	Approve verified professionals, allowing them to receive service requests.
✅ Reports & Financial Tracking
•	Generate income reports showing the total earnings of all professionals over time.
