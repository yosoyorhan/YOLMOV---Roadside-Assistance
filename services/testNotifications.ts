// Test Notification Service - 5 dakikada bir bildirim gönderir

const TEST_MESSAGES = [
  {
    title: "🚗 Yeni Teklif Geldi!",
    body: "Kadıköy bölgesindeki çekici hizmeti için 3 yeni teklif var.",
    icon: "/yolmov-icon.png"
  },
  {
    title: "⚡ Hizmet Hazır!",
    body: "Akü takviyesi ekibiniz yola çıktı. Tahmini varış: 15 dakika.",
    icon: "/yolmov-icon.png"
  },
  {
    title: "✅ İşlem Tamamlandı",
    body: "Hizmetiniz başarıyla tamamlandı. Değerlendirmenizi bekliyoruz!",
    icon: "/yolmov-icon.png"
  },
  {
    title: "🎉 Özel Kampanya",
    body: "Şu an çekici hizmetinde %15 indirim fırsatı! Acele edin.",
    icon: "/yolmov-icon.png"
  },
  {
    title: "📍 Yakınınızda Hizmet",
    body: "5 km yakınınızda güvenilir bir yol yardım ekibi mevcut.",
    icon: "/yolmov-icon.png"
  }
];

let currentMessageIndex = 0;
let testInterval: NodeJS.Timeout | null = null;

export const startTestNotifications = () => {
  // Test için 1 dakikada bir bildirim gönder (test amaçlı)
  const INTERVAL = 1 * 60 * 1000; // 1 dakika

  console.log('🔔 Test bildirimleri başlatıldı (1 dakikada bir)');

  // İlk bildirimi hemen gönder
  sendTestNotification();

  // Sonra 1 dakikada bir devam et
  testInterval = setInterval(() => {
    sendTestNotification();
  }, INTERVAL);
};

export const stopTestNotifications = () => {
  if (testInterval) {
    clearInterval(testInterval);
    testInterval = null;
    console.log('🔕 Test bildirimleri durduruldu');
  }
};

const sendTestNotification = () => {
  if ('Notification' in window && Notification.permission === 'granted') {
    const message = TEST_MESSAGES[currentMessageIndex];
    
    const notification = new Notification(message.title, {
      body: message.body,
      icon: message.icon,
      badge: message.icon,
      tag: 'yolmov-test',
      requireInteraction: false,
      silent: false
    });

    notification.onclick = () => {
      window.focus();
      notification.close();
    };

    console.log(`✅ Test bildirimi gönderildi: ${message.title}`);
    
    // Sıradaki mesaja geç
    currentMessageIndex = (currentMessageIndex + 1) % TEST_MESSAGES.length;
  } else {
    console.warn('⚠️ Bildirim izni verilmemiş veya desteklenmiyor');
  }
};

export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!('Notification' in window)) {
    console.warn('Bu tarayıcı bildirimleri desteklemiyor');
    return false;
  }

  if (Notification.permission === 'granted') {
    console.log('✅ Bildirim izni zaten verilmiş');
    return true;
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      console.log('✅ Bildirim izni verildi');
      return true;
    }
  }

  console.warn('❌ Bildirim izni reddedildi');
  return false;
};
