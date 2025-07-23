# 🐾 Adaptable - Full-Stack Animal Shelter Platform

[Live Demo](https://syavayki.github.io/adaptable-site/)

![License](https://img.shields.io/badge/license-MIT-blue.svg)

## About The Project

Every year, millions of wonderful, loving animals wait in shelters for a second chance. Adaptable was created to bridge the gap between these pets and potential adopters. We tackle the common frustrations of the adoption journey—like visiting multiple shelters and browsing outdated websites—by creating a single, reliable, and seamless experience.

By leveraging modern technology, including an AI-powered assistant, we make finding and adopting a pet easier and more joyful than ever before.

### Key Goals

- **Connect Animals with Families**: Help homeless animals find loving and permanent homes.
- **Streamline the Adoption Process**: Simplify the adoption workflow for both shelters and adopters.
- **Increase Shelter Support**: Provide easy and accessible ways for the community to donate and volunteer.
- **Educate the Community**: Share valuable information about responsible pet ownership and animal welfare.

---

## ✨ Features

### For Visitors & Adopters

- 🔍 **Advanced Pet Catalog**: Browse, search, and filter available animals by type, age, size, breed, and other characteristics.
- 🤖 **AI-Powered Pet Matching**: An intelligent agent (in development) asks personalized questions to recommend the perfect pet for your lifestyle.
- ❤️ **Favorites List**: Save pets you're interested in to your personal list.
- 📝 **Online Applications**: Submit adoption applications and schedule appointments directly through the platform.
- 📱 **Responsive Design**: Enjoy a seamless experience on desktop, tablet, and mobile devices.
- 💰 **Donation System**: Support the shelter through secure online donations.
- 📚 **Educational Content**: Learn about pet care, training, and the importance of adoption.
- 📧 **Newsletter & Contact**: Sign up for updates and easily communicate with shelter staff.

### For Shelter Staff

- 🏥 **Pet Management**: Add, update, and manage pet profiles, including descriptions, characteristics, and multiple photos.
- 📋 **Application Review**: View and manage incoming adoption applications and appointments.
- 👥 **User Management**: Secure registration, login, and account management for adopters.
- 🔒 **Admin Panel**: A comprehensive admin interface to manage users, pets, and site content.
- 📄 **API Documentation**: Interactive API documentation with Swagger and Redoc.

---

## 🛠️ Technologies Used

- **Frontend:** React, TypeScript, Redux Toolkit, React Router, Bulma, SCSS
- **Backend:** Django, Django REST Framework, Celery, Celery-beat, Redis
- **Database:** PostgreSQL (configured via Docker)
- **Containerization:** Docker & Docker Compose
- **Mail Service:** Mailtrap for development and testing.
- **API Testing**: Postman
- **Version Control**: Git

---

## 🚀 Getting Started

To get a local copy of the project up and running, please follow these steps.

### Prerequisites

- [Docker](https://www.docker.com/get-started) and [Docker Compose](https://docs.docker.com/compose/install/) must be installed on your machine.
- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) for the frontend setup.

### Backend Setup (Docker)

1.  Navigate to the project root and then into the `backend` directory.
    ```bash
    cd backend/
    ```
2.  Rename `.env.sample` to `.env` and configure the environment variables as needed.
3.  Build and start the backend services using Docker Compose.
    ```bash
    docker compose up --build
    ```
4.  To stop the services, run `docker compose down`.
5.  Create a superuser to access the Django admin panel.
    ```bash
    docker compose exec shelter python manage.py createsuperuser
    ```
6.  Access the admin panel at [http://127.0.0.1:8000/admin/](http://127.0.0.1:8000/admin/).

#### API Documentation

Once the backend is running, you can access the interactive API documentation:

- **Swagger UI**: [http://127.0.0.1:8000/api/v1/swagger/](http://127.0.0.1:8000/api/v1/swagger/)
- **Redoc**: [http://127.0.0.1:8000/api/v1/redoc/](http://127.0.0.1:8000/api/v1/redoc/)

### Frontend Setup

1.  From the project root, navigate to the `frontend` directory.
    ```bash
    cd frontend
    ```
2.  Install the necessary dependencies.
    ```bash
    npm install
    ```
3.  Create a `.env` file and add the backend API URL.
    ```
    REACT_APP_PET_API_BASE_URL=[http://127.0.0.1:8000](http://127.0.0.1:8000)
    ```
4.  Start the local development server.
    ```bash
    npm start
    ```
5.  Visit the application at [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔮 Future Enhancements

- [ ] Advanced matching algorithm for pets and adopters.
- [ ] Real-time chat system for adopter/shelter communication.
- [ ] Volunteer management and scheduling system.
- [ ] Integration with social media platforms for sharing pet profiles.
- [ ] Multi-language support.

---

## 🤝 Contributing

Contributions make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**. Please fork the repo and create a pull request, or open an issue with your suggestions.

---

## 📧 Contact

- **Project Maintainer (Frontend)**: Sviatoslav Podolskyi
- **Project Maintainer (Backend)**: Roman Sokolov - gnonasis@gmail.com - [@Roman-Sokolov-V](https://github.com/Roman-Sokolov-V)

---

## 🙏 Acknowledgments

- To all the volunteers and staff who dedicate their time to helping animals find loving homes.
- To the open-source community for providing the excellent tools and libraries that made this project possible.

**Made with ❤️ for animals in need.**
