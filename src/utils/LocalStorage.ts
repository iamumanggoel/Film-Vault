export class StorageCache<T> {
  constructor(private key: string, private ttlMs: number) {}

  // Save data to localStorage with timestamp
  set(data: T): void {
    const item = {
      value: data,
      timestamp: new Date().getTime(),
    };
    localStorage.setItem(this.key, JSON.stringify(item));
  }

  // Get cached data, return null if expired
  get(): T | null {
    const raw = localStorage.getItem(this.key);
    if (!raw) return null;

    try {
      const { value, timestamp } = JSON.parse(raw);
      const now = new Date().getTime();
      if (now - timestamp > this.ttlMs) {
        this.clear();
        return null;
      }
      return value;
    } catch {
      this.clear();
      return null;
    }
  }

  // Clear this key
  clear(): void {
    localStorage.removeItem(this.key);
  }

  // Check if valid cached data exists
  hasValidCache(): boolean {
    return this.get() !== null;
  }
}
