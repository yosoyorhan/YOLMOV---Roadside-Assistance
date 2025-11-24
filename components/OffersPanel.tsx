import React, { useEffect, useState } from 'react';
import { Customer, Request, Offer } from '../types';
import { seedDemoRequests, getRequestsByCustomer, getOffersForRequest, acceptOffer, rejectOffer } from '../services/mockApi';
import { ArrowLeft, MapPin, CheckCircle2, XCircle, Clock, Handshake, FilePlus, Check, X, RefreshCcw } from 'lucide-react';

interface OffersPanelProps {
  customer: Customer;
  onBack: () => void;
}

const statusBadge = (status: Request['status']) => {
  const base = 'text-xs px-2 py-1 rounded font-bold';
  switch (status) {
    case 'open': return base + ' bg-blue-50 text-blue-600';
    case 'matched': return base + ' bg-green-50 text-green-600';
    case 'completed': return base + ' bg-gray-100 text-gray-600';
    case 'cancelled': return base + ' bg-red-50 text-red-600';
    default: return base + ' bg-gray-50 text-gray-500';
  }
};

const offerStatusBadge = (status: Offer['status']) => {
  const base = 'text-[10px] px-2 py-0.5 rounded font-bold';
  switch (status) {
    case 'sent': return base + ' bg-blue-50 text-blue-600';
    case 'accepted': return base + ' bg-green-50 text-green-600';
    case 'rejected': return base + ' bg-red-50 text-red-600';
    case 'withdrawn': return base + ' bg-gray-100 text-gray-500';
    default: return base + ' bg-gray-50 text-gray-500';
  }
};

