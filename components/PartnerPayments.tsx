/**
 * Partner Payments & Commission Component
 * Partnerin ödemeleri, komisyon detayları ve kazanç takibi
 */

import React, { useState } from 'react';
import { DollarSign, TrendingUp, TrendingDown, Calendar, Download, Eye, CreditCard, Wallet, ArrowUpRight, ArrowDownLeft, Receipt, Filter, CheckCircle, Clock, XCircle, Coins, Percent } from 'lucide-react';
import { motion } from 'framer-motion';

interface Payment {
  id: string;
  jobId: string;
  type: 'earning' | 'commission' | 'fee';
  amount: number;
  grossAmount?: number;
  commission?: number;
  commissionRate?: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  paymentMethod: 'cash' | 'card' | 'bank_transfer';
  customer?: string;
  service?: string;
}

// MOCK DATA
const MOCK_PAYMENTS: Payment[] = [
  {
    id: 'PAY-1234',
    jobId: 'JOB-4923',
    type: 'earning',
    grossAmount: 850,
    commission: 85,
    commissionRate: 10,
    amount: 765,
    date: '2023-11-22 15:00',
    status: 'completed',
    paymentMethod: 'cash',
    customer: 'Ahmet Yılmaz',
    service: 'Çekici Hizmeti',
  },
  {
    id: 'PAY-1233',
    jobId: 'JOB-4922',
    type: 'earning',
    grossAmount: 400,
    commission: 40,
    commissionRate: 10,
    amount: 360,
    date: '2023-11-21 10:30',
    status: 'completed',
    paymentMethod: 'card',
    customer: 'Selin Kaya',
    service: 'Akü Takviyesi',
  },
  {
    id: 'PAY-1232',
    jobId: 'JOB-4920',
    type: 'earning',
    grossAmount: 1200,
    commission: 120,
    commissionRate: 10,
    amount: 1080,
    date: '2023-11-19 12:30',
    status: 'pending',
    paymentMethod: 'bank_transfer',
    customer: 'Caner Erkin',
    service: 'Çekici Hizmeti',
  },
  {
    id: 'PAY-1231',
    jobId: 'JOB-4918',
    type: 'earning',
    grossAmount: 900,
    commission: 90,
    commissionRate: 10,
    amount: 810,
    date: '2023-11-15 11:00',
    status: 'completed',
    paymentMethod: 'cash',
    customer: 'Burak Y.',
    service: 'Çekici Hizmeti',
  },
  {
    id: 'FEE-501',
    jobId: '-',
    type: 'fee',
    amount: -50,
    date: '2023-11-10 14:00',
    status: 'completed',
    paymentMethod: 'card',
    service: 'Platform Üyelik Ücreti',
  },
];

