import React, { useState, useEffect } from 'react';
import { Navigation, type View } from './components/Navigation';
import { BookingsView } from './components/BookingsView';
import { CompetitionView } from './components/CompetitionView';
import { AdminView } from './components/admin/AdminView';
import { ThemeToggle } from './components/ThemeToggle';
import { useTheme } from './hooks/useTheme';

function App() {
  const [currentView, setCurrentView] = useState<View>('bookings');
  const { isDark } = useTheme();
  const [logoSrc, setLogoSrc] = useState(isDark ? "/logo-blanco.png" : "/logo.png");

  // Update logo when theme changes
  useEffect(() => {
    setLogoSrc(isDark ? "/logo-blanco.png" : "/logo.png");
  }, [isDark]);

  const renderCurrentView = () => {
    switch (currentView) {
      case 'bookings':
        return <BookingsView />;
      case 'competition':
        return <CompetitionView />;
      case 'admin':
        return <AdminView />;
      default:
        return <BookingsView />;
    }
  };

  console.log("the theme value is ", isDark)
  
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src={logoSrc}
                alt="TT Sant Andreu Logo" 
                className="h-12 w-12 object-contain"
              />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center">
                Tennis Taula Sant Andreu
              </h1>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <Navigation currentView={currentView} onViewChange={setCurrentView} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderCurrentView()}
      </main>
    </div>
  );
}

export default App;