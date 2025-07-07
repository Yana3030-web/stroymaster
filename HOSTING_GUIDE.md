# Руководство по размещению сайта на российском хостинге

## Проблема с Netlify в России

Netlify заблокирован в России, поэтому сайт не работает без VPN. Решение - перенести сайт на российский хостинг.

## Рекомендуемые российские хостинги

### 1. Timeweb (timeweb.ru)
- **Плюсы**: Быстрый, надежный, хорошая поддержка
- **Цена**: от 150₽/месяц
- **Подходит для**: статических сайтов и SPA

### 2. Beget (beget.com)
- **Плюсы**: Дешевый, простой в настройке
- **Цена**: от 100₽/месяц
- **Подходит для**: небольших сайтов

### 3. Reg.ru
- **Плюсы**: Большой провайдер, много возможностей
- **Цена**: от 200₽/месяц
- **Подходит для**: профессиональных проектов

### 4. Selectel (selectel.ru)
- **Плюсы**: Высокая производительность, CDN
- **Цена**: от 300₽/месяц
- **Подходит для**: высоконагруженных сайтов

## Пошаговая инструкция размещения

### Шаг 1: Подготовка файлов

1. Выполните команду для сборки:
```bash
npm run build
```

2. В папке `dist` будут готовые файлы для загрузки

### Шаг 2: Настройка домена

1. В панели управления хостингом привяжите домен `stroymaster11.ru`
2. Настройте DNS записи:
   - A-запись: `@` → IP адрес хостинга
   - CNAME-запись: `www` → `stroymaster11.ru`

### Шаг 3: Загрузка файлов

1. Загрузите все файлы из папки `dist` в корневую папку сайта
2. Убедитесь, что файл `index.html` находится в корне

### Шаг 4: Настройка переадресации

Создайте файл `.htaccess` в корне сайта:

```apache
RewriteEngine On
RewriteBase /

# Переадресация всех запросов на index.html для SPA
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Кэширование статических файлов
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
</IfModule>

# Сжатие файлов
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>
```

### Шаг 5: Настройка SSL

1. В панели управления хостингом включите SSL сертификат
2. Настройте автоматическую переадресацию с HTTP на HTTPS

## Альтернативные решения

### 1. GitHub Pages + Cloudflare

1. Загрузите код на GitHub
2. Включите GitHub Pages
3. Настройте Cloudflare как CDN (работает в России)
4. Привяжите домен через Cloudflare

### 2. Vercel (может работать в России)

1. Подключите репозиторий к Vercel
2. Настройте кастомный домен
3. Проверьте доступность без VPN

### 3. Собственный VPS

Если нужна максимальная производительность:

1. Арендуйте VPS в России (Selectel, Yandex Cloud)
2. Установите Nginx
3. Настройте автоматическое развертывание

## Настройка после размещения

### 1. Обновите переменные окружения

Создайте файл `.env` на хостинге:

```env
VITE_SUPABASE_URL=ваш_supabase_url
VITE_SUPABASE_ANON_KEY=ваш_supabase_key
VITE_EMAILJS_SERVICE_ID=ваш_emailjs_service
VITE_EMAILJS_TEMPLATE_ID=ваш_emailjs_template
VITE_EMAILJS_PUBLIC_KEY=ваш_emailjs_key
```

### 2. Проверьте работу

1. Откройте сайт в браузере без VPN
2. Проверьте загрузку товаров
3. Протестируйте отправку заказа
4. Убедитесь, что все изображения загружаются

## Мониторинг и поддержка

### Настройка мониторинга

1. Подключите Яндекс.Метрику или Google Analytics
2. Настройте уведомления о недоступности сайта
3. Регулярно проверяйте логи ошибок

### Резервное копирование

1. Настройте автоматическое резервное копирование
2. Сохраняйте копии базы данных Supabase
3. Ведите версионность изменений

## Контакты для поддержки

При возникновении проблем:
- Техподдержка хостинга
- Документация выбранного хостинга
- Сообщества разработчиков в Telegram

**Важно**: После переноса обязательно протестируйте сайт с мобильного интернета без VPN!