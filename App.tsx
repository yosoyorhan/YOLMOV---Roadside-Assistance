
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ServicesSection from './components/ServicesSection';
import HowItWorks from './components/HowItWorks';
import Advantages from './components/Advantages';
import Campaigns from './components/Campaigns';
import Footer from './components/Footer';
import LoginPage from './components/LoginPage';
import CustomerProfilePage from './components/CustomerProfilePage';
import ListingPage from './components/ListingPage';
import QuotePage from './components/QuotePage';
import ProviderDetailPage from './components/ProviderDetailPage';
import PartnerRegisterPage from './components/PartnerRegisterPage';
import PartnerDashboard from './components/PartnerDashboard';
import { Provider, Customer } from './types';

function App() {
  // Expanded routing state
  const [currentPage, setCurrentPage] = useState<'home' | 'login-customer' | 'login-partner' | 'partner-register' | 'listing' | 'quote' | 'detail' | 'partner-dashboard' | 'customer-profile'>('home');
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [customer, setCustomer] = useState<Customer | null>(null);
  
  // Search Params State
  const [searchParams, setSearchParams] = useState({
    city: '',
    district: '',
    serviceId: ''
  });

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleSearch = (city: string, district: string, serviceId: string) => {
    setSearchParams({ city, district, serviceId });
    setCurrentPage('listing');
  };

  const handleProviderClick = (provider: Provider) => {
    setSelectedProvider(provider);
    setCurrentPage('detail');
  };

  const handleCustomerLogin = (phone: string) => {
    // Mock create customer profile
    const fakeCustomer: Customer = {
      id: 'CUST-' + Date.now(),
      firstName: 'Misafir',
      lastName: 'Kullanıcı',
      phone,
      createdAt: new Date().toISOString()
    };
    setCustomer(fakeCustomer);
    setCurrentPage('customer-profile');
  };

  const handleCustomerLogout = () => {
    setCustomer(null);
    setCurrentPage('home');
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'login-customer':
        return <LoginPage userType="customer" onLoginSuccess={() => handleCustomerLogin('+90 5XX XXX XX XX')} />;
      case 'login-partner':
        return <LoginPage userType="partner" onNavigateToRegister={() => setCurrentPage('partner-register')} onLoginSuccess={() => setCurrentPage('partner-dashboard')} />;
      case 'partner-register':
        return <PartnerRegisterPage />;
      case 'partner-dashboard':
        return <PartnerDashboard onLogout={() => setCurrentPage('home')} />;
      case 'customer-profile':
        return customer ? (
          <CustomerProfilePage 
            customer={customer} 
            onUpdate={(c) => setCustomer(c)} 
            onLogout={handleCustomerLogout}
            onBackHome={() => setCurrentPage('home')}
          />
        ) : (
          <div className="flex items-center justify-center h-[50vh]">Profil bulunamadı</div>
        );
      case 'quote':
        return <QuotePage onHome={() => setCurrentPage('home')} />;
      case 'listing':
        return (
          <ListingPage 
            initialCity={searchParams.city}
            initialDistrict={searchParams.district}
            initialServiceId={searchParams.serviceId}
            onNavigateToQuote={() => setCurrentPage('quote')}
            onProviderClick={handleProviderClick}
          />
        );
      case 'detail':
        return selectedProvider ? (
          <ProviderDetailPage 
            provider={selectedProvider} 
            onBack={() => setCurrentPage('listing')}
            onBook={() => setCurrentPage('quote')} 
          />
        ) : (
          <div className="flex items-center justify-center h-[50vh]">Provider not found</div>
        );
      case 'home':
      default:
        return (
          <>
            <Hero onSearch={handleSearch} />
            <ServicesSection />
            <HowItWorks />
            <Advantages />
            <Campaigns />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans text-brand-dark selection:bg-brand-orange selection:text-white">
      {/* Hide Header on Partner Dashboard for full screen experience */}
      {currentPage !== 'partner-dashboard' && (
        <Header 
          onNavigate={(page) => {
             if (page === 'home') setCurrentPage('home');
             if (page === 'login-customer') setCurrentPage('login-customer');
          }}
          onLoginClick={() => setCurrentPage('login-customer')}
          onAgencyLoginClick={() => setCurrentPage('login-partner')}
          onPartnerClick={() => setCurrentPage('partner-register')}
          customer={customer}
          onCustomerProfile={() => setCurrentPage('customer-profile')}
          onCustomerLogout={handleCustomerLogout}
        />
      )}
      
      <main className="flex-grow">
        {renderContent()}
      </main>
      
      {/* Hide Footer on Partner Dashboard */}
      {currentPage !== 'partner-dashboard' && <Footer />}
      
      {/* Call to Action - Sticky Mobile Button (Visible only on small screens and Home page) */}
      {currentPage === 'home' && (
        <div className="fixed bottom-4 left-4 right-4 md:hidden z-40">
          <button className="w-full bg-brand-orange text-white py-4 rounded-xl font-bold shadow-lg shadow-orange-400/30 flex items-center justify-center gap-2">
            Acil Yardım Çağır
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
