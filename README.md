# Bachelor Girls - Service Booking Platform

A modern, full-featured service booking and appointment management platform built with React, TypeScript, and Vite. This application enables users to browse services, book appointments with providers, manage bookings, and communicate through real-time messaging.

## 📋 Description

Bachelor Girls is a comprehensive service marketplace that connects service providers with customers. The platform features a robust booking system, real-time notifications, payment processing, calendar management, and an intuitive dashboard for both providers and customers. Built with modern web technologies, it offers a seamless user experience with responsive design and real-time updates.

## 🛠️ Tech Stack

### Core
- **React 19.1.0** - UI library with latest features
- **TypeScript 5.8.3** - Type-safe development
- **Vite 7.0.4** - Lightning-fast build tool and dev server

### State Management & Data Fetching
- **Redux Toolkit 2.9.0** - State management with RTK Query
- **React Redux 9.2.0** - React bindings for Redux
- **Redux Persist 6.0.0** - Persist and rehydrate Redux store

### UI Components & Styling
- **Tailwind CSS 4.1.11** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Shadcn/ui** - Re-usable component library
- **Lucide React** - Beautiful icon library
- **Framer Motion** - Animation library
- **Motion 12.23.22** - Advanced animations

### Forms & Validation
- **React Hook Form 7.63.0** - Performant form management
- **Zod 4.1.9** - TypeScript-first schema validation
- **@hookform/resolvers** - Form validation resolvers

### Routing & Navigation
- **React Router 7.6.3** - Client-side routing

### Real-time Features
- **Laravel Echo 2.2.4** - WebSocket event broadcasting
- **Pusher JS 8.4.0** - Real-time messaging
- **Socket.io Client** - Real-time bidirectional communication

### Data Visualization & UI Enhancements
- **ApexCharts 5.3.5** - Modern charting library
- **React ApexCharts** - React wrapper for ApexCharts
- **Date-fns 4.1.0** - Modern date utility library
- **React Day Picker** - Flexible date picker component
- **Embla Carousel** - Lightweight carousel library

### Additional Libraries
- **JWT Decode** - JWT token decoding
- **Sonner** - Toast notifications
- **React Star Ratings** - Star rating component
- **Sharp** - Image processing

### Development Tools
- **ESLint 9.30.1** - Code linting
- **Prettier 3.6.2** - Code formatting
- **TypeScript ESLint** - TypeScript-specific linting rules
- **Faker.js** - Generate fake data for testing

## ✨ Features

### User Features
- 🔐 **Authentication & Authorization** - Secure login/signup with JWT tokens
- 🏠 **Home Dashboard** - Browse featured services and categories
- 🔍 **Service Search & Filter** - Advanced search with multiple filters
- 📅 **Appointment Booking** - Book appointments with available time slots
- 📆 **Calendar View** - Visual calendar for managing appointments
- 💳 **Payment Processing** - Secure payment integration
- 📱 **My Bookings** - View and manage all bookings
- 🔄 **Reschedule Appointments** - Flexible rescheduling options
- 👤 **Profile Management** - Update personal information and preferences
- 🔒 **Password & Security** - Change password and security settings
- ⭐ **Ratings & Reviews** - Rate and review service providers
- 💬 **Real-time Messaging** - Chat with service providers
- 🔔 **Notifications** - Real-time updates and alerts
- ❤️ **Favorites** - Save favorite services and providers

### Provider Features
- 📊 **Provider Dashboard** - Comprehensive analytics and insights
- ➕ **Add Services** - Create and publish new services
- ✏️ **Edit Services** - Update existing service details
- 🚀 **Release Services** - Manage service availability
- 📋 **Due List** - Track pending payments and dues
- 📈 **Analytics** - View booking statistics and revenue
- 👥 **Customer Management** - View and manage customer bookings
- 💼 **Provider Profile** - Showcase services and expertise

### Technical Features
- 🎨 **Dark/Light Theme** - System-aware theme switching
- 📱 **Responsive Design** - Mobile-first approach
- ⚡ **Optimized Performance** - Code splitting and lazy loading
- 🔄 **Real-time Updates** - WebSocket integration
- 🎭 **Smooth Animations** - Framer Motion animations
- 🛡️ **Protected Routes** - Route-level authentication
- 📦 **State Persistence** - Redux persist for offline support
- 🎯 **Type Safety** - Full TypeScript coverage
- 🧩 **Component Library** - Reusable UI components
- 🔧 **Custom Hooks** - Reusable logic patterns

