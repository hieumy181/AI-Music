import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Search, 
  Library, 
  Plus, 
  Heart, 
  Music, 
  Upload,
  Settings,
  Shield
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { cn } from '../../utils/cn';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { user } = useAuth();

  const menuItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Search, label: 'Search', path: '/search' },
    { icon: Library, label: 'Your Library', path: '/library' },
  ];

  const userItems = [
    { icon: Plus, label: 'Create Playlist', path: '/create-playlist' },
    { icon: Heart, label: 'Liked Songs', path: '/liked' },
    { icon: Upload, label: 'Upload Music', path: '/upload' },
  ];

  const adminItems = user?.isPremium ? [
    { icon: Shield, label: 'Admin Dashboard', path: '/admin' },
  ] : [];

  const settingsItems = [
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          'fixed left-0 top-0 h-full w-64 bg-black z-50 transform transition-transform duration-300 ease-in-out',
          'lg:relative lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center space-x-2 p-6 border-b border-gray-800">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <Music className="w-5 h-5 text-black" />
            </div>
            <span className="text-white font-bold text-xl">SoundWave</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto">
            <div className="p-4 space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={cn(
                    'flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200',
                    'hover:bg-gray-800 group',
                    isActive(item.path) 
                      ? 'bg-gray-800 text-white' 
                      : 'text-gray-400 hover:text-white'
                  )}
                >
                  <item.icon className={cn(
                    'w-5 h-5 transition-colors',
                    isActive(item.path) ? 'text-green-500' : 'group-hover:text-green-500'
                  )} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </div>

            <div className="px-4 py-2">
              <div className="border-t border-gray-800" />
            </div>

            <div className="p-4 space-y-1">
              {userItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={cn(
                    'flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200',
                    'hover:bg-gray-800 group',
                    isActive(item.path) 
                      ? 'bg-gray-800 text-white' 
                      : 'text-gray-400 hover:text-white'
                  )}
                >
                  <item.icon className={cn(
                    'w-5 h-5 transition-colors',
                    isActive(item.path) ? 'text-green-500' : 'group-hover:text-green-500'
                  )} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </div>

            {adminItems.length > 0 && (
              <>
                <div className="px-4 py-2">
                  <div className="border-t border-gray-800" />
                </div>
                <div className="p-4 space-y-1">
                  {adminItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={onClose}
                      className={cn(
                        'flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200',
                        'hover:bg-gray-800 group',
                        isActive(item.path) 
                          ? 'bg-gray-800 text-white' 
                          : 'text-gray-400 hover:text-white'
                      )}
                    >
                      <item.icon className={cn(
                        'w-5 h-5 transition-colors',
                        isActive(item.path) ? 'text-green-500' : 'group-hover:text-green-500'
                      )} />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </nav>

          {/* Settings */}
          <div className="p-4 border-t border-gray-800">
            {settingsItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={cn(
                  'flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200',
                  'hover:bg-gray-800 group',
                  isActive(item.path) 
                    ? 'bg-gray-800 text-white' 
                    : 'text-gray-400 hover:text-white'
                )}
              >
                <item.icon className={cn(
                  'w-5 h-5 transition-colors',
                  isActive(item.path) ? 'text-green-500' : 'group-hover:text-green-500'
                )} />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};