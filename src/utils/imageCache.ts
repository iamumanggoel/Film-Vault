export class ImageCache {
  static async fetchAndCacheBlob(url: string, key: string): Promise<string> {
    const cached = localStorage.getItem(key);
    if (cached) {
      return URL.createObjectURL(this.base64ToBlob(cached));
    }

    const response = await fetch(url);
    const blob = await response.blob();

    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onloadend = () => {
        const base64 = reader.result as string;
        try {
          localStorage.setItem(key, base64);
        } catch (e) {
          console.warn("LocalStorage quota exceeded, skipping cache", e);
        }
        const objectUrl = URL.createObjectURL(blob);
        resolve(objectUrl);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  private static base64ToBlob(base64: string): Blob {
    const parts = base64.split(',');
    const mime = parts[0].match(/:(.*?);/)?.[1] || '';
    const byteString = atob(parts[1]);
    const array = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      array[i] = byteString.charCodeAt(i);
    }
    return new Blob([array], { type: mime });
  }
}