## 📂 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn/ui components
│   ├── animate-ui/     # Animation components
│   ├── Header/         # Header and navigation
│   ├── Modal/          # Modal components
│   ├── Messaging/      # Chat components
│   ├── errors/         # Error handling components
│   └── skeltone/       # Loading skeletons
├── pages/              # Page components
│   ├── home/           # Home page
│   ├── services/       # Services listing
│   ├── Provider/       # Provider profile
│   ├── BookAppointment/# Booking flow
│   ├── MyBookings/     # User bookings
│   ├── MyProfile/      # User profile
│   ├── Dashboard/      # Provider dashboard
│   ├── Calendar/       # Calendar view
│   ├── Payment/        # Payment processing
│   ├── Duelist/        # Due list management
│   ├── AddService/     # Add new service
│   ├── EditService/    # Edit service
│   └── ReleaseService/ # Release service
├── store/              # Redux store
│   ├── api/           # RTK Query API endpoints
│   ├── features/      # Redux slices
│   └── index.ts       # Store configuration
├── hooks/              # Custom React hooks
├── lib/                # Utility libraries
├── types/              # TypeScript type definitions
├── theme/              # Theme configuration
├── config/             # App configuration
├── utils/              # Helper functions
├── routes.tsx          # Route definitions
├── main.tsx            # App entry point
└── index.css           # Global styles
```

## 🚀 Installation & Setup

### Prerequisites

- **Node.js** (version 16 or higher)
- **npm**, **yarn**, **pnpm**, or **bun** package manager

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bachollerGirls_New_modification
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Environment Setup**
   
   Copy the example environment file and configure your variables:
   ```bash
   cp .env.example .env.development
   ```
   
   Update the environment variables in `.env.development`:
   ```env
   VITE_API_URL=your_api_url
   VITE_PUSHER_KEY=your_pusher_key
   VITE_PUSHER_CLUSTER=your_pusher_cluster
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

   The application will be available at `http://localhost:5173`

5. **Build for production**
   ```bash
   npm run build
   # or
   yarn build
   # or
   pnpm build
   # or
   bun build
   ```

6. **Preview production build**
   ```bash
   npm run preview
   # or
   yarn preview
   # or
   pnpm preview
   # or
   bun preview
   ```

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production (TypeScript check + Vite build) |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |

## 🏗️ Key Features Implementation

### Authentication Flow
- JWT-based authentication with token storage
- Protected routes with automatic redirection
- Token refresh mechanism
- Secure logout with state cleanup

### Real-time Features
- WebSocket connection via Laravel Echo
- Pusher integration for real-time notifications
- Live chat messaging
- Real-time booking updates

### State Management
- Redux Toolkit for global state
- RTK Query for API calls and caching
- Redux Persist for offline support
- Optimistic updates for better UX

### Form Handling
- React Hook Form for performance
- Zod schema validation
- Custom form components
- Error handling and display

## 🎨 Theming

The application supports both light and dark themes with system preference detection:

```typescript
import { ThemeProvider } from "./theme";

// Wrap your app with ThemeProvider
<ThemeProvider>
  <App />
</ThemeProvider>
```

## 🔧 Configuration

### Vite Configuration
- React plugin for Fast Refresh
- Tailwind CSS integration
- SVGR for SVG imports as React components
- Path aliases (`@/` for `src/`)
- Optimized dependencies

### TypeScript Configuration
- Strict type checking enabled
- Path mapping for clean imports
- Separate configs for app and node

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🚢 Deployment

### Netlify
The project includes Netlify configuration:
- `_redirects` file for SPA routing
- Automatic deployments from Git

### Vercel
Vercel configuration included:
- `vercel.json` for deployment settings
- Optimized for serverless deployment

### Manual Deployment
1. Build the project: `npm run build`
2. Upload the `dist/` folder to your hosting service
3. Configure server to serve `index.html` for all routes

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style
- Follow the existing code style
- Run `npm run lint` before committing
- Use Prettier for code formatting
- Write meaningful commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

### Core Technologies
- [React](https://react.dev/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - Styling

### UI Libraries
- [Radix UI](https://www.radix-ui.com/) - Accessible components
- [Shadcn/ui](https://ui.shadcn.com/) - Component library
- [Lucide Icons](https://lucide.dev/) - Icon library
- [Framer Motion](https://www.framer.com/motion/) - Animations

### State & Data
- [Redux Toolkit](https://redux-toolkit.js.org/) - State management
- [React Hook Form](https://react-hook-form.com/) - Form handling
- [Zod](https://zod.dev/) - Schema validation

### Real-time
- [Laravel Echo](https://laravel.com/docs/broadcasting) - WebSocket client
- [Pusher](https://pusher.com/) - Real-time messaging

### Utilities
- [Date-fns](https://date-fns.org/) - Date utilities
- [ApexCharts](https://apexcharts.com/) - Charts
- [Sonner](https://sonner.emilkowal.ski/) - Toast notifications

---

**Built with ❤️ using React, TypeScript, and Vite**
