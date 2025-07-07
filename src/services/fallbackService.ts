// Fallback сервис для работы без внешних API
export class FallbackService {
  // Базовые товары для отображения при проблемах с API
  private static fallbackProducts = [
    {
      id: 1,
      name: 'Гипсовая штукатурка Ротбанд Кнауф (30кг)',
      price: 0,
      image: '/assets/placeholder-product.jpg',
      description: 'Высококачественная гипсовая штукатурка для внутренних работ',
      category: 'Штукатурка',
      is_active: true
    },
    {
      id: 2,
      name: 'Гипсокартон Кнауф ГКЛ 12.5 мм (2500х1200)',
      price: 320,
      image: '/assets/placeholder-product.jpg',
      description: 'Стандартный гипсокартонный лист для внутренних работ',
      category: 'Гипсокартон',
      is_active: true
    },
    {
      id: 3,
      name: 'Пеноплекс Комфорт 50 мм (585х1185)',
      price: 1450,
      image: '/assets/placeholder-product.jpg',
      description: 'Экструдированный пенополистирол для утепления',
      category: 'Утеплитель Пеноплекс',
      is_active: true
    }
  ];
  
  private static fallbackCategories = [
    'Штукатурка',
    'Гипсокартон',
    'Утеплитель Пеноплекс',
    'Утеплитель Роквул',
    'Аквапанель Кнауф и АрмПанель',
    'Бетоноконтакт и грунтовки'
  ];
  
  static getProducts() {
    return this.fallbackProducts;
  }
  
  static getCategories() {
    return this.fallbackCategories;
  }
  
  static searchProducts(searchTerm: string) {
    return this.fallbackProducts.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  
  static getProductsByCategory(category: string) {
    if (category === 'all') return this.fallbackProducts;
    return this.fallbackProducts.filter(product => product.category === category);
  }
  
  // Создание mailto ссылки для заказа
  static createOrderEmail(orderData: any) {
    const subject = `Заказ с сайта СтройМастер от ${orderData.name}`;
    const body = `
Новый заказ с сайта СтройМастер

ДАННЫЕ КЛИЕНТА:
Имя: ${orderData.name}
Телефон: ${orderData.phone}
Email: ${orderData.email}
Адрес: ${orderData.address}
${orderData.message ? `Комментарий: ${orderData.message}` : ''}

ЗАКАЗАННЫЕ ТОВАРЫ:
${orderData.items.map((item: any) => 
  `• ${item.name} - ${item.quantity} шт. × ${item.price > 0 ? item.price + ' ₽' : 'По запросу'}`
).join('\n')}

ОБЩАЯ СУММА: ${orderData.totalPrice > 0 ? orderData.totalPrice + ' ₽' : 'По запросу'}

Дата заказа: ${new Date().toLocaleString('ru-RU')}
    `;
    
    return `mailto:stroymaster.store@bk.ru?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }
}