const OffersPanel: React.FC<OffersPanelProps> = ({ customer, onBack }) => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loadingOffers, setLoadingOffers] = useState(false);

  useEffect(() => {
    seedDemoRequests(customer.id);
    setRequests(getRequestsByCustomer(customer.id));
  }, [customer.id]);

  const loadOffers = (req: Request) => {
    setSelectedRequest(req);
    setLoadingOffers(true);
    setTimeout(() => { // simulate latency
      setOffers(getOffersForRequest(req.id));
      setLoadingOffers(false);
    }, 300);
  };

  const handleAccept = (offerId: string) => {
    acceptOffer(offerId);
    if (selectedRequest) {
      setOffers(getOffersForRequest(selectedRequest.id));
      setRequests(getRequestsByCustomer(customer.id));
    }
  };

  const handleReject = (offerId: string) => {
    rejectOffer(offerId);
    if (selectedRequest) setOffers(getOffersForRequest(selectedRequest.id));
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-50 py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={onBack} className="inline-flex items-center gap-2 text-gray-600 hover:text-brand-orange text-sm font-bold"><ArrowLeft size={18}/> Geri</button>
          <h1 className="text-2xl font-display font-bold text-gray-900">Talepler & Teklifler</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Requests List */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-800">Taleplerim</h2>
                <button onClick={() => setRequests(getRequestsByCustomer(customer.id))} className="text-xs font-bold flex items-center gap-1 text-gray-500 hover:text-brand-orange"><RefreshCcw size={14}/> Yenile</button>
              </div>
              {requests.length === 0 && (
                <div className="text-center py-12">
                  <FilePlus size={42} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-sm text-gray-500 mb-2">Henüz bir talep oluşturmadınız.</p>
                  <p className="text-xs text-gray-400">Quote sihirbazından veya geçici seed ile örnek talep ekleyebilirsiniz.</p>
                </div>
              )}
              <div className="space-y-3">
                {requests.map(r => (
                  <div key={r.id} onClick={() => loadOffers(r)} className={`p-4 rounded-xl border cursor-pointer transition-all group ${selectedRequest?.id === r.id ? 'border-brand-orange bg-orange-50/60' : 'border-gray-100 hover:border-brand-orange hover:bg-orange-50/40'}`}> 
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-bold text-sm text-gray-800 group-hover:text-brand-orange capitalize">{r.serviceType}</p>
                        <p className="text-xs text-gray-400 mt-0.5">#{r.id} • {new Date(r.createdAt).toLocaleString('tr-TR')}</p>
                      </div>
                      <span className={statusBadge(r.status)}>{r.status}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2 line-clamp-2">{r.description}</p>
                    <div className="flex items-center gap-2 mt-2 text-[11px] text-gray-500">
                      <MapPin size={12} className="text-brand-orange" /> {r.fromLocation} {r.toLocation && (<><span className="text-gray-400">→</span> {r.toLocation}</>)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Offers Panel */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 min-h-[400px]">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-800">{selectedRequest ? 'Teklifler' : 'Bir talep seçin'}</h2>
                {selectedRequest && <span className={statusBadge(selectedRequest.status)}>{selectedRequest.status}</span>}
              </div>

              {!selectedRequest && (
                <div className="flex flex-col items-center justify-center h-64 text-center text-gray-500">
                  <Handshake size={48} className="mb-4 text-gray-300" />
                  <p className="text-sm">Soldan bir talep seçerek gelen teklifleri görüntüleyin.</p>
                </div>
              )}

              {selectedRequest && loadingOffers && (
                <div className="flex flex-col items-center justify-center h-64 text-center text-gray-500 animate-pulse">
                  <Clock size={42} className="mb-4 text-gray-300" />
                  <p className="text-sm">Teklifler yükleniyor...</p>
                </div>
              )}

              {selectedRequest && !loadingOffers && offers.length === 0 && (
                <div className="flex flex-col items-center justify-center h-64 text-center text-gray-500">
                  <XCircle size={48} className="mb-4 text-gray-300" />
                  <p className="text-sm">Bu talep için henüz teklif gelmedi.</p>
                  <p className="text-xs text-gray-400 mt-1">Partnerler teklif verdiğinde burada gözükecek.</p>
                </div>
              )}

              {selectedRequest && !loadingOffers && offers.length > 0 && (
                <div className="space-y-3">
                  {offers.map(of => (
                    <div key={of.id} className="p-4 rounded-xl border border-gray-100 hover:border-brand-orange hover:bg-orange-50/40 transition-all">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-bold text-sm text-gray-800">Partner #{of.partnerId}</p>
                          <p className="text-xs text-gray-400 mt-0.5">Teklif ID: {of.id}</p>
                        </div>
                        <span className={offerStatusBadge(of.status)}>{of.status}</span>
                      </div>
                      <div className="flex items-center gap-4 mt-3">
                        <div className="text-sm font-bold text-brand-orange">₺{of.price}</div>
                        <div className="text-xs text-gray-500">ETA: {of.etaMinutes} dk</div>
                      </div>
                      {of.message && <p className="text-xs text-gray-600 mt-2 line-clamp-2">"{of.message}"</p>}
                      <div className="flex gap-2 mt-3">
                        {of.status === 'sent' && (
                          <>
                            <button onClick={() => handleAccept(of.id)} className="px-3 py-2 rounded-lg bg-green-600 text-white text-xs font-bold flex items-center gap-1 hover:bg-green-700"><Check size={14}/> Kabul</button>
                            <button onClick={() => handleReject(of.id)} className="px-3 py-2 rounded-lg bg-gray-100 text-gray-700 text-xs font-bold flex items-center gap-1 hover:bg-gray-200"><X size={14}/> Red</button>
                          </>
                        )}
                        {of.status === 'accepted' && (
                          <div className="flex items-center gap-1 text-green-600 text-xs font-bold"><CheckCircle2 size={16}/> Kabul edildi - iletişim açıldı</div>
                        )}
                        {of.status === 'rejected' && (
                          <div className="flex items-center gap-1 text-red-600 text-xs font-bold"><XCircle size={16}/> Reddedildi</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default OffersPanel;
