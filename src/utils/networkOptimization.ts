// Утилиты для оптимизации работы в российских сетях
export class NetworkOptimization {
  private static retryCount = 0;
  private static maxRetries = 3;
  
  // Проверка доступности сервиса
  static async checkServiceAvailability(url: string): Promise<boolean> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const response = await fetch(url, {
        method: 'HEAD',
        signal: controller.signal,
        cache: 'no-cache'
      });
      
      clearTimeout(timeoutId);
      return response.ok;
    } catch (error) {
      console.warn(`Service ${url} not available:`, error);
      return false;
    }
  }
  
  // Retry механизм для API запросов
  static async retryRequest<T>(
    requestFn: () => Promise<T>,
    maxRetries: number = 3,
    delay: number = 1000
  ): Promise<T> {
    let lastError: Error;
    
    for (let i = 0; i <= maxRetries; i++) {
      try {
        return await requestFn();
      } catch (error) {
        lastError = error as Error;
        
        if (i === maxRetries) break;
        
        // Экспоненциальная задержка
        const waitTime = delay * Math.pow(2, i);
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
    }
    
    throw lastError!;
  }
  
  // Определение типа соединения
  static getConnectionType(): string {
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    
    if (!connection) return 'unknown';
    
    return connection.effectiveType || connection.type || 'unknown';
  }
  
  // Адаптация таймаутов под тип соединения
  static getOptimalTimeout(): number {
    const connectionType = this.getConnectionType();
    
    switch (connectionType) {
      case 'slow-2g':
      case '2g':
        return 30000; // 30 секунд
      case '3g':
        return 20000; // 20 секунд
      case '4g':
        return 15000; // 15 секунд
      default:
        return 10000; // 10 секунд
    }
  }
}