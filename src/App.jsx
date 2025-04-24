import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './layout/Layout';
import Admin from './page/admin';
import Login from './page/login';
import Dashboard from './page/dashboard';
import Profile from './page/profile';
import NotFound from './page/notFound';
import CheckInOut from './page/checkInOut';
import Statistics from './page/statistics';
import AccountantDashboard from './page/accountant';
import ReceptionistDashboard from './page/receptionist';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path='/login' element={<Login />} />

          {/* Protected routes */}
          <Route path='/' element={<Layout />}>
            <Route index element={<Navigate to='/dashboard' replace />} />
            <Route path='admin/*' element={<Admin />} />
            <Route path='accountant/*' element={<AccountantDashboard />} />
            <Route path='receptionist/*' element={<ReceptionistDashboard />} />
            <Route path='check-in-out/*' element={<CheckInOut />} />
            <Route path='statistics/*' element={<Statistics />} />
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='profile' element={<Profile />} />
            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
