
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, List, History, Wallet, Settings, LogOut, 
  Bell, ChevronRight, MapPin, Clock, DollarSign, CheckCircle, 
  XCircle, Navigation, Phone, User, Shield, Filter, ArrowRight, Map,
  Camera, MessageSquare, AlertTriangle, Check, Coins, Lock, Unlock,
  Loader2, FileText, Download, Search, Calendar, ChevronDown, X,
  Receipt, Eye, EyeOff, ShieldAlert, TrendingUp, ArrowUpRight, 
  ArrowDownLeft, CreditCard, Banknote, Landmark, Copy, PieChart, Info,
  UserCog, FileCheck, Upload, Trash2, Save, Briefcase, Mail,
  Truck, Headphones, Plus, PenTool, Wrench, LifeBuoy, Route, MoreHorizontal,
  Grid, LayoutList, Zap, Send, Star, ThumbsUp, ThumbsDown
} from 'lucide-react';
import { JobRequest } from '../types';
import { MOCK_PARTNER_REQUESTS, CITIES_WITH_DISTRICTS } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';

interface PartnerDashboardProps {
  onLogout: () => void;
}

// MOCK HISTORY DATA
const MOCK_HISTORY = [
  { id: 'JOB-4923', date: '22 Kas, 14:30', service: 'Çekici Hizmeti', route: 'Maslak > Levent', customer: 'Ahmet Yılmaz', price: 850, status: 'completed', earnings: 850 },
  { id: 'JOB-4922', date: '21 Kas, 09:15', service: 'Akü Takviyesi', route: 'Beşiktaş (Yerinde)', customer: 'Selin Kaya', price: 400, status: 'completed', earnings: 400 },
  { id: 'JOB-4921', date: '20 Kas, 23:45', Lastik: 'Lastik Değişimi', route: 'TEM Otoyolu', customer: 'Mehmet Demir', price: 600, status: 'cancelled', earnings: 0 },
  { id: 'JOB-4920', date: '19 Kas, 11:20', service: 'Çekici Hizmeti', route: 'Kadıköy > Ümraniye', customer: 'Caner Erkin', price: 1200, status: 'completed', earnings: 1200 },
  { id: 'JOB-4919', date: '18 Kas, 16:40', service: 'Yakıt Desteği', route: 'E-5 Merter', customer: 'Zeynep A.', price: 350, status: 'refunded', earnings: 0 },
  { id: 'JOB-4918', date: '15 Kas, 10:00', service: 'Çekici Hizmeti', route: 'Bostancı > Kartal', customer: 'Burak Y.', price: 900, status: 'completed', earnings: 900 },
];

// MOCK TRANSACTIONS FOR WALLET
const MOCK_TRANSACTIONS = [
  { id: 'TRX-101', type: 'income', title: 'Nakit Tahsilat (#JOB-4923)', date: '22 Kas 2023, 15:00', amount: 850, status: 'completed' },
  { id: 'TRX-102', type: 'expense', title: 'İş Kabulü (Kredi Kullanımı)', date: '22 Kas 2023, 14:00', amount: 1, isCredit: true, status: 'completed' },
  { id: 'TRX-104', type: 'expense', title: 'Kredi Paketi Satın Alımı', date: '18 Kas 2023, 14:20', amount: 500, status: 'completed' },
  { id: 'TRX-105', type: 'income', title: 'Nakit Tahsilat (#JOB-4920)', date: '19 Kas 2023, 12:30', amount: 1200, status: 'completed' },
  { id: 'TRX-106', type: 'expense', title: 'İş Kabulü (Kredi Kullanımı)', date: '19 Kas 2023, 11:00', amount: 1, isCredit: true, status: 'completed' },
];

const CREDIT_PACKAGES = [
  { id: 1, credits: 10, price: 150, label: 'Başlangıç', recommended: false },
  { id: 2, credits: 50, price: 600, label: 'Profesyonel', recommended: true },
  { id: 3, credits: 100, price: 1000, label: 'Avantajlı', recommended: false },
];

// MOCK FLEET DATA
const MOCK_FLEET = [
  { id: 1, plate: '34 AB 1234', model: '2020 Ford F-Max', type: 'Kayar Kasa', driver: 'Mehmet Y.', status: 'active', image: 'https://images.unsplash.com/photo-1605218427360-6982bc998200?auto=format&fit=crop&q=80&w=300' },
  { id: 2, plate: '34 XY 9988', model: '2018 Isuzu NPR', type: 'Ahtapot Vinç', driver: 'Ali K.', status: 'maintenance', image: 'https://images.unsplash.com/photo-1586015604658-650561417675?auto=format&fit=crop&q=80&w=300' },
];

// MOCK SUPPORT TICKETS
const MOCK_TICKETS = [
  { id: 'TCK-882', subject: 'Ödeme Bildirimi', date: '20 Kas', status: 'open' },
  { id: 'TCK-771', subject: 'Müşteri Şikayeti', date: '15 Kas', status: 'resolved' },
];

// INITIAL MOCK ROUTES
const INITIAL_ROUTES = [
  { id: 1, origin: 'İstanbul', destinations: ['Kocaeli (Gebze)', 'Sakarya', 'Bursa'], date: '2023-11-24', time: '14:00', vehicle: '34 AB 1234', matches: 3 },
];

const POSITIVE_RATING_TAGS = [
  'Kibar Müşteri', 'Sorunsuz Ödeme', 'Bahşiş Bıraktı', 'Konum Doğruydu', 'Anlayışlı', 'İletişim Kolaydı'
];

const NEGATIVE_RATING_TAGS = [
  'İletişim Zor', 'Geç Geldi', 'Ödeme Sorunu', 'Konum Hatalı', 'Kaba Davranış', 'Bekletti'
];

