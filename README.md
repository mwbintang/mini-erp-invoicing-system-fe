# Mini ERP Invoicing System - Frontend

## Project Overview
The Mini ERP Invoicing System Frontend is a modern, responsive web application designed to help businesses manage their customers, generate invoices, and monitor system activities. It provides an intuitive, high-performance user interface built to seamlessly integrate with a robust backend architecture.

## Tech Stack
* **Framework:** Next.js (App Router)
* **Library:** React
* **Language:** TypeScript
* **Styling:** TailwindCSS
* **State Management:** Zustand
* **Data Fetching & API:** Axios
* **Forms & Validation:** React Hook Form, Zod

## Live Demo
* **Frontend Application:** [https://mini-erp-invoicing-system-fe.vercel.app](https://mini-erp-invoicing-system-fe.vercel.app)

## Features
* **Secure Authentication:** JWT-based login with automated refresh token rotation.
* **Dashboard Overview:** Quick visual metrics on revenue and customer counts.
* **Customer Management:** Create, read, update, and manage customer records.
* **Invoice Generation:** Comprehensive invoice creation with dynamic item rows, automatic subtotal, and tax calculations.
* **Audit Logging:** System-wide action tracking for enhanced security and compliance.
* **Optimized UX:** Skeleton loaders for seamless transitions and robust error boundaries.

## Architecture & Architectural Decisions
1. **Feature-Based Module Structure:** The application separates concerns into distinct feature modules (`auth`, `customers`, `invoices`, `dashboard`, `audit-logs`). This approach ensures components, hooks, and types remain localized, making future migration to Micro-Frontends (MFE) seamless.
2. **Centralized API Management:** All backend requests are intercepted by a global Axios instance. It handles automatic response unwrapping, API versioning (e.g., `/api/v1`), and centralized error handling (toast notifications with Request IDs).
3. **Smart Refresh Token Flow:** When encountering a `401 Unauthorized` response, the interceptor automatically queues pending requests, attempts a silent token refresh, and replays the requests transparently.

## Folder Structure
```text
src/
├── app/               # Next.js App Router pages
├── components/        # Shared global UI components (Buttons, Inputs)
├── lib/               # Global utilities, Axios configs, and types
└── modules/           # Feature-based business logic
    ├── audit-logs/
    ├── auth/
    ├── customers/
    ├── dashboard/
    └── invoices/
```

## Installation
1. Clone the repository and navigate into the project directory:
   ```bash
   git clone <repo-url>
   cd mini-erp-web
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

## Environment Variables
Create a `.env` file in the root directory and configure the following variables:
```env
# The base URL of the backend API
NEXT_PUBLIC_API_URL=
```

## Future Improvements
* **Docker:** Containerize the frontend for unified deployment workflows.
* **API Versioning:** Dynamic version negotiation from the frontend.
* **CI/CD:** Automated testing and deployment pipelines.
* **Storybook:** UI component catalog and isolation testing.
* **Unit Testing:** Implement Jest and React Testing Library for critical logic.
* **PWA:** Add Service Workers and manifest for offline capabilities.
* **Internationalization (i18n):** Multi-language support.