export const PartnerPayments: React.FC = () => {
  const [filterType, setFilterType] = useState<'all' | 'earning' | 'commission' | 'fee'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'pending' | 'failed'>('all');
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  const filteredPayments = MOCK_PAYMENTS.filter(payment => {
    const matchesType = filterType === 'all' || payment.type === filterType;
    const matchesStatus = filterStatus === 'all' || payment.status === filterStatus;
    return matchesType && matchesStatus;
  });

  // Hesaplamalar
  const totalEarnings = MOCK_PAYMENTS
    .filter(p => p.type === 'earning' && p.status === 'completed')
    .reduce((sum, p) => sum + (p.grossAmount || p.amount), 0);

  const totalCommission = MOCK_PAYMENTS
    .filter(p => p.type === 'earning' && p.status === 'completed')
    .reduce((sum, p) => sum + (p.commission || 0), 0);

  const netEarnings = MOCK_PAYMENTS
    .filter(p => p.type === 'earning' && p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);

  const pendingPayments = MOCK_PAYMENTS
    .filter(p => p.status === 'pending')
    .reduce((sum, p) => sum + p.amount, 0);

  const getStatusBadge = (status: Payment['status']) => {
    const config = {
      completed: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200', icon: CheckCircle, label: 'Tamamlandı' },
      pending: { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200', icon: Clock, label: 'Beklemede' },
      failed: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', icon: XCircle, label: 'Başarısız' },
    };
    const { bg, text, border, icon: Icon, label } = config[status];
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${bg} ${text} ${border}`}>
        <Icon size={12} />
        {label}
      </span>
    );
  };

  const getPaymentMethodLabel = (method: Payment['paymentMethod']) => {
    const labels = {
      cash: 'Nakit',
      card: 'Kredi Kartı',
      bank_transfer: 'Banka Havalesi',
    };
    return labels[method] || method;
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-5 text-white shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <TrendingUp size={24} />
            </div>
            <ArrowUpRight size={20} className="opacity-60" />
          </div>
          <p className="text-sm text-green-100 mb-1">Toplam Kazanç (Brüt)</p>
          <p className="text-3xl font-bold">{totalEarnings.toLocaleString()} ₺</p>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-5 text-white shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <Percent size={24} />
            </div>
            <ArrowDownLeft size={20} className="opacity-60" />
          </div>
          <p className="text-sm text-orange-100 mb-1">Toplam Komisyon</p>
          <p className="text-3xl font-bold">{totalCommission.toLocaleString()} ₺</p>
          <p className="text-xs text-orange-100 mt-1">%10 platform komisyonu</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-5 text-white shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <Wallet size={24} />
            </div>
            <Coins size={20} className="opacity-60" />
          </div>
          <p className="text-sm text-blue-100 mb-1">Net Kazanç</p>
          <p className="text-3xl font-bold">{netEarnings.toLocaleString()} ₺</p>
        </div>

        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-5 text-white shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <Clock size={24} />
            </div>
            <Receipt size={20} className="opacity-60" />
          </div>
          <p className="text-sm text-yellow-100 mb-1">Bekleyen Ödemeler</p>
          <p className="text-3xl font-bold">{pendingPayments.toLocaleString()} ₺</p>
        </div>
      </div>

      {/* Commission Info Card */}
      <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <Percent size={24} className="text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-orange-900 mb-2">Komisyon Yapısı</h3>
            <p className="text-sm text-orange-700 mb-3">
              YOLMOV platformu üzerinden gerçekleştirdiğiniz her iş için %10 komisyon kesintisi uygulanmaktadır. 
              Bu komisyon, platform altyapısı, müşteri kazanımı, pazarlama ve teknik destek maliyetlerini karşılamaktadır.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-orange-800">Müşteri Ödemesi: %100</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="text-orange-800">Platform Komisyonu: %10</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-orange-800">Net Kazancınız: %90</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="all">Tüm İşlemler</option>
              <option value="earning">Kazançlar</option>
              <option value="commission">Komisyonlar</option>
              <option value="fee">Ücretler</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="all">Tüm Durumlar</option>
              <option value="completed">Tamamlandı</option>
              <option value="pending">Beklemede</option>
              <option value="failed">Başarısız</option>
            </select>
          </div>

          <button className="ml-auto px-6 py-2.5 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors flex items-center gap-2">
            <Download size={18} />
            Rapor İndir
          </button>
        </div>
      </div>

      {/* Payments List */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">İşlem ID</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">İş No</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Müşteri/Hizmet</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Brüt</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Komisyon</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Net</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tarih</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Durum</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Detay</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-mono text-sm text-gray-700">{payment.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-mono text-sm text-gray-600">{payment.jobId}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <p className="font-semibold text-gray-900">{payment.customer || '-'}</p>
                      <p className="text-gray-500 text-xs">{payment.service}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-gray-700">
                      {payment.grossAmount ? `${payment.grossAmount} ₺` : '-'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {payment.commission ? (
                      <div className="text-sm">
                        <p className="font-semibold text-orange-600">-{payment.commission} ₺</p>
                        <p className="text-xs text-gray-500">(%{payment.commissionRate})</p>
                      </div>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm font-bold ${payment.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {payment.amount >= 0 ? '+' : ''}{payment.amount} ₺
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{payment.date}</span>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(payment.status)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => setSelectedPayment(payment)}
                      className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors mx-auto"
                    >
                      <Eye size={16} className="text-gray-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPayments.length === 0 && (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Receipt size={32} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">Ödeme Bulunamadı</h3>
            <p className="text-gray-500">Seçili filtrelere uygun ödeme kaydı bulunamadı.</p>
          </div>
        )}
      </div>

      {/* Payment Detail Modal */}
      {selectedPayment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedPayment(null)}>
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Ödeme Detayları</h2>
              <button onClick={() => setSelectedPayment(null)} className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200">
                <XCircle size={20} />
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between p-4 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">İşlem ID</span>
                <span className="font-mono font-semibold">{selectedPayment.id}</span>
              </div>

              {selectedPayment.jobId !== '-' && (
                <div className="flex justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">İş No</span>
                  <span className="font-mono font-semibold">{selectedPayment.jobId}</span>
                </div>
              )}

              {selectedPayment.customer && (
                <div className="flex justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Müşteri</span>
                  <span className="font-semibold">{selectedPayment.customer}</span>
                </div>
              )}

              <div className="flex justify-between p-4 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Hizmet</span>
                <span className="font-semibold">{selectedPayment.service}</span>
              </div>

              {selectedPayment.grossAmount && (
                <div className="flex justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                  <span className="text-sm text-green-700 font-semibold">Brüt Tutar</span>
                  <span className="text-lg font-bold text-green-600">{selectedPayment.grossAmount} ₺</span>
                </div>
              )}

              {selectedPayment.commission && (
                <div className="flex justify-between p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <span className="text-sm text-orange-700 font-semibold">Komisyon (%{selectedPayment.commissionRate})</span>
                  <span className="text-lg font-bold text-orange-600">-{selectedPayment.commission} ₺</span>
                </div>
              )}

              <div className="flex justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                <span className="text-sm text-blue-700 font-semibold">Net Kazanç</span>
                <span className="text-2xl font-bold text-blue-600">{selectedPayment.amount} ₺</span>
              </div>

              <div className="flex justify-between p-4 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Ödeme Yöntemi</span>
                <span className="font-semibold">{getPaymentMethodLabel(selectedPayment.paymentMethod)}</span>
              </div>

              <div className="flex justify-between p-4 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Tarih</span>
                <span className="font-semibold">{selectedPayment.date}</span>
              </div>

              <div className="flex justify-between p-4 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Durum</span>
                {getStatusBadge(selectedPayment.status)}
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                <Download size={18} />
                Fatura İndir
              </button>
              <button className="flex-1 px-6 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors flex items-center justify-center gap-2">
                <Receipt size={18} />
                Dekont Görüntüle
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PartnerPayments;
