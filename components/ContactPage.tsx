import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Telefon',
      details: ['0850 XXX XX XX', 'Pazartesi - Pazar: 7/24'],
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      icon: Mail,
      title: 'E-Posta',
      details: ['destek@yolmov.com', 'info@yolmov.com'],
      color: 'text-orange-600',
      bg: 'bg-orange-50'
    },
    {
      icon: MapPin,
      title: 'Adres',
      details: ['Levent Mahallesi, Aytar Caddesi', 'Şişli / İstanbul, Türkiye'],
      color: 'text-green-600',
      bg: 'bg-green-50'
    },
    {
      icon: Clock,
      title: 'Çalışma Saatleri',
      details: ['7/24 Kesintisiz Hizmet', 'Acil Durumlarda Her An'],
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    }
  ];

  const socialMedia = [
    { icon: Facebook, label: 'Facebook', url: '#', color: 'hover:text-blue-600' },
    { icon: Twitter, label: 'Twitter', url: '#', color: 'hover:text-sky-500' },
    { icon: Instagram, label: 'Instagram', url: '#', color: 'hover:text-pink-600' },
    { icon: Linkedin, label: 'LinkedIn', url: '#', color: 'hover:text-blue-700' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 text-sm font-bold uppercase tracking-wider mb-6">
              İletişim
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              Bizimle<br />
              <span className="text-brand-orange">İletişime Geçin</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Sorularınız, önerileriniz veya yardıma ihtiyacınız mı var? 7/24 buradayız!
            </p>
          </motion.div>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, idx) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className={`w-14 h-14 ${info.bg} rounded-xl flex items-center justify-center mb-4`}>
                  <info.icon size={28} className={info.color} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{info.title}</h3>
                {info.details.map((detail, i) => (
                  <p key={i} className="text-sm text-gray-600 leading-relaxed">
                    {detail}
                  </p>
                ))}
              </motion.div>
            ))}
          </div>

          {/* Contact Form & Map */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Mesaj Gönderin</h2>
              <p className="text-gray-600 mb-8">Size en kısa sürede geri dönüş yapacağız.</p>

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3"
                >
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white">✓</div>
                  <p className="text-sm text-green-700 font-medium">Mesajınız başarıyla gönderildi!</p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Adınız Soyadınız</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-brand-orange focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                    placeholder="Ahmet Yılmaz"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">E-Posta</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-brand-orange focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                    placeholder="ahmet@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Telefon</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-brand-orange focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                    placeholder="0532 XXX XX XX"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Mesajınız</label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-brand-orange focus:ring-2 focus:ring-orange-100 outline-none resize-none transition-all"
                    placeholder="Size nasıl yardımcı olabiliriz?"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-brand-orange to-orange-600 text-white rounded-xl font-bold shadow-lg shadow-orange-200 hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                >
                  <Send size={20} />
                  Mesajı Gönder
                </button>
              </form>
            </motion.div>

            {/* Map Placeholder & Social */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Map */}
              <div className="bg-white rounded-3xl p-2 shadow-sm border border-gray-100 overflow-hidden">
                <div className="relative h-80 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <MapPin size={48} className="mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600 font-medium">Harita Entegrasyonu</p>
                    <p className="text-sm text-gray-500 mt-2">Google Maps yakında eklenecek</p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Sosyal Medya</h3>
                <p className="text-gray-600 mb-6 text-sm">Bizi sosyal medyada takip edin, haberdar olun!</p>
                <div className="flex gap-4">
                  {socialMedia.map((social) => (
                    <a
                      key={social.label}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-600 ${social.color} transition-all hover:scale-110 hover:shadow-md`}
                      aria-label={social.label}
                    >
                      <social.icon size={24} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Info */}
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Acil Durum?</h3>
                <p className="text-orange-100 mb-6">
                  Yolda kaldınız mı? Hemen bize ulaşın, en yakın yardım ekibini size yönlendirelim.
                </p>
                <button className="px-6 py-3 bg-white text-brand-orange rounded-xl font-bold hover:scale-105 transition-transform">
                  0850 XXX XX XX
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
