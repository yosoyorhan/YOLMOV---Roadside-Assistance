/**
 * Partner Documents Management Component
 * Partnerin belgelerini yükleme ve onay durumu takibi
 */

import React, { useState } from 'react';
import { FileText, Upload, CheckCircle, XCircle, Clock, Eye, Download, Trash2, AlertTriangle } from 'lucide-react';

interface Document {
  id: string;
  type: 'license' | 'insurance' | 'registration' | 'tax' | 'identity';
  name: string;
  uploadDate: string;
  status: 'approved' | 'pending' | 'rejected';
  rejectionReason?: string;
  expiryDate?: string;
  fileSize?: string;
}

const MOCK_DOCUMENTS: Document[] = [
  { id: 'DOC-1', type: 'license', name: 'Sürücü Belgesi.pdf', uploadDate: '2023-11-01', status: 'approved', expiryDate: '2028-05-15', fileSize: '1.2 MB' },
  { id: 'DOC-2', type: 'insurance', name: 'Kasko Poliçesi.pdf', uploadDate: '2023-11-02', status: 'approved', expiryDate: '2024-12-31', fileSize: '800 KB' },
  { id: 'DOC-3', type: 'registration', name: 'Ruhsat.pdf', uploadDate: '2023-11-03', status: 'pending', fileSize: '650 KB' },
  { id: 'DOC-4', type: 'tax', name: 'Vergi Levhası.pdf', uploadDate: '2023-11-05', status: 'rejected', rejectionReason: 'Belge okunaklı değil, lütfen yeniden yükleyin', fileSize: '400 KB' },
];

const DOCUMENT_TYPES = [
  { value: 'license', label: 'Sürücü Belgesi', required: true },
  { value: 'insurance', label: 'Kasko/Sigorta Poliçesi', required: true },
  { value: 'registration', label: 'Araç Ruhsatı', required: true },
  { value: 'tax', label: 'Vergi Levhası', required: true },
  { value: 'identity', label: 'Kimlik Belgesi', required: true },
];

export const PartnerDocuments: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>(MOCK_DOCUMENTS);
  const [selectedType, setSelectedType] = useState('');
  const [uploading, setUploading] = useState(false);

  const getStatusBadge = (status: Document['status']) => {
    const config = {
      approved: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200', icon: CheckCircle, label: 'Onaylandı' },
      pending: { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200', icon: Clock, label: 'İnceleniyor' },
      rejected: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', icon: XCircle, label: 'Reddedildi' },
    };
    const { bg, text, border, icon: Icon, label } = config[status];
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${bg} ${text} ${border}`}>
        <Icon size={12} />
        {label}
      </span>
    );
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !selectedType) return;
    
    setUploading(true);
    // Simüle upload
    setTimeout(() => {
      const file = e.target.files![0];
      const newDoc: Document = {
        id: `DOC-${Date.now()}`,
        type: selectedType as any,
        name: file.name,
        uploadDate: new Date().toISOString().split('T')[0],
        status: 'pending',
        fileSize: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
      };
      setDocuments([...documents, newDoc]);
      setUploading(false);
      setSelectedType('');
    }, 1500);
  };

  const stats = {
    total: DOCUMENT_TYPES.length,
    approved: documents.filter(d => d.status === 'approved').length,
    pending: documents.filter(d => d.status === 'pending').length,
    rejected: documents.filter(d => d.status === 'rejected').length,
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Toplam Belge</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center">
              <FileText size={24} className="text-gray-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Onaylı</p>
              <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <CheckCircle size={24} className="text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">İnceleniyor</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
              <Clock size={24} className="text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Reddedilen</p>
              <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
            </div>
            <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
              <XCircle size={24} className="text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Upload Section */}
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Yeni Belge Yükle</h3>
        <div className="flex flex-col md:flex-row gap-4">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="">Belge Türü Seçin</option>
            {DOCUMENT_TYPES.map(type => (
              <option key={type.value} value={type.value}>
                {type.label} {type.required && '*'}
              </option>
            ))}
          </select>

          <label className={`px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2 ${selectedType ? 'bg-orange-600 text-white cursor-pointer hover:bg-orange-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
            <Upload size={18} />
            {uploading ? 'Yükleniyor...' : 'Belge Seç ve Yükle'}
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileUpload}
              disabled={!selectedType || uploading}
              className="hidden"
            />
          </label>
        </div>
        <p className="text-xs text-gray-500 mt-3">* PDF, JPG, PNG formatında, maksimum 5 MB</p>
      </div>

      {/* Documents List */}
      <div className="space-y-3">
        {documents.map(doc => {
          const docType = DOCUMENT_TYPES.find(t => t.value === doc.type);
          return (
            <div key={doc.id} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3 flex-1">
                  <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText size={24} className="text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-gray-900">{docType?.label}</h4>
                    <p className="text-xs text-gray-500 mt-1">{doc.name} • {doc.fileSize}</p>
                    <p className="text-xs text-gray-400 mt-1">Yüklenme: {doc.uploadDate}</p>
                    {doc.expiryDate && (
                      <p className="text-xs text-gray-400">Son Geçerlilik: {doc.expiryDate}</p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  {getStatusBadge(doc.status)}
                  <div className="flex gap-2">
                    <button className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200">
                      <Eye size={16} className="text-gray-600" />
                    </button>
                    <button className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200">
                      <Download size={16} className="text-gray-600" />
                    </button>
                    <button className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center hover:bg-red-100">
                      <Trash2 size={16} className="text-red-600" />
                    </button>
                  </div>
                </div>
              </div>

              {doc.status === 'rejected' && doc.rejectionReason && (
                <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                  <AlertTriangle size={16} className="text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-red-700 mb-1">Red Nedeni:</p>
                    <p className="text-xs text-red-600">{doc.rejectionReason}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Info Card */}
      <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <FileText size={20} className="text-white" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-bold text-blue-900 mb-2">Belge Onay Süreci</h4>
            <p className="text-sm text-blue-700">
              Yüklediğiniz belgeler admin ekibi tarafından 24 saat içinde incelenir. Onaylanan belgeler ile iş kabulüne başlayabilirsiniz. 
              Eksik veya hatalı belgeler için bildirim alacaksınız.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerDocuments;
