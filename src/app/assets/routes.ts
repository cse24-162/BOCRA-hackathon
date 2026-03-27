import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { LandingPage } from './pages/LandingPage';
import { AboutPage } from "./pages/AboutPage";
import { ComplaintsPage } from './pages/ComplaintsPage';
import { LicensingPage } from './pages/LicensingPage';
import { UserDashboard } from './pages/UserDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { TrackingPage } from './pages/TrackingPage';
import { ServicesPage } from './pages/ServicesPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: LandingPage },
      { path: 'about', Component: AboutPage },
      { path: 'complaints', Component: ComplaintsPage },
      { path: 'licensing', Component: LicensingPage },
      { path: 'dashboard', Component: UserDashboard },
      { path: 'admin', Component: AdminDashboard },
      { path: 'tracking', Component: TrackingPage },
      { path: 'services', Component: ServicesPage },
      { path: 'contact', Component: ContactPage },
      { path: '*', Component: NotFoundPage },
    ],
  },
]);