const PartnerDashboard: React.FC<PartnerDashboardProps> = ({ onLogout }) => {
  const [isOnline, setIsOnline] = useState(true);
  const [activeTab, setActiveTab] = useState('requests');
  const [requests, setRequests] = useState<JobRequest[]>(MOCK_PARTNER_REQUESTS);
  const [activeJob, setActiveJob] = useState<JobRequest | null>(null);
  
  // Credit & Unlock System State
  const [credits, setCredits] = useState(25);
  const [unlockedJobs, setUnlockedJobs] = useState<string[]>([]);

  // Quote / Offer State
  const [selectedJobForQuote, setSelectedJobForQuote] = useState<JobRequest | null>(null);
  const [quotePrice, setQuotePrice] = useState('');
  const [quoteNote, setQuoteNote] = useState('');
  
  const [offeringJobId, setOfferingJobId] = useState<string | null>(null);
  const [offerError, setOfferError] = useState<string | null>(null);

  // Active Job Workflow State
  const [jobStage, setJobStage] = useState<0 | 1 | 2 | 3 | 4>(0); 
  const [hasStartProof, setHasStartProof] = useState(false);
  const [hasEndProof, setHasEndProof] = useState(false);

  // Rating State
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [ratingScore, setRatingScore] = useState(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Filter State
  const [filterMode, setFilterMode] = useState<'all' | 'nearest' | 'highest_price' | 'urgent'>('all');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  // History State
  const [historySearch, setHistorySearch] = useState('');
  const [historyFilter, setHistoryFilter] = useState('month');
  const [selectedHistoryItem, setSelectedHistoryItem] = useState<typeof MOCK_HISTORY[0] | null>(null);

  // Wallet State
  const [walletFilter, setWalletFilter] = useState<'all' | 'income' | 'expense'>('all');
  const [showAddCreditModal, setShowAddCreditModal] = useState(false);

  // Settings State
  const [settingsSubTab, setSettingsSubTab] = useState<'profile' | 'services' | 'documents' | 'security'>('profile');

  // Route / Empty Leg State
  const [activeRoutes, setActiveRoutes] = useState(INITIAL_ROUTES);
  const [routeOrigin, setRouteOrigin] = useState('İstanbul');
  const [routeDestinations, setRouteDestinations] = useState<string[]>([]);
  const [currentDestInput, setCurrentDestInput] = useState('');
  const [routeDate, setRouteDate] = useState('');
  const [routeTime, setRouteTime] = useState('');
  const [routeVehicle, setRouteVehicle] = useState('');
  const [editingRouteId, setEditingRouteId] = useState<number | null>(null);

  // Filter Logic
  const filteredRequests = requests.filter(req => {
    if (filterMode === 'urgent') return req.urgency === 'high';
    return true;
  }).sort((a, b) => {
    if (filterMode === 'highest_price') return b.price - a.price;
    if (filterMode === 'nearest') return parseFloat(a.distance) - parseFloat(b.distance);
    return 0;
  });

  const filteredHistory = MOCK_HISTORY.filter(item => 
    item.id.toLowerCase().includes(historySearch.toLowerCase()) ||
    item.customer.toLowerCase().includes(historySearch.toLowerCase())
  );

  // Step 1: Open Modal
  const handleOpenQuoteModal = (job: JobRequest) => {
    if (credits <= 0) {
      alert("Yetersiz bakiye! Teklif vermek için kredi yükleyiniz.");
      return;
    }
    setSelectedJobForQuote(job);
    setQuotePrice('');
    setQuoteNote('');
  };

  // Step 2: Submit Quote -> Start Simulation
  const handleSubmitQuote = () => {
     if (!selectedJobForQuote || !quotePrice) return;

     const jobId = selectedJobForQuote.id;
     
     // Close modal
     setSelectedJobForQuote(null);

     // Start loading state on card
     setOfferingJobId(jobId);
     setOfferError(null);

     // Simulation: Customer Reviewing Offer
    setTimeout(() => {
      const isOfferAccepted = Math.random() > 0.3; // 70% chance of acceptance
      if (isOfferAccepted) {
        setCredits(prev => prev - 1);
        setUnlockedJobs(prev => [...prev, jobId]);
        setOfferingJobId(null);
      } else {
        setOfferError(jobId);
        setOfferingJobId(null);
        setTimeout(() => {
           // Remove job from list after rejection (simulating customer chose someone else)
           setRequests(prev => prev.filter(r => r.id !== jobId));
           setOfferError(null);
        }, 3000);
      }
    }, 2500);
  };

  const handleStartOperation = (job: JobRequest) => {
    setActiveJob(job);
    setRequests(prev => prev.filter(r => r.id !== job.id));
    setJobStage(0);
    setHasStartProof(false);
    setHasEndProof(false);
    setActiveTab('active');
  };

  const advanceJobStage = () => {
    if (jobStage === 2 && !hasStartProof) {
       alert("Lütfen hizmete başlamadan önce kanıt fotoğrafı yükleyin.");
       return;
    }
    if (jobStage === 3 && !hasEndProof) {
       alert("Lütfen görevi tamamlamadan önce bitiş fotoğrafı yükleyin.");
       return;
    }
    if (jobStage === 3) {
       // Stage 3 is "Görevi Tamamla". After this, show rating modal instead of resetting immediately
       setShowRatingModal(true);
       return;
    }
    if (jobStage < 4) {
      setJobStage((prev) => (prev + 1) as any);
    }
  };

  const handleFinishJob = () => {
    setShowRatingModal(false);
    setActiveJob(null);
    setActiveTab('requests');
    setJobStage(0);
    setRatingScore(0);
    setSelectedTags([]);
  };

  const getStageLabel = () => {
    switch(jobStage) {
      case 0: return "Navigasyonu Başlat";
      case 1: return "Konuma Vardım";
      case 2: return "Hizmeti Başlat";
      case 3: return "Görevi Tamamla";
      default: return "";
    }
  };

  const addDestination = () => {
    if (currentDestInput && !routeDestinations.includes(currentDestInput)) {
      setRouteDestinations([...routeDestinations, currentDestInput]);
      setCurrentDestInput('');
    }
  };

  const removeDestination = (dest: string) => {
    setRouteDestinations(routeDestinations.filter(d => d !== dest));
  };

  const handleEditRoute = (route: any) => {
    setEditingRouteId(route.id);
    setRouteOrigin(route.origin);
    setRouteDestinations(route.destinations);
    setRouteDate(route.date);
    setRouteTime(route.time);
    setRouteVehicle(route.vehicle);
  };

  const cancelEdit = () => {
    setEditingRouteId(null);
    setRouteOrigin('İstanbul');
    setRouteDestinations([]);
    setRouteDate('');
    setRouteTime('');
    setRouteVehicle('');
    setCurrentDestInput('');
  };

  const handleAddRoute = () => {
     if (!routeOrigin || routeDestinations.length === 0 || !routeDate || !routeTime || !routeVehicle) {
        alert("Lütfen güzergah, tarih, saat ve araç bilgilerini eksiksiz doldurun.");
        return;
     }

     if (editingRouteId) {
        setActiveRoutes(prev => prev.map(r => r.id === editingRouteId ? {
            ...r,
            origin: routeOrigin,
            destinations: routeDestinations,
            date: routeDate,
            time: routeTime,
            vehicle: routeVehicle
        } : r));
        setEditingRouteId(null);
        alert("Rota başarıyla güncellendi.");
     } else {
        const newRoute = {
            id: Date.now(),
            origin: routeOrigin,
            destinations: routeDestinations,
            date: routeDate,
            time: routeTime,
            vehicle: routeVehicle,
            matches: Math.floor(Math.random() * 5) // Mock matching jobs
        };
        setActiveRoutes([newRoute, ...activeRoutes]);
        alert("Yeni rota oluşturuldu.");
     }
     
     // Reset
     setRouteOrigin('İstanbul');
     setRouteDestinations([]);
     setRouteDate('');
     setRouteTime('');
     setRouteVehicle('');
     setCurrentDestInput('');
  };

  const handleRemoveRoute = (id: number) => {
     setActiveRoutes(activeRoutes.filter(r => r.id !== id));
  };

  // --- RENDERERS ---

  const renderRatingModal = () => {
    const activeTags = ratingScore >= 4 ? POSITIVE_RATING_TAGS : NEGATIVE_RATING_TAGS;
    
    return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
      <motion.div 
         initial={{ opacity: 0, scale: 0.95 }} 
         animate={{ opacity: 1, scale: 1 }} 
         className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden flex flex-col"
      >
        <div className="bg-slate-50 p-6 border-b border-slate-100 text-center">
           <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-2xl font-bold text-blue-600 mx-auto mb-3 shadow-inner">
              {activeJob?.customerName.charAt(0)}
           </div>
           <h2 className="text-xl font-bold text-slate-800">Görevi Tamamladın!</h2>
           <p className="text-slate-500 text-sm">Müşteriyi değerlendirerek sistemi iyileştirmemize yardım et.</p>
        </div>
        
        <div className="p-6 flex flex-col items-center">
           <div className="flex gap-2 mb-6">
              {[1,2,3,4,5].map(score => (
                 <button 
                   key={score} 
                   onClick={() => {
                      setRatingScore(score);
                      setSelectedTags([]); // Reset tags when score changes
                   }}
                   className="transition-transform hover:scale-110 focus:outline-none"
                 >
                    <Star 
                      size={36} 
                      className={`${score <= ratingScore ? 'fill-yellow-400 text-yellow-400' : 'text-slate-200 fill-slate-50'}`} 
                      strokeWidth={1.5}
                    />
                 </button>
              ))}
           </div>
           
           {ratingScore > 0 && (
              <div className="flex flex-wrap gap-2 justify-center mb-6">
                 {activeTags.map(tag => (
                    <button
                       key={tag}
                       onClick={() => {
                          if(selectedTags.includes(tag)) setSelectedTags(selectedTags.filter(t => t !== tag));
                          else setSelectedTags([...selectedTags, tag]);
                       }}
                       className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${selectedTags.includes(tag) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-500 border-slate-200 hover:border-blue-300'}`}
                    >
                       {tag}
                    </button>
                 ))}
              </div>
           )}

           <textarea 
              placeholder="Müşteri veya süreç hakkında eklemek istediklerin..."
              className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 outline-none mb-6 resize-none h-24"
           ></textarea>

           <button 
              onClick={handleFinishJob}
              disabled={ratingScore === 0}
              className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold shadow-lg hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
           >
              <Check size={18} /> Değerlendir ve Bitir
           </button>
        </div>
      </motion.div>
    </div>
  );
  };
  
  const renderQuoteModal = () => {
    if (!selectedJobForQuote) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm">
         <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden p-6"
         >
            <div className="flex justify-between items-center mb-6">
               <div>
                  <h2 className="text-xl font-bold text-slate-800">Teklif Ver</h2>
                  <p className="text-xs text-slate-500">#{selectedJobForQuote.id} - {selectedJobForQuote.serviceType}</p>
               </div>
               <button onClick={() => setSelectedJobForQuote(null)} className="p-2 bg-slate-50 rounded-full text-slate-400 hover:text-slate-600"><X size={20} /></button>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 mb-6">
               <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-600 shrink-0 shadow-sm"><MapPin size={20} /></div>
                  <div>
                     <p className="text-xs font-bold text-blue-400 uppercase">Mesafe</p>
                     <p className="text-sm font-bold text-slate-800">{selectedJobForQuote.distance} uzaklıkta</p>
                  </div>
               </div>
               <p className="text-xs text-slate-500 leading-relaxed">
                  Bu iş için müşteriye sunacağınız KDV dahil toplam tutarı giriniz.
               </p>
            </div>

            <div className="space-y-4">
               <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Teklif Tutarı (₺)</label>
                  <div className="relative">
                     <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                     <input 
                        type="number" 
                        autoFocus
                        placeholder="0.00" 
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-xl text-xl font-bold text-slate-900 focus:border-blue-500 focus:ring-0 outline-none transition-colors"
                        value={quotePrice}
                        onChange={(e) => setQuotePrice(e.target.value)}
                     />
                  </div>
               </div>
               <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Not (Opsiyonel)</label>
                  <textarea 
                     placeholder="Örn: 15 dk içinde araç başında olurum." 
                     className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:border-blue-500 focus:ring-0 outline-none resize-none h-24"
                     value={quoteNote}
                     onChange={(e) => setQuoteNote(e.target.value)}
                  ></textarea>
               </div>
            </div>

            <div className="mt-8 flex gap-3">
               <button onClick={() => setSelectedJobForQuote(null)} className="flex-1 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all">İptal</button>
               <button 
                  onClick={handleSubmitQuote}
                  disabled={!quotePrice}
                  className="flex-[2] py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
               >
                  Teklifi Gönder
               </button>
            </div>
         </motion.div>
      </div>
    );
  };

  const renderHistoryDetailModal = () => {
    if (!selectedHistoryItem) return null;
    const item = selectedHistoryItem;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
         <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
         >
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
               <div>
                  <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">İş Detayı <span className="text-blue-600">#{item.id}</span></h2>
                  <p className="text-sm text-slate-500">{item.date}</p>
               </div>
               <button onClick={() => setSelectedHistoryItem(null)} className="p-2 bg-white rounded-full border border-slate-200 text-slate-500 hover:bg-slate-100"><X size={20} /></button>
            </div>
            <div className="p-6 md:p-8 overflow-y-auto">
               <div className="flex justify-center mb-8">
                  <div className={`flex flex-col items-center px-6 py-3 rounded-2xl border ${item.status === 'completed' ? 'bg-green-50 border-green-100 text-green-700' : item.status === 'cancelled' ? 'bg-red-50 border-red-100 text-red-700' : 'bg-gray-50 border-gray-100 text-gray-700'}`}>
                     {item.status === 'completed' ? <CheckCircle size={32} className="mb-1" /> : <XCircle size={32} className="mb-1" />}
                     <span className="font-bold text-lg">{item.status === 'completed' ? 'Başarıyla Tamamlandı' : item.status === 'cancelled' ? 'İptal Edildi' : 'İade Edildi'}</span>
                  </div>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                     <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2">Finansal Detaylar</h3>
                     <div className="space-y-3">
                        <div className="flex justify-between text-sm"><span className="text-slate-600">Hizmet Bedeli</span><span className="font-bold text-slate-900">₺{item.price}</span></div>
                        <div className="flex justify-between text-base pt-3 border-t border-slate-100"><span className="font-bold text-slate-800">Toplam Kazanç</span><span className="font-bold text-green-600 text-lg">₺{item.earnings}</span></div>
                     </div>
                     <div className="mt-4 p-3 bg-yellow-50 border border-yellow-100 rounded-xl text-xs text-yellow-800"><Info size={14} className="inline mr-1 mb-0.5" />Bu işlem için <strong>1 Kredi</strong> kullanılmıştır.</div>
                  </div>
                  <div className="space-y-4">
                     <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2">Müşteri & Rota</h3>
                     <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                        <div className="flex items-center gap-3 mb-3">
                           <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-600 font-bold">{item.customer.charAt(0)}</div>
                           <div><p className="font-bold text-slate-800">{item.customer}</p><p className="text-xs text-slate-500">Platin Üye</p></div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-500 bg-white/50 p-2 rounded-lg"><ShieldAlert size={16} className="text-orange-500" /><span>05** *** ** 12</span><span className="text-[10px] bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded ml-auto">Gizli</span></div>
                     </div>
                     <div>
                        <div className="flex items-start gap-3 mb-3"><div className="mt-1 w-2 h-2 rounded-full bg-blue-500"></div><div><p className="text-xs text-slate-400 font-bold">BAŞLANGIÇ</p><p className="text-sm font-medium text-slate-800">{item.route.split('>')[0]}</p></div></div>
                        <div className="flex items-start gap-3"><div className="mt-1 w-2 h-2 rounded-full bg-slate-800"></div><div><p className="text-xs text-slate-400 font-bold">VARIŞ</p><p className="text-sm font-medium text-slate-800">{item.route.split('>')[1] || 'Yerinde Hizmet'}</p></div></div>
                     </div>
                  </div>
               </div>
            </div>
         </motion.div>
      </div>
    );
  };

  const renderAddCreditModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden p-6">
         <div className="flex justify-between items-center mb-6"><h3 className="text-xl font-bold text-slate-800">Kredi Yükle</h3><button onClick={() => setShowAddCreditModal(false)}><X size={24} className="text-slate-400" /></button></div>
         <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mb-6 text-sm text-blue-800 flex gap-3"><Info size={20} className="shrink-0" /><p>1 Kredi = 1 İş Kabulü. Kredileriniz hesabınıza anında tanımlanır ve süresizdir.</p></div>
         <div className="space-y-3 mb-6">
            {CREDIT_PACKAGES.map(pkg => (
               <div key={pkg.id} className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${pkg.recommended ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-blue-300'}`}>
                  <div className="flex items-center gap-3"><div className={`w-10 h-10 rounded-full flex items-center justify-center ${pkg.recommended ? 'bg-blue-500 text-white' : 'bg-slate-200 text-slate-600'}`}><Coins size={20} /></div><div><p className="font-bold text-slate-900">{pkg.label}</p><p className="text-xs text-slate-500">{pkg.credits} Kredi</p></div></div>
                  <div className="text-right"><p className="font-bold text-lg text-slate-900">₺{pkg.price}</p>{pkg.recommended && <span className="text-[10px] font-bold text-blue-600 bg-white px-2 py-0.5 rounded-full">Önerilen</span>}</div>
               </div>
            ))}
         </div>
         <button className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 flex items-center justify-center gap-2"><CreditCard size={18} /> Ödeme Yap ve Yükle</button>
      </motion.div>
    </div>
  );

  const renderHistoryTab = () => (
    <div className="p-4 md:p-6 space-y-6">
       <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="relative flex-1">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
             <input 
               type="text" 
               placeholder="İş No, Müşteri Adı veya Plaka ara..." 
               className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
               value={historySearch}
               onChange={(e) => setHistorySearch(e.target.value)}
             />
          </div>
          <div className="flex bg-white p-1 rounded-xl border border-slate-200 shrink-0">
             {['week', 'month', 'year'].map(f => (
                <button key={f} onClick={() => setHistoryFilter(f)} className={`px-4 py-2 rounded-lg text-sm font-bold capitalize transition-all ${historyFilter === f ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}>
                   {f === 'week' ? 'Bu Hafta' : f === 'month' ? 'Bu Ay' : 'Bu Yıl'}
                </button>
             ))}
          </div>
       </div>

       <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
             <table className="w-full text-left">
                <thead>
                   <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-400 font-bold">
                      <th className="p-4 pl-6">İş No / Tarih</th>
                      <th className="p-4">Hizmet & Rota</th>
                      <th className="p-4">Müşteri</th>
                      <th className="p-4">Tutar</th>
                      <th className="p-4">Durum</th>
                      <th className="p-4"></th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                   {filteredHistory.map(item => (
                      <tr key={item.id} className="hover:bg-slate-50/80 transition-colors cursor-pointer group" onClick={() => setSelectedHistoryItem(item)}>
                         <td className="p-4 pl-6">
                            <p className="font-bold text-slate-800 text-sm">#{item.id}</p>
                            <p className="text-xs text-slate-400">{item.date}</p>
                         </td>
                         <td className="p-4">
                            <p className="font-bold text-slate-800 text-sm">{item.service}</p>
                            <p className="text-xs text-slate-500 flex items-center gap-1"><MapPin size={10} /> {item.route}</p>
                         </td>
                         <td className="p-4">
                            <div className="flex items-center gap-2">
                               <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xs font-bold">{item.customer.charAt(0)}</div>
                               <span className="text-sm text-slate-600">{item.customer}</span>
                            </div>
                         </td>
                         <td className="p-4">
                            <span className="font-bold text-slate-800">₺{item.price}</span>
                         </td>
                         <td className="p-4">
                            <span className={`px-2 py-1 rounded-md text-xs font-bold ${item.status === 'completed' ? 'bg-green-50 text-green-700' : item.status === 'cancelled' ? 'bg-red-50 text-red-700' : 'bg-slate-100 text-slate-600'}`}>
                               {item.status === 'completed' ? 'Tamamlandı' : item.status === 'cancelled' ? 'İptal' : 'İade'}
                            </span>
                         </td>
                         <td className="p-4 text-right">
                            <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><ChevronRight size={18} /></button>
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
       </div>
    </div>
  );

  const renderWalletTab = () => (
    <div className="p-4 md:p-6 space-y-6">
       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-6 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10"><Wallet size={64} /></div>
             <p className="text-slate-400 text-sm font-medium mb-1">Toplam Bakiye (Kredi)</p>
             <h2 className="text-4xl font-bold mb-4">{credits} <span className="text-lg font-normal text-slate-400">Kredi</span></h2>
             <button onClick={() => setShowAddCreditModal(true)} className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-sm font-bold transition-colors shadow-lg shadow-blue-900/50 flex items-center gap-2">
                <Plus size={16} /> Kredi Yükle
             </button>
          </div>
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-center">
             <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-50 text-green-600 rounded-lg"><TrendingUp size={20} /></div>
                <span className="text-slate-500 text-sm font-bold">Bu Ay Kazanç</span>
             </div>
             <h3 className="text-2xl font-bold text-slate-800">₺12,450.00</h3>
             <p className="text-xs text-green-600 font-bold mt-1 flex items-center gap-1"><ArrowUpRight size={12} /> %12 artış</p>
          </div>
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-center">
             <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Briefcase size={20} /></div>
                <span className="text-slate-500 text-sm font-bold">Tamamlanan İş</span>
             </div>
             <h3 className="text-2xl font-bold text-slate-800">42 Adet</h3>
             <p className="text-xs text-slate-400 font-bold mt-1">Son 30 gün</p>
          </div>
       </div>

       <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
             <h3 className="font-bold text-lg text-slate-800">Hesap Hareketleri</h3>
             <div className="flex gap-2">
                {['all', 'income', 'expense'].map(f => (
                   <button key={f} onClick={() => setWalletFilter(f as any)} className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize ${walletFilter === f ? 'bg-slate-100 text-slate-800' : 'text-slate-400 hover:text-slate-600'}`}>
                      {f === 'all' ? 'Tümü' : f === 'income' ? 'Gelirler' : 'Giderler'}
                   </button>
                ))}
             </div>
          </div>
          <div className="space-y-4">
             {MOCK_TRANSACTIONS.filter(t => walletFilter === 'all' || t.type === walletFilter).map(trx => (
                <div key={trx.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-blue-100 hover:bg-blue-50/30 transition-all group">
                   <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${trx.type === 'income' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                         {trx.type === 'income' ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
                      </div>
                      <div>
                         <p className="font-bold text-slate-800 text-sm group-hover:text-blue-700 transition-colors">{trx.title}</p>
                         <p className="text-xs text-slate-400">{trx.date}</p>
                      </div>
                   </div>
                   <div className="text-right">
                      <p className={`font-bold ${trx.type === 'income' ? 'text-green-600' : 'text-slate-800'}`}>
                         {trx.type === 'income' ? '+' : '-'}{trx.isCredit ? `${trx.amount} Kredi` : `₺${trx.amount}`}
                      </p>
                      <p className="text-[10px] text-slate-400 uppercase font-bold">{trx.status === 'completed' ? 'Tamamlandı' : 'Bekliyor'}</p>
                   </div>
                </div>
             ))}
          </div>
       </div>
    </div>
  );

  const renderFleetTab = () => (
    <div className="p-4 md:p-6 space-y-6">
       <div className="flex justify-between items-center">
          <div>
             <h2 className="text-xl font-bold text-slate-800">Araç Filosu</h2>
             <p className="text-sm text-slate-500">Kayıtlı araçlarınızı yönetin ve durumlarını izleyin.</p>
          </div>
          <button className="bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-slate-800 flex items-center gap-2">
             <Plus size={16} /> Yeni Araç Ekle
          </button>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {MOCK_FLEET.map(vehicle => (
             <div key={vehicle.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                <div className="h-40 bg-slate-100 relative">
                   <img src={vehicle.image} alt={vehicle.plate} className="w-full h-full object-cover" />
                   <div className={`absolute top-3 right-3 px-2 py-1 rounded text-xs font-bold shadow-sm ${vehicle.status === 'active' ? 'bg-green-500 text-white' : 'bg-orange-500 text-white'}`}>
                      {vehicle.status === 'active' ? 'Aktif' : 'Bakımda'}
                   </div>
                </div>
                <div className="p-5">
                   <div className="flex justify-between items-start mb-4">
                      <div>
                         <h3 className="font-bold text-slate-900 text-lg">{vehicle.plate}</h3>
                         <p className="text-sm text-slate-500">{vehicle.model}</p>
                      </div>
                      <button className="p-2 text-slate-400 hover:text-blue-600 bg-slate-50 hover:bg-blue-50 rounded-lg transition-colors"><Settings size={16} /></button>
                   </div>
                   <div className="space-y-2 text-sm">
                      <div className="flex justify-between py-2 border-b border-slate-50">
                         <span className="text-slate-500">Araç Tipi</span>
                         <span className="font-medium text-slate-800">{vehicle.type}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-slate-50">
                         <span className="text-slate-500">Sürücü</span>
                         <span className="font-medium text-slate-800 flex items-center gap-1"><User size={14} /> {vehicle.driver}</span>
                      </div>
                   </div>
                   <div className="mt-4 pt-2 flex gap-2">
                      <button className="flex-1 py-2 rounded-lg border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 transition-colors">Geçmiş</button>
                      <button className="flex-1 py-2 rounded-lg border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 transition-colors">Konum</button>
                   </div>
                </div>
             </div>
          ))}
          {/* Add New Card Placeholder */}
          <button className="bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 hover:border-blue-300 hover:text-blue-500 hover:bg-blue-50 transition-all min-h-[300px] gap-3">
             <div className="w-12 h-12 rounded-full bg-white border-2 border-current flex items-center justify-center"><Plus size={24} /></div>
             <span className="font-bold">Yeni Araç Tanımla</span>
          </button>
       </div>
    </div>
  );

  const renderServiceRoutesTab = () => (
    <div className="p-4 md:p-6 space-y-6">
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-lg shadow-blue-900/20">
        <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-2">{editingRouteId ? 'Rotayı Düzenle' : 'Boş Dönüş & Hizmet Rotaları'}</h2>
            <p className="text-blue-100 max-w-xl text-sm mb-6">
                {editingRouteId 
                    ? 'Mevcut rotadaki bilgileri güncelleyin.' 
                    : 'Dönüş yolunda veya belirli tarihlerde gideceğiniz güzergahları ekleyin, o rotadaki iş fırsatlarını size öncelikli olarak ve indirimli sunalım.'}
            </p>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Origin */}
                <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-blue-200">Kalkış (Nereden)</label>
                    <select 
                    value={routeOrigin}
                    onChange={(e) => setRouteOrigin(e.target.value)}
                    className="w-full bg-white/90 border-0 rounded-lg text-slate-900 text-sm py-2 px-3 focus:ring-2 focus:ring-blue-400 outline-none"
                    >
                    <option value="">İl Seçiniz</option>
                    {Object.keys(CITIES_WITH_DISTRICTS).map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>

                {/* Vehicle (New) */}
                <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-blue-200">Araç Seçimi</label>
                    <select 
                    value={routeVehicle}
                    onChange={(e) => setRouteVehicle(e.target.value)}
                    className="w-full bg-white/90 border-0 rounded-lg text-slate-900 text-sm py-2 px-3 focus:ring-2 focus:ring-blue-400 outline-none"
                    >
                    <option value="">Araç Seçiniz</option>
                    {MOCK_FLEET.map(v => (
                        <option key={v.id} value={v.plate}>{v.plate} - {v.model}</option>
                    ))}
                    </select>
                </div>

                {/* Date & Time */}
                <div className="space-y-1 md:col-span-2">
                    <label className="text-[10px] font-bold uppercase text-blue-200">Tarih & Saat</label>
                    <input 
                    type="datetime-local" 
                    className="w-full bg-white/90 border-0 rounded-lg text-slate-900 text-sm py-2 px-3 focus:ring-2 focus:ring-blue-400 outline-none"
                    value={routeDate && routeTime ? `${routeDate}T${routeTime}` : ''}
                    onChange={(e) => {
                        const val = e.target.value;
                        if(val) {
                            setRouteDate(val.split('T')[0]);
                            setRouteTime(val.split('T')[1]);
                        }
                    }}
                    />
                </div>

                {/* Destinations */}
                <div className="space-y-1 md:col-span-4">
                    <label className="text-[10px] font-bold uppercase text-blue-200">Güzergah / Varışlar (Nereye)</label>
                    <div className="flex gap-2">
                    <div className="flex-1 flex items-center bg-white/90 rounded-lg px-2 overflow-hidden focus-within:ring-2 focus-within:ring-blue-400">
                        <input 
                            type="text" 
                            placeholder="İl veya İlçe ekle..." 
                            className="w-full bg-transparent border-none text-slate-900 text-sm py-2 px-1 focus:ring-0 outline-none placeholder-slate-400"
                            value={currentDestInput}
                            onChange={(e) => setCurrentDestInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && addDestination()}
                        />
                        <button onClick={addDestination} className="p-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"><Plus size={14} /></button>
                    </div>
                    </div>
                    {routeDestinations.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                        {routeDestinations.map(d => (
                            <span key={d} className="bg-blue-800/50 text-white text-xs px-2 py-0.5 rounded flex items-center gap-1 border border-blue-400/30">
                            {d} <button onClick={() => removeDestination(d)}><X size={10} /></button>
                            </span>
                        ))}
                    </div>
                    )}
                </div>

                {/* Actions */}
                <div className="md:col-span-4 flex justify-end pt-2 gap-3">
                    {editingRouteId && (
                        <button onClick={cancelEdit} className="bg-white/10 border border-white/30 text-white px-6 py-2 rounded-xl font-bold text-sm hover:bg-white/20 transition-all">
                            İptal
                        </button>
                    )}
                    <button onClick={handleAddRoute} className="bg-white text-blue-700 px-6 py-2 rounded-xl font-bold text-sm hover:bg-blue-50 shadow-lg transition-all transform active:scale-95 flex items-center gap-2">
                    <Save size={16} /> {editingRouteId ? 'Değişiklikleri Kaydet' : 'Rotayı Kaydet'}
                    </button>
                </div>
            </div>
        </div>
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
            <Map size={300} />
        </div>
    </div>

    <div className="space-y-4">
        <h3 className="font-bold text-slate-800 text-lg ml-1">Aktif Rotalarım</h3>
        {activeRoutes.length > 0 ? (
            activeRoutes.map(route => (
                <div key={route.id} className={`bg-white rounded-2xl border p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm transition-all ${editingRouteId === route.id ? 'border-blue-500 ring-1 ring-blue-500 bg-blue-50' : 'border-slate-200'}`}>
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shrink-0">
                        <Route size={24} />
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-bold text-slate-900">{route.origin}</h4>
                            <ArrowRight size={14} className="text-slate-400" />
                            <span className="text-slate-600">{route.destinations.join(', ')}</span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-slate-500 flex-wrap">
                            <span className="flex items-center gap-1"><Calendar size={12} /> {route.date}</span>
                            <span className="flex items-center gap-1"><Clock size={12} /> {route.time}</span>
                            <span className="flex items-center gap-1"><Truck size={12} /> {route.vehicle}</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    {route.matches > 0 && (
                        <div className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-bold flex items-center gap-1">
                            <Zap size={12} /> {route.matches} İş Eşleşti
                        </div>
                    )}
                    <div className="flex ml-auto md:ml-0 gap-2">
                        <button onClick={() => handleEditRoute(route)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <PenTool size={18} />
                        </button>
                        <button onClick={() => handleRemoveRoute(route.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 size={18} />
                        </button>
                    </div>
                </div>
                </div>
            ))
        ) : (
            <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200 text-slate-400">
                <Route size={32} className="mx-auto mb-2 opacity-50" />
                <p>Henüz kayıtlı rota bulunmuyor.</p>
            </div>
        )}
    </div>
    </div>
);

  const renderSupportTab = () => (
     <div className="p-4 md:p-6 h-full flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
           <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-4"><Headphones size={24} /></div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Canlı Destek</h3>
              <p className="text-slate-500 text-sm mb-6">Operasyonel sorunlar için 7/24 temsilcilerimize bağlanın.</p>
              <button className="w-full py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-colors">Sohbeti Başlat</button>
           </div>
           <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4"><FileText size={24} /></div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Talep Oluştur</h3>
              <p className="text-slate-500 text-sm mb-6">Finansal konular veya şikayetler için bilet oluşturun.</p>
              <button className="w-full py-3 bg-white border-2 border-slate-100 text-slate-700 rounded-xl font-bold hover:border-blue-200 hover:text-blue-600 transition-colors">Yeni Bilet Aç</button>
           </div>
        </div>

        <div className="flex-1 bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
           <h3 className="font-bold text-slate-800 mb-4">Geçmiş Taleplerim</h3>
           <div className="space-y-2">
              {MOCK_TICKETS.map(ticket => (
                 <div key={ticket.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-4">
                       <div className={`w-2 h-2 rounded-full ${ticket.status === 'open' ? 'bg-green-500' : 'bg-slate-300'}`}></div>
                       <div>
                          <p className="font-bold text-slate-800 text-sm">{ticket.subject} <span className="text-slate-400 font-normal">#{ticket.id}</span></p>
                          <p className="text-xs text-slate-500">{ticket.date}</p>
                       </div>
                    </div>
                    <div className={`px-3 py-1 rounded-lg text-xs font-bold ${ticket.status === 'open' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                       {ticket.status === 'open' ? 'Açık' : 'Çözüldü'}
                    </div>
                 </div>
              ))}
           </div>
        </div>
     </div>
  );

  const renderSettingsTab = () => (
     <div className="p-4 md:p-6 flex flex-col md:flex-row gap-6 h-full">
        <div className="w-full md:w-64 shrink-0 space-y-1">
           {[
              { id: 'profile', label: 'Firma Bilgileri', icon: Briefcase },
              { id: 'services', label: 'Hizmet Ayarları', icon: Wrench },
              { id: 'documents', label: 'Belgeler', icon: FileCheck },
              { id: 'security', label: 'Güvenlik', icon: Lock },
           ].map(item => (
              <button 
                key={item.id}
                onClick={() => setSettingsSubTab(item.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${settingsSubTab === item.id ? 'bg-slate-800 text-white' : 'text-slate-500 hover:bg-slate-100'}`}
              >
                 <item.icon size={18} /> {item.label}
              </button>
           ))}
        </div>

        <div className="flex-1 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-8">
           {settingsSubTab === 'profile' && (
              <div className="space-y-6">
                 <h2 className="text-xl font-bold text-slate-800">Firma Profil Bilgileri</h2>
                 <div className="flex items-center gap-6">
                    <div className="w-24 h-24 rounded-full bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 cursor-pointer hover:bg-slate-200 hover:border-slate-400 transition-colors">
                       <Camera size={32} />
                    </div>
                    <div>
                       <button className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-100 transition-colors">Logo Yükle</button>
                       <p className="text-xs text-slate-400 mt-2">PNG, JPG (Max. 2MB)</p>
                    </div>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                       <label className="text-xs font-bold text-slate-500">Firma Adı</label>
                       <input type="text" defaultValue="Yılmaz Oto Kurtarma Ltd. Şti." className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 text-sm text-slate-800 font-medium focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                    <div className="space-y-1">
                       <label className="text-xs font-bold text-slate-500">Vergi Numarası</label>
                       <input type="text" defaultValue="1234567890" className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 text-sm text-slate-800 font-medium focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                    <div className="space-y-1">
                       <label className="text-xs font-bold text-slate-500">E-Posta</label>
                       <input type="email" defaultValue="info@yilmazoto.com" className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 text-sm text-slate-800 font-medium focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                    <div className="space-y-1">
                       <label className="text-xs font-bold text-slate-500">Telefon</label>
                       <input type="tel" defaultValue="+90 555 123 45 67" className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 text-sm text-slate-800 font-medium focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                 </div>
                 <div className="pt-4 border-t border-slate-100 flex justify-end">
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all">Değişiklikleri Kaydet</button>
                 </div>
              </div>
           )}
           {settingsSubTab === 'services' && (
              <div className="space-y-6">
                 <h2 className="text-xl font-bold text-slate-800">Hizmet & Fiyat Ayarları</h2>
                 <div className="p-4 bg-yellow-50 border border-yellow-100 rounded-xl flex gap-3 text-sm text-yellow-800">
                    <AlertTriangle className="shrink-0" size={20} />
                    <p>Burada belirlediğiniz taban fiyatlar müşteriye gösterilen "Başlangıç Fiyatı"dır. Kesin fiyat teklif sırasında belirlenir.</p>
                 </div>
                 <div className="space-y-4">
                    {['Oto Çekici', 'Akü Takviye', 'Lastik Değişimi', 'Yakıt İkmali', 'Oto Çilingir'].map(srv => (
                       <div key={srv} className="flex items-center justify-between p-4 border border-slate-200 rounded-xl">
                          <div className="flex items-center gap-3">
                             <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                             <span className="font-bold text-slate-700">{srv}</span>
                          </div>
                          <div className="flex items-center gap-2">
                             <span className="text-sm text-slate-400">Taban Fiyat:</span>
                             <div className="relative w-24">
                                <input type="number" defaultValue="500" className="w-full p-2 pl-6 bg-slate-50 rounded-lg border border-slate-200 text-sm font-bold outline-none" />
                                <span className="absolute left-2 top-2 text-slate-400 text-xs">₺</span>
                             </div>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
           )}
           {/* Placeholder for other tabs */}
           {(settingsSubTab === 'documents' || settingsSubTab === 'security') && (
              <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                 <Lock size={48} className="mb-4 opacity-20" />
                 <p>Bu alan şu an düzenlenemez.</p>
              </div>
           )}
        </div>
     </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-800">
      
      {/* SIDEBAR */}
      <div className="w-20 lg:w-64 bg-slate-900 text-white flex flex-col justify-between shrink-0 transition-all duration-300 sticky top-0 h-screen z-30">
        <div>
          <div className="h-20 flex items-center justify-center lg:justify-start lg:px-6 border-b border-slate-800">
            <img src="https://raw.githubusercontent.com/yosoyorhan/repo2/refs/heads/main/yolmov-logo-cutter-beyaz.png" alt="Yolmov Partner" className="hidden lg:block h-8 w-auto object-contain" />
            <img src="https://raw.githubusercontent.com/yosoyorhan/repo2/refs/heads/main/yolmov-icon-beyaz-removebg-preview.png" alt="Yolmov Icon" className="lg:hidden h-8 w-auto object-contain" />
          </div>

          <nav className="mt-8 px-2 space-y-2">
            {[
              { id: 'requests', label: 'Talep Havuzu', icon: Bell },
              { id: 'active', label: 'Aktif Görev', icon: Navigation },
              { id: 'service_routes', label: 'Hizmet Rotaları', icon: Route },
              { id: 'history', label: 'Geçmiş İşler', icon: History },
              { id: 'wallet', label: 'Finansal Durum', icon: Wallet },
              { id: 'fleet', label: 'Filo Yönetimi', icon: Truck },
              { id: 'support', label: 'Destek Merkezi', icon: Headphones },
              { id: 'settings', label: 'Ayarlar', icon: Settings },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-center lg:justify-start p-3 rounded-xl transition-all ${activeTab === item.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
              >
                <item.icon size={20} />
                <span className="hidden lg:block ml-3 font-medium">{item.label}</span>
                {item.id === 'requests' && requests.length > 0 && <span className="hidden lg:flex ml-auto bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{requests.length}</span>}
                {item.id === 'active' && activeJob && <span className="hidden lg:flex ml-auto w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></span>}
              </button>
            ))}
          </nav>
        </div>
        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-800">
          <div className="bg-slate-800 rounded-xl p-2 lg:p-3 mb-4 border border-slate-700 flex flex-col items-center lg:block">
            <div className="hidden lg:block">
                <p className="text-xs text-slate-400 mb-1">Bakiye</p>
                <div className="flex items-center justify-between"><span className="text-lg font-bold text-white flex items-center gap-2"><Coins size={16} className="text-yellow-400" /> {credits} Kredi</span><button onClick={() => setShowAddCreditModal(true)} className="text-xs bg-blue-600 px-2 py-1 rounded text-white hover:bg-blue-500 transition-colors">Yükle</button></div>
            </div>
            <div className="lg:hidden flex flex-col items-center gap-1">
                <div className="p-1.5 bg-slate-700 rounded-full text-yellow-400"><Coins size={16} /></div>
                <span className="text-[10px] font-bold text-white text-center leading-tight">{credits} Kr</span>
                <button onClick={() => setShowAddCreditModal(true)} className="w-full py-1 bg-blue-600 text-[10px] rounded text-white font-bold leading-none flex items-center justify-center">+</button>
            </div>
          </div>
          <div className="flex items-center gap-3 mb-4 px-2 justify-center lg:justify-start">
            <div className="w-10 h-10 rounded-full bg-slate-700 overflow-hidden border-2 border-slate-600 shrink-0"><img src="https://i.pravatar.cc/150?img=11" alt="Profile" /></div>
            <div className="hidden lg:block overflow-hidden"><p className="text-sm font-bold truncate">Yılmaz Oto Kurtarma</p><div className="flex items-center text-xs text-yellow-500"><span>★ 4.9</span><span className="text-slate-500 ml-1">(128 İş)</span></div></div>
          </div>
          <button onClick={onLogout} className="w-full flex items-center justify-center lg:justify-start p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"><LogOut size={18} /><span className="hidden lg:block ml-2 text-sm font-medium">Çıkış Yap</span></button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* TOP HEADER */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-10 sticky top-0 z-20">
          <h1 className="text-lg lg:text-xl font-bold text-slate-800 flex items-center gap-2 lg:gap-3 truncate">
            {activeTab === 'requests' && 'İş Talepleri'}
            {activeTab === 'active' && 'Aktif Operasyon'}
            {activeTab === 'wallet' && 'Finansal Durum'}
            {activeTab === 'history' && 'İş Geçmişi'}
            {activeTab === 'settings' && 'Hesap Ayarları'}
            {activeTab === 'fleet' && 'Filo Yönetimi'}
            {activeTab === 'support' && 'Destek Merkezi'}
            {activeTab === 'service_routes' && 'Hizmet Rotaları'}
          </h1>
          <div className="flex items-center gap-4 shrink-0">
            <div className={`flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2 rounded-full border transition-colors ${isOnline ? 'bg-green-50 border-green-200' : 'bg-slate-100 border-slate-200'}`}>
              <span className={`w-2.5 h-2.5 rounded-full ${isOnline ? 'bg-green-500 animate-pulse' : 'bg-slate-400'}`}></span>
              <span className={`text-xs lg:text-sm font-bold ${isOnline ? 'text-green-700' : 'text-slate-500'}`}>
                {isOnline ? (
                  <>
                    <span className="hidden sm:inline">Müsaitsiniz</span>
                    <span className="sm:hidden">Aktif</span>
                  </>
                ) : (
                  <>
                    <span className="hidden sm:inline">Meşgulsünüz</span>
                    <span className="sm:hidden">Pasif</span>
                  </>
                )}
              </span>
              <button onClick={() => setIsOnline(!isOnline)} className="ml-1 lg:ml-2 text-xs underline text-slate-500 hover:text-slate-800">Değiştir</button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-0 lg:p-6 relative">
          {/* Render Content Based on Active Tab */}
          {activeTab === 'requests' && (
            <div className="space-y-6 p-4 md:p-6">
               {/* Enhanced Filter Bar */}
               <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                 <div className="flex w-full md:w-auto bg-white p-1 rounded-xl border border-slate-200 shadow-sm overflow-x-auto">
                    {[{ id: 'all', label: 'Tümü' }, { id: 'nearest', label: 'En Yakın' }, { id: 'urgent', label: 'Acil İşler' }].map(f => (
                       <button key={f.id} onClick={() => setFilterMode(f.id as any)} className={`flex-1 md:flex-none px-4 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${filterMode === f.id ? 'bg-slate-800 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'}`}>{f.label}</button>
                    ))}
                 </div>
                 <div className="flex items-center bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
                    <button onClick={() => setViewMode('list')} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all ${viewMode === 'list' ? 'bg-blue-50 text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}><List size={16} /> Liste</button>
                    <div className="w-px h-4 bg-slate-200 mx-1"></div>
                    <button onClick={() => setViewMode('map')} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all ${viewMode === 'map' ? 'bg-blue-50 text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}><Map size={16} /> Harita</button>
                 </div>
               </div>

               {filteredRequests.length > 0 ? (
                 <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                   {filteredRequests.map((req) => {
                      const isUnlocked = unlockedJobs.includes(req.id);
                      const isOffering = offeringJobId === req.id;
                      const hasError = offerError === req.id;
                      return (
                         <motion.div 
                           key={req.id} 
                           initial={{ opacity: 0, y: 20 }} 
                           animate={{ opacity: 1, y: 0 }} 
                           exit={{ opacity: 0, scale: 0.95 }} 
                           className={`bg-white rounded-3xl border transition-all relative overflow-hidden group hover:shadow-xl ${hasError ? 'border-red-200 bg-red-50' : isUnlocked ? 'border-green-200 shadow-lg ring-1 ring-green-100' : 'border-slate-200 shadow-sm'}`}
                         >
                            <div className="p-6">
                               {/* Header Section */}
                               <div className="flex justify-between items-start mb-6">
                                  <div className="flex items-start gap-4">
                                     <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors shrink-0 shadow-sm ${isUnlocked ? 'bg-green-100 text-green-600' : 'bg-blue-50 text-blue-600'}`}>
                                        {req.serviceType.includes('Çekici') ? <Truck size={28} /> : req.serviceType.includes('Akü') ? <Zap size={28} /> : <Wrench size={28} />}
                                     </div>
                                     <div>
                                        <div className="flex items-center gap-2 mb-1">
                                           <h3 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight">{req.serviceType}</h3>
                                           {req.urgency === 'high' && !hasError && (
                                              <span className="flex items-center gap-1 bg-red-100 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse border border-red-200">
                                                 <AlertTriangle size={10} /> ACİL
                                              </span>
                                           )}
                                        </div>
                                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">#{req.id} • {req.timestamp}</p>
                                     </div>
                                  </div>
                               </div>

                               {/* Timeline Route */}
                               <div className="relative pl-4 py-2 space-y-8 my-8 border-l-[3px] border-slate-100 ml-2.5">
                                  <div className="relative">
                                     <div className="absolute -left-[21px] top-1 w-5 h-5 rounded-full bg-blue-500 border-[4px] border-white shadow-md ring-1 ring-slate-100"></div>
                                     <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Alınacak Konum</p>
                                        <p className="font-bold text-slate-900 text-lg leading-tight">{req.location}</p>
                                        <p className="text-xs text-blue-600 font-bold mt-1 flex items-center gap-1 bg-blue-50 w-fit px-2 py-0.5 rounded"><Navigation size={10} /> {req.distance} uzaklıkta</p>
                                     </div>
                                  </div>
                                  {req.dropoffLocation && (
                                     <div className="relative">
                                        <div className="absolute -left-[21px] top-1 w-5 h-5 rounded-full bg-slate-800 border-[4px] border-white shadow-md ring-1 ring-slate-100"></div>
                                        <div>
                                           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Teslim Noktası</p>
                                           <p className="font-bold text-slate-900 text-lg leading-tight">{req.dropoffLocation}</p>
                                        </div>
                                     </div>
                                  )}
                               </div>

                               {/* Footer Actions */}
                               <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-6 border-t border-slate-50 gap-4 sm:gap-0">
                                  <div className="flex items-center gap-3">
                                     <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors border-2 border-white shadow-sm ${isUnlocked ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                                        {isUnlocked ? req.customerName.charAt(0) : <Lock size={16} />}
                                     </div>
                                     <div>
                                        <p className="text-sm font-bold text-slate-800">{isUnlocked ? req.customerName : `${req.customerName.split(' ')[0]} ***`}</p>
                                        <p className="text-xs text-slate-400 font-medium">{req.vehicleInfo}</p>
                                     </div>
                                  </div>
                                  
                                  <div className="flex gap-2 w-full sm:w-auto flex-col sm:flex-row items-end">
                                     {!isUnlocked ? (
                                        hasError ? (
                                           <div className="flex-1 bg-red-50 text-red-600 px-4 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 w-full border border-red-100">
                                              <AlertTriangle size={16} /> Teklif Kabul Edilmedi
                                           </div>
                                        ) : isOffering ? (
                                           <div className="flex-1 bg-blue-50 text-blue-600 px-4 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 w-full border border-blue-100 animate-pulse">
                                              <Loader2 size={16} className="animate-spin" /> Müşteri Değerlendiriyor...
                                           </div>
                                        ) : (
                                           <div className="flex flex-col items-end gap-1 w-full sm:w-auto">
                                              <div className="flex gap-2 w-full sm:w-auto">
                                                 <button className="flex-1 sm:flex-none px-4 py-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-500 hover:bg-slate-50 text-center transition-colors" disabled={isOffering}>Reddet</button>
                                                 <button 
                                                    onClick={() => handleOpenQuoteModal(req)} 
                                                    className="flex-[2] sm:flex-none px-6 py-3 rounded-xl text-sm font-bold shadow-lg shadow-blue-200 flex items-center justify-center gap-2 whitespace-nowrap min-w-[160px] transition-all active:scale-95 bg-blue-600 text-white hover:bg-blue-700"
                                                 >
                                                    <Send size={16} /> <span className="hidden sm:inline">Teklif Gönder</span><span className="sm:hidden">Teklif Ver</span>
                                                 </button>
                                              </div>
                                              <span className="text-[10px] text-slate-400 italic">Onaylanırsa 1 Kredi düşer</span>
                                           </div>
                                        )
                                     ) : (
                                        <div className="flex gap-2 w-full sm:w-auto">
                                           <button className="flex-1 sm:flex-none w-12 h-12 flex items-center justify-center rounded-xl bg-green-50 text-green-600 hover:bg-green-100 border border-green-200 transition-colors shadow-sm" title="Ara"><Phone size={20} /></button>
                                           <button className="flex-1 sm:flex-none w-12 h-12 flex items-center justify-center rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200 transition-colors shadow-sm" title="Mesaj"><MessageSquare size={20} /></button>
                                           <button 
                                             onClick={() => handleStartOperation(req)} 
                                             className="flex-[2] sm:flex-none px-6 py-3 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-slate-800 shadow-xl shadow-slate-200 flex items-center justify-center gap-2 whitespace-nowrap transition-transform active:scale-95"
                                           >
                                              <span className="hidden sm:inline">Operasyonu Başlat</span><span className="sm:hidden">Başlat</span><ArrowRight size={16} />
                                           </button>
                                        </div>
                                     )}
                                  </div>
                               </div>
                            </div>

                            {/* Bottom Countdown Bar */}
                            {!isUnlocked && req.expiresIn && !hasError && !isOffering && (
                               <div className="absolute bottom-0 left-0 w-full h-1.5 bg-slate-100">
                                  <div 
                                    className="h-full bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#ef4444_10px,#ef4444_20px)] animate-move-stripes w-full"
                                    style={{ backgroundSize: '28px 28px' }} // Simulated stripe effect
                                  ></div>
                               </div>
                            )}
                            <style>{`
                               @keyframes move-stripes {
                                  0% { background-position: 0 0; }
                                  100% { background-position: 28px 0; }
                               }
                               .animate-move-stripes {
                                  animation: move-stripes 1s linear infinite;
                               }
                            `}</style>
                         </motion.div>
                      );
                   })}
                 </div>
               ) : (
                 <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-slate-200">
                   <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400"><Bell size={32} /></div>
                   <h3 className="text-xl font-bold text-slate-700">Şu an yeni talep yok</h3>
                   <p className="text-slate-400 max-w-xs mx-auto mt-2">Seçili kriterlere uygun iş bulunamadı.</p>
                   <button onClick={() => setFilterMode('all')} className="mt-6 px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-bold transition-colors">Filtreleri Temizle</button>
                 </div>
               )}
            </div>
          )}
          {activeTab === 'active' && (
            <div className="h-full flex flex-col lg:flex-row">
               {activeJob ? (
                 <>
                  <div className="flex-1 bg-slate-900 relative overflow-hidden min-h-[400px]">
                     <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)', backgroundSize: '30px 30px'}}></div>
                     <svg className="absolute inset-0 w-full h-full pointer-events-none z-0"><path d="M 200 150 Q 400 100 600 300 T 900 400" fill="none" stroke="#3B82F6" strokeWidth="6" strokeDasharray="10 5" className="animate-pulse" /><circle cx="200" cy="150" r="80" fill="#3B82F6" fillOpacity="0.1" className="animate-ping" /></svg>
                     <div className="absolute top-[150px] left-[200px] -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center"><div className="w-12 h-12 bg-blue-600 rounded-full border-4 border-slate-900 shadow-xl flex items-center justify-center text-white z-10"><Navigation size={20} fill="currentColor" /></div><div className="bg-slate-900 text-white text-xs px-2 py-1 rounded mt-2 font-bold">Siz</div></div>
                     <div className="absolute top-[300px] left-[600px] -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center"><div className="w-10 h-10 bg-orange-500 rounded-full border-4 border-slate-900 shadow-xl flex items-center justify-center text-white z-10"><User size={18} fill="currentColor" /></div><div className="bg-slate-900 text-white text-xs px-2 py-1 rounded mt-2 font-bold">{activeJob.customerName}</div></div>
                     {activeJob.dropoffLocation && (<div className="absolute top-[400px] left-[900px] -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center"><div className="w-10 h-10 bg-green-500 rounded-full border-4 border-slate-900 shadow-xl flex items-center justify-center text-white z-10"><MapPin size={18} fill="currentColor" /></div><div className="bg-slate-900 text-white text-xs px-2 py-1 rounded mt-2 font-bold">Varış</div></div>)}
                  </div>
                  <div className="w-full lg:w-[450px] bg-white border-l border-slate-200 flex flex-col shadow-2xl z-20">
                     <div className="p-6 border-b border-slate-100"><div className="flex justify-between items-start mb-2"><h2 className="text-xl font-bold text-slate-900">{activeJob.serviceType}</h2><span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded">#{activeJob.id}</span></div><p className="text-sm text-slate-500">{activeJob.location} {activeJob.dropoffLocation && `➔ ${activeJob.dropoffLocation}`}</p></div>
                     <div className="p-6 bg-blue-50 border-y border-blue-100"><div className="flex items-center gap-4 mb-4"><div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-xl font-bold text-blue-600 shadow-sm">{activeJob.customerName.charAt(0)}</div><div><h3 className="font-bold text-slate-900">{activeJob.customerName}</h3><p className="text-sm text-slate-500">{activeJob.vehicleInfo}</p></div></div><div className="grid grid-cols-2 gap-3"><button className="flex items-center justify-center gap-2 bg-white py-3 rounded-xl text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50"><Phone size={16} className="text-green-600" /> Ara</button><button className="flex items-center justify-center gap-2 bg-white py-3 rounded-xl text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50"><MessageSquare size={16} className="text-blue-600" /> Mesaj</button></div></div>
                     <div className="flex-1 p-6 overflow-y-auto">
                        <div className="relative space-y-8 pl-6 border-l-2 border-slate-100 ml-3 mb-8">{[{ id: 0, label: 'Kabul Edildi', time: '10:30' }, { id: 1, label: 'Yola Çıkıldı', time: jobStage >= 1 ? '10:32' : '-' }, { id: 2, label: 'Konuma Varıldı', time: jobStage >= 2 ? '10:45' : '-' }, { id: 3, label: 'Hizmet Tamamlandı', time: jobStage >= 3 ? '11:15' : '-' }].map((step) => (<div key={step.id} className="relative"><div className={`absolute -left-[31px] top-0 w-4 h-4 rounded-full border-[3px] border-white shadow-sm transition-colors ${jobStage >= step.id ? 'bg-green-500' : 'bg-slate-200'}`}></div><div className="flex justify-between items-center"><p className={`text-sm font-bold ${jobStage >= step.id ? 'text-slate-900' : 'text-slate-400'}`}>{step.label}</p><span className="text-xs text-slate-400">{step.time}</span></div></div>))}</div>
                        {jobStage === 2 && !hasStartProof && (<div className="mb-6 bg-orange-50 p-4 rounded-xl border border-dashed border-orange-300 text-center animate-pulse"><Camera className="mx-auto text-orange-400 mb-2" size={24} /><p className="text-sm font-bold text-orange-700 mb-1">Başlangıç Fotoğrafı Zorunlu</p><p className="text-xs text-orange-600 mb-3">Hizmete başlamadan önce aracın durumunu belgeleyin.</p><button onClick={() => setHasStartProof(true)} className="bg-white border border-orange-200 text-orange-600 px-4 py-2 rounded-lg text-xs font-bold hover:bg-orange-50 shadow-sm">Fotoğraf Çek / Yükle</button></div>)}
                        {jobStage === 3 && !hasEndProof && (<div className="mb-6 bg-green-50 p-4 rounded-xl border border-dashed border-green-300 text-center animate-pulse"><Camera className="mx-auto text-green-400 mb-2" size={24} /><p className="text-sm font-bold text-green-700 mb-1">Hizmet Kanıtı Zorunlu</p><p className="text-xs text-green-600 mb-3">Tamamlamadan önce bitmiş işin fotoğrafını yükleyin.</p><button onClick={() => setHasEndProof(true)} className="bg-white border border-green-200 text-green-600 px-4 py-2 rounded-lg text-xs font-bold hover:bg-green-50 shadow-sm">Fotoğraf Çek / Yükle</button></div>)}
                        <div className="mt-auto"><button onClick={advanceJobStage} className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg transition-all transform active:scale-95 flex items-center justify-center gap-3 ${jobStage === 0 ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-200' : jobStage === 1 ? 'bg-purple-600 hover:bg-purple-700 shadow-purple-200' : jobStage === 2 ? 'bg-orange-500 hover:bg-orange-600 shadow-orange-200' : 'bg-green-600 hover:bg-green-700 shadow-green-200'}`}>{getStageLabel()} <ArrowRight size={20} /></button><button onClick={() => setActiveJob(null)} className="w-full mt-3 py-3 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-colors">Acil Durum / İptal</button></div>
                     </div>
                  </div>
                 </>
               ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-white"><div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6"><Navigation size={40} className="text-slate-300" /></div><h2 className="text-2xl font-bold text-slate-700">Aktif Görev Bulunamadı</h2><p className="text-slate-400 mt-2 mb-8">Lütfen talep havuzundan bir iş kabul edin.</p><button onClick={() => setActiveTab('requests')} className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700">İş Listesine Dön</button></div>
               )}
            </div>
          )}
          {activeTab === 'history' && renderHistoryTab()}
          {activeTab === 'wallet' && renderWalletTab()}
          {activeTab === 'settings' && renderSettingsTab()}
          {activeTab === 'fleet' && renderFleetTab()}
          {activeTab === 'service_routes' && renderServiceRoutesTab()}
          {activeTab === 'support' && renderSupportTab()}
        </main>
      </div>
      <AnimatePresence>{selectedHistoryItem && renderHistoryDetailModal()}</AnimatePresence>
      <AnimatePresence>{showAddCreditModal && renderAddCreditModal()}</AnimatePresence>
      <AnimatePresence>{selectedJobForQuote && renderQuoteModal()}</AnimatePresence>
      <AnimatePresence>{showRatingModal && renderRatingModal()}</AnimatePresence>
    </div>
  );
};

export default PartnerDashboard;
