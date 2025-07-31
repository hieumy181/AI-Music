import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { MusicProvider } from './contexts/MusicContext';
import { Layout } from './components/layout/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';

// Auth Components
import { SignIn } from './components/auth/SignIn';
import { SignUp } from './components/auth/SignUp';
import { ForgotPassword } from './components/auth/ForgotPassword';

// Pages
import { Home } from './pages/Home';
import { Search } from './pages/Search';

// Placeholder components for other pages
const Library = () => <div className="p-6"><h1 className="text-3xl font-bold text-white">Your Library</h1><p className="text-gray-400 mt-4">Your saved music will appear here.</p></div>;
const Profile = () => <div className="p-6"><h1 className="text-3xl font-bold text-white">Profile</h1><p className="text-gray-400 mt-4">Manage your profile and preferences.</p></div>;
const Upload = () => <div className="p-6"><h1 className="text-3xl font-bold text-white">Upload Music</h1><p className="text-gray-400 mt-4">Upload your own tracks.</p></div>;
const Settings = () => <div className="p-6"><h1 className="text-3xl font-bold text-white">Settings</h1><p className="text-gray-400 mt-4">App settings and preferences.</p></div>;
const Admin = () => <div className="p-6"><h1 className="text-3xl font-bold text-white">Admin Dashboard</h1><p className="text-gray-400 mt-4">Manage users and content.</p></div>;

const AppContent: React.FC = () => {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route 
          path="/signin" 
          element={user ? <Navigate to="/" replace /> : <SignIn />} 
        />
        <Route 
          path="/signup" 
          element={user ? <Navigate to="/" replace /> : <SignUp />} 
        />
        <Route 
          path="/forgot-password" 
          element={user ? <Navigate to="/" replace /> : <ForgotPassword />} 
        />

        {/* Protected Routes */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <MusicProvider>
                <Layout>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/library" element={<Library />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/upload" element={<Upload />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/liked" element={<Library />} />
                    <Route path="/create-playlist" element={<Library />} />
                  </Routes>
                </Layout>
              </MusicProvider>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;