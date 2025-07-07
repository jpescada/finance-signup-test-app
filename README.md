# Finance Signup Test App

This is a simple React application with a Django backend for a finance signup process.  
⏰ It was created as a time-constrained test for a job application (<2h). 

🎯 The goal was not to have a pretty and fully functional webapp, but rather to demonstrate the ability to set up a full stack application and meet the requirements outlined in the coding assignment.  

🤖 As my experience creating Django applications from scratch is limited, I had to rely heavily on GitHub Copilot for the implementation. 

## Frontend Setup

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

## Backend Setup

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run migrations:
    ```bash
    python manage.py migrate
    ```

5. Create a superuser:
    ```bash
    python manage.py createsuperuser
    ```

6. Seed DocumentType:
    ```bash
    python manage.py shell
    ```
    Then run the following commands in the shell:
    ```python
    from onboarding.models import DocumentType
    DocumentType.objects.create(name='Certificate of Incorporation', description='Business incorporation document')
    ```
7. Start the development server:
    ```bash
    python manage.py runserver
    ```

8. Access the frontend at http://localhost:3000
   and the admin panel at http://localhost:8000/admin


## Assumptions
- One active application per user
- File uploads limited to PDF, JPG, PNG (<5MB)
- Admin manually enters pushback reasons via Django admin

## Stretch Goal: Garbage Document Mitigation
- Frontend: Restricts upload to specific file types (PDF, JPG, PNG)
- Backend: Validates uploaded file types (PDF, JPG, PNG) and size (<5MB)

- Not implemented: 
  - Add a preview of the uploaded file and ask the user to confirm before final submission
  - Integrate OCR to find relevant text in uploaded files (eg: "Certificate of Incorporation")
  - Use machine learning (e.g., Google Cloud Vision API) to analyze document content
