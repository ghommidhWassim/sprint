import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    try {
      // If using, define drivers here: await this.storage.defineDriver(/*...*/);
      this._storage = await this.storage.create();
    } catch (error) {
      console.error('Error initializing storage:', error);
    }
  }

  // Create and expose methods that users of this service can
  // call, for example:
  public async set(key: string, value: any): Promise<void> {
    try {
      await this._storage?.set(key, value);

    } catch (error) {
      console.error('Error setting item in storage:', error);
    }
  }

  public async get(key: string): Promise<any> {
    try {
      let item =await this.storage.get(key)
      return item
    } catch (error) {
      console.error('Error setting item in storage:', error);
    }
  }
}
