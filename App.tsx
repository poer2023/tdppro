
import React, { useState, Suspense } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/HomePage';
import Footer from './components/Footer';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import { DataProvider, AuthProvider, SettingsProvider, useAuth } from './store';
import SEO from './components/SEO';

// Lazy load heavy components for performance
const Gallery = React.lazy(() => import('./components/Gallery'));
const StatsDashboard = React.lazy(() => import('./components/StatsDashboard'));
const Projects = React.lazy(() => import('./components/Projects')); 

const LoadingSpinner = () => (
    <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-4 border-stone-200 border-t-sage-500 rounded-full animate-spin"></div>
    </div>
);

// Main Content Wrapper to handle Layout consistency
const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useAuth();
    const location = useLocation();

    // If Admin is logged in, show Full Admin Dashboard (bypassing normal layout)
    if (user?.role === 'admin') {
        return <AdminDashboard />;
    }

    // Login page has its own dedicated layout (no header/footer)
    if (location.pathname === '/login') {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen flex flex-col font-sans text-stone-800 dark:text-stone-100 bg-stone-50 dark:bg-stone-950 selection:bg-sage-100 dark:selection:bg-sage-900 selection:text-sage-900 dark:selection:text-sage-200 transition-colors duration-300">
            <Header />
            <main className="flex-grow w-full">
                <Suspense fallback={<LoadingSpinner />}>
                    {children}
                </Suspense>
            </main>
            <Footer />
        </div>
    );
}

// Router Setup
const AppRoutes = () => {
    return (
        <MainLayout>
             <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/gallery" element={
                    <>
                        <SEO title="Gallery" description="Visual stories through photography and motion." />
                        <Gallery />
                    </>
                } />
                <Route path="/projects" element={
                    <>
                        <SEO title="Projects" description="A collection of my digital creations and experiments." />
                        <Projects />
                    </>
                } />
                <Route path="/data" element={
                    <>
                         <SEO title="My Data" description="Quantified self data: movies, games, and skills." />
                         <StatsDashboard />
                    </>
                } />
                {/* Fallback to Home */}
                <Route path="*" element={<HomePage />} />
             </Routes>
        </MainLayout>
    );
};

function App() {
    return (
        <HashRouter>
            <SettingsProvider>
                <AuthProvider>
                    <DataProvider>
                        <AppRoutes />
                    </DataProvider>
                </AuthProvider>
            </SettingsProvider>
        </HashRouter>
    )
}

export default App;
