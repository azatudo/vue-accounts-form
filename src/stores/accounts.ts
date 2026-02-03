import { defineStore } from 'pinia';
import type { Account } from '../types/account';

const STORAGE_KEY = 'accounts';

function loadFromStorage(): Account[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export const useAccountsStore = defineStore('accounts', {
  state: () => ({
    list: loadFromStorage() as Account[],
  }),

  actions: {
    addEmptyAccount() {
      this.list.push({
        id: crypto.randomUUID(),
        label: [],
        type: 'LOCAL',
        login: '',
        password: '',
      });
    },

    removeAccount(id: string) {
      this.list = this.list.filter(acc => acc.id !== id);
      this.save();
    },

    updateAccount(updated: Account) {
      const index = this.list.findIndex(a => a.id === updated.id);
      if (index !== -1) {
        this.list[index] = updated;
        this.save();
      }
    },

    save() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.list));
    },
  },
});