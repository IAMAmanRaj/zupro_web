# Zupro Web

## Deployments

| Entity | Platform | URL Endpoint |
| :--- | :--- | :--- |
| **Web App Frontend** | **Vercel** | [Live Demo](https://zupro-web.vercel.app/) |

## Technologies Used

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![TanStack Router](https://img.shields.io/badge/TanStack_Router-1-FF4154)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-0055FF)

## Run Locally

Clone the project

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
```

Go to the project directory

```bash
cd YOUR_REPO
```

Install dependencies

```bash
npm install
```

Start development server

```bash
npm run dev
```

Then open the local URL shown in terminal (usually [http://localhost:5173](http://localhost:5173)).

## Features

- Home page with hero carousel and feature cards
- Onboarding role selection modal (Seeker / Employer)
- Dedicated onboarding flows:
  - Seeker onboarding form
  - Employer onboarding form
- Auth flow with phone + OTP UI
- Responsive layout for mobile and desktop

## Project Structure

```txt
|-- public/                         # Static assets
|-- src/
|   |-- features/
|   |   |-- auth/                   # Auth UI components (PhoneStep, OtpSection)
|   |   |-- home/                   # Home page components + constants
|   |   `-- onboarding/             # Seeker/Employer onboarding form components
|   |-- routes/
|   |   |-- index.tsx               # Home route
|   |   |-- auth.tsx                # Auth route
|   |   `-- onboarding/             # Role-based onboarding routes
|   |-- index.css                   # Global styles
|   `-- main.tsx                    # App entry
|-- index.html
`-- vite.config.ts
```

## Feedback

If you have any feedback, please reach out at **imamanraj87@gmail.com**.

## Related

Check out my other projects:

[Projects Section](https://github.com/IAMAmanRaj?tab=repositories)
