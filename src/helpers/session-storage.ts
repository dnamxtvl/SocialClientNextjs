export default class SessionStorageManager {
    static setItemWithKey = async (key: string, value: any, dayExpires: number) => {
      const now = new Date();
      const minutes = dayExpires * 24 * 60;
      const item = {
        value: value,
        expiry: now.getTime() + minutes * 60 * 1000,
      };
      try {
        await new Promise((resolve) => {
          sessionStorage.setItem(key, JSON.stringify(item));
          resolve();
        });
      } catch (error) {
        console.error("Error setting item in sessionStorage:", error);
      }
    }
    
    static getItemWithKey = (key: string) => {
      try {
        const item = JSON.parse(sessionStorage.getItem(key));
        const now = new Date().getTime();
        if (item !== null && now <= item.expiry) {
          return item.value;
        } else {
          sessionStorage.removeItem(key);
          return null;
        }
      } catch (error) {
        return null;
      }
    }
    
    static removeItem = (key: string) => {
      try {
        sessionStorage.removeItem(key);
      } catch (error) {
        return;
      }
    }
  
    static getSessionStorageItemsWithPrefix(prefix: string) {
      const items = [];
      for (let i = 0; i < sessionStorage.length; i++) {
        const key: string|null = sessionStorage.key(i);
        if (key && key.startsWith(prefix)) {
          if (this.getItemWithKey(key)) {
            items.push(this.getItemWithKey(key));
          }
        }
      }
  
      return items;
    }
  
    static clearSessionStorageKeys = (prefix: string) => {
      for (let i = 0; i < sessionStorage.length; i++) {
        const key: string|null = sessionStorage.key(i);
        if (key && key.startsWith(prefix)) {
          this.removeItem(key);
        }
      }
    };
  }