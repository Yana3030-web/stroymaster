// Конфигурация для разных хостингов
export const HOSTING_CONFIG = {
  // Для российских хостингов
  russia: {
    domain: 'https://stroymaster11.ru',
    cdn: 'https://stroymaster11.ru/assets',
    api: {
      supabase: {
        url: import.meta.env.VITE_SUPABASE_URL,
        key: import.meta.env.VITE_SUPABASE_ANON_KEY,
        timeout: 15000, // Увеличенный таймаут для мобильных сетей
      },
      emailjs: {
        serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
        templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        timeout: 10000,
      }
    }
  },
  
  // Fallback конфигурация
  fallback: {
    phone: '+7 (977) 453-61-61',
    email: 'stroymaster.store@bk.ru',
    workingHours: 'Пн-Сб: 9:00-18:00, Вс: 9:00-16:00',
    address: 'Одинцовский городской округ, деревня Марфино, 100'
  }
};

export const getCurrentConfig = () => {
  const hostname = window.location.hostname;
  
  if (hostname.includes('stroymaster11.ru')) {
    return HOSTING_CONFIG.russia;
  }
  
  return HOSTING_CONFIG.russia; // По умолчанию российская конфигурация
};