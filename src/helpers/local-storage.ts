export default class LocalStorageManager {
  static setItemWithKey = async (key: string, value: any, dayExpires: number) => {
    const now = new Date();
    const minutes = dayExpires * 24 * 60;
    const item = {
      value: value,
      expiry: now.getTime() + minutes * 60 * 1000,
    };
    try {
      await new Promise((resolve) => {
        localStorage.setItem(key, JSON.stringify(item));
        resolve();
      });
    } catch (error) {
      console.error("Error setting item in localStorage:", error);
    }
  }
  
  static getItemWithKey = (key: string) => {
    try {
      const item = JSON.parse(localStorage.getItem(key));
      const now = new Date().getTime();
      if (item !== null && now <= item.expiry) {
        return item.value;
      } else {
        localStorage.removeItem(key);
        return null;
      }
    } catch (error) {
      return null;
    }
  }
  
  static removeItem = (key: string) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      return;
    }
  }

  static getLocalStorageItemsWithPrefix(prefix: string) {
    const items = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key: string|null = localStorage.key(i);
      if (key && key.startsWith(prefix)) {
        if (this.getItemWithKey(key)) {
          items.push(this.getItemWithKey(key));
        }
      }
    }

    return items;
  }

  static clearLocalStorageKeys = (prefix: string) => {
    for (let i = 0; i < localStorage.length; i++) {
      const key: string|null = localStorage.key(i);
      if (key && key.startsWith(prefix)) {
        this.removeItem(key);
      }
    }
  };
}