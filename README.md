# **Centerstone Referral Management System**  
![image](https://github.com/user-attachments/assets/dcc7f460-fa30-40f3-b973-16af8c311da8)

## **Project Overview**  
The **Centerstone Referral Management System** is a web-based application designed to streamline client referral and follow-up processes for crisis counselors. The system improves efficiency by automating referral tracking, follow-up activities, and data visualization, ensuring timely and appropriate client support.  

## **Features**  
- **Secure User Authentication**: Role-based access control for counselors, follow-up staff, and administrators.  
- **Resource Management**: CRUD operations for organizations, including service details and location-based search.  
- **Referral System**: Smart recommendations based on referral type, age group, and zip code.  
- **Follow-Up Module**: Tracks case status, records follow-up outcomes, and logs contact history.  
- **Data Visualization & Reports**: Generates charts, tables, and spatial maps for insights.  
- **Automation & Integration**: Real-time data updates, minimizing manual effort.  
- **HIPAA Compliance**: Ensures data security and regulatory compliance.  

## **Technology Stack**  
- **Frontend**: React.js  
- **Backend**: Node.js / Django  
- **Database**: MySQL / PostgreSQL  
- **Cloud Hosting**: AWS / Google Cloud (TBD)  
- **Version Control**: GitHub  

## **Project Structure**  
```
/centerstone-referral-system  
│── backend/               # Backend API (Node.js / Django)  
│── frontend/              # Frontend UI (React.js)  
│── database/              # Database Schema & Scripts (MySQL / PostgreSQL)  
│── docs/                  # Documentation, ER diagrams  
│── tests/                 # Unit & integration tests  
│── .gitignore  
│── README.md  
│── LICENSE  
```

## **Installation & Setup**  
### **1. Clone the Repository**  
```sh
git clone https://github.com/your-repo/centerstone-referral.git  
cd centerstone-referral  
```

### **2. Backend Setup**  
- Install dependencies:  
  ```sh
  cd backend  
  npm install  # or pip install -r requirements.txt for Django  
  ```  
- Set up environment variables in `.env`.  
- Start the backend server:  
  ```sh
  npm start  # or python manage.py runserver  
  ```  

### **3. Frontend Setup**  
- Install dependencies:  
  ```sh
  cd frontend  
  npm install  
  ```  
- Start the React development server:  
  ```sh
  npm start  
  ```  

### **4. Database Setup**  
- Set up MySQL or PostgreSQL.  
- Run migration scripts:  
  ```sh
  mysql -u root -p < database/schema.sql  
  ```  

## **Usage**  
- Login using role-based credentials.  
- Add & manage organizations in the resource module.  
- Create & manage client referrals.  
- Track follow-ups & generate reports.  

## **Deployment**  
- **Cloud Hosting**: AWS / Google Cloud  
- **Production Build**:  
  ```sh
  npm run build  
  ```  
- **Containerization (Optional)**:  
  ```sh
  docker-compose up -d  
  ```

## **Contributing**  
- Fork the repository  
- Create a feature branch  
- Submit a pull request  

## **License**  
This project is licensed under Jaya Prakash Narayana Raavi.  
