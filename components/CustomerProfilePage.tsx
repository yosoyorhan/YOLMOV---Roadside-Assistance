import React, { useState } from 'react';
import { Customer } from '../types';
import { Phone, Mail, MapPin, User, Edit3, Check, X, Calendar, ShieldCheck, LogOut } from 'lucide-react';
import { CITIES_WITH_DISTRICTS } from '../constants';

interface CustomerProfilePageProps {
  customer: Customer;
  onUpdate: (updated: Customer) => void;
  onLogout: () => void;
  onBackHome: () => void;
}

const CustomerProfilePage: React.FC<CustomerProfilePageProps> = ({ customer, onUpdate, onLogout, onBackHome }) => {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<Customer>(customer);

  const handleChange = (field: keyof Customer, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (field === 'city') {
      setForm(prev => ({ ...prev, district: '' }));
    }
  };

  const handleSave = () => {
    onUpdate(form);
    setEditing(false);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-50 py-8 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-start gap-8">
          {/* Left Column: Profile Card */}
          <div className="md:w-1/3 w-full">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <div className="flex flex-col items-center text-center">
                <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-orange-200 to-orange-400 flex items-center justify-center text-white text-3xl font-bold shadow-inner">
                  {customer.avatarUrl ? (
                    <img src={customer.avatarUrl} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    customer.firstName.charAt(0)
                  )}
                  <div className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow border border-gray-100">
                    <ShieldCheck size={20} className="text-brand-orange" />
                  </div>
                </div>
                <h2 className="mt-4 text-xl font-bold text-gray-900">{customer.firstName} {customer.lastName}</h2>
                <p className="text-xs text-gray-400 uppercase tracking-wider font-bold mt-1">Yolmov Üyesi</p>
                <div className="mt-4 space-y-2 w-full text-left">
                  <div className="flex items-center gap-2 text-sm text-gray-600"><Phone size={16} className="text-brand-orange" /> {customer.phone}</div>
                  {customer.email && (
                    <div className="flex items-center gap-2 text-sm text-gray-600"><Mail size={16} className="text-brand-orange" /> {customer.email}</div>
                  )}
                  {(customer.city && customer.district) && (
                    <div className="flex items-center gap-2 text-sm text-gray-600"><MapPin size={16} className="text-brand-orange" /> {customer.district}, {customer.city}</div>
                  )}
                </div>
                <div className="flex gap-2 mt-6 w-full">
                  <button onClick={onBackHome} className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-700 text-sm font-bold hover:bg-gray-200 transition-colors">Ana Sayfa</button>
                  <button onClick={onLogout} className="flex-1 py-3 rounded-xl bg-red-50 text-red-600 text-sm font-bold hover:bg-red-100 transition-colors flex items-center justify-center gap-1"><LogOut size={16}/> Çıkış</button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editable Info */}
          <div className="flex-1">
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-display font-bold text-gray-900">Profil Bilgileri</h3>
                {!editing ? (
                  <button onClick={() => setEditing(true)} className="px-4 py-2 rounded-xl bg-brand-orange text-white text-sm font-bold flex items-center gap-1 hover:bg-brand-lightOrange transition-colors"><Edit3 size={16}/> Düzenle</button>
                ) : (
                  <div className="flex gap-2">
                    <button onClick={handleSave} className="px-4 py-2 rounded-xl bg-green-600 text-white text-sm font-bold flex items-center gap-1 hover:bg-green-700"><Check size={16}/> Kaydet</button>
                    <button onClick={() => { setForm(customer); setEditing(false); }} className="px-4 py-2 rounded-xl bg-gray-100 text-gray-600 text-sm font-bold flex items-center gap-1 hover:bg-gray-200"><X size={16}/> İptal</button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Ad</label>
                  <div className="relative">
                    <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input disabled={!editing} value={form.firstName} onChange={e => handleChange('firstName', e.target.value)} className="w-full pl-10 pr-3 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none text-sm font-medium" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Soyad</label>
                  <div className="relative">
                    <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input disabled={!editing} value={form.lastName} onChange={e => handleChange('lastName', e.target.value)} className="w-full pl-10 pr-3 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none text-sm font-medium" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Telefon</label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input disabled={!editing} value={form.phone} onChange={e => handleChange('phone', e.target.value)} className="w-full pl-10 pr-3 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none text-sm font-medium" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">E-Posta (Opsiyonel)</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input disabled={!editing} value={form.email || ''} onChange={e => handleChange('email', e.target.value)} className="w-full pl-10 pr-3 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none text-sm font-medium" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Şehir</label>
                  <div className="relative">
                    <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <select disabled={!editing} value={form.city || ''} onChange={e => handleChange('city', e.target.value)} className="w-full pl-10 pr-3 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none text-sm font-medium">
                      <option value="">Seçiniz</option>
                      {Object.keys(CITIES_WITH_DISTRICTS).map(city => <option key={city} value={city}>{city}</option>)}
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">İlçe</label>
                  <div className="relative">
                    <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <select disabled={!editing || !form.city} value={form.district || ''} onChange={e => handleChange('district', e.target.value)} className="w-full pl-10 pr-3 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none text-sm font-medium">
                      <option value="">Seçiniz</option>
                      {form.city && CITIES_WITH_DISTRICTS[form.city].map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* Activity / Placeholder sections */}
              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl bg-orange-50 border border-orange-100">
                  <h4 className="font-bold text-sm text-gray-800 mb-2 flex items-center gap-2"><Calendar size={16} className="text-brand-orange" /> Son İşlemler</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">Yakında burada son çekici veya yol yardım taleplerinizi göreceksiniz.</p>
                </div>
                <div className="p-5 rounded-2xl bg-gray-100 border border-gray-200">
                  <h4 className="font-bold text-sm text-gray-800 mb-2 flex items-center gap-2"><ShieldCheck size={16} className="text-gray-700" /> Güvenlik</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">Telefon doğrulaması başarıyla tamamlandı. İleri seviye güvenlik (2FA) yakında.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfilePage;
