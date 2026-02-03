<template>
  <div class="accounts-page">
    <div class="header">
      <h1>Учетные записи</h1>

      <button class="add-btn" @click="addAccount">
        +
      </button>
    </div>

    <div class="list">
      <div
        v-for="account in store.list"
        :key="account.id"
        class="account-row"
      >
        <AccountForm
        :model-value="account"
        @update="store.updateAccount"
        />

        <button
          class="remove-btn"
          @click="removeAccount(account.id)"
        >
          ✕
        </button>
      </div>

      <div v-if="store.list.length === 0" class="empty">
        Учетных записей пока нет
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAccountsStore } from '../stores/accounts';
import AccountForm from '../components/AccountForm.vue'

const store = useAccountsStore();

function addAccount() {
  store.addEmptyAccount();
}

function removeAccount(id: string) {
  store.removeAccount(id);
}
</script>

<style scoped>
.accounts-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.add-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid #333;
  background: #0f0f0f;
  color: #fff;
  font-size: 20px;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
}

.add-btn:hover {
  background: #1a1a1a;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.account-row {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 16px;
  border: 1px solid #2a2a2a;
  border-radius: 8px;
  background: #141414;
}

.account-login {
  color: #333;
}

.remove-btn {
  align-self: flex-start;
  margin-top: 6px;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background: transparent;
  border: 1px solid transparent;
  color: #888;
  font-size: 16px;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
}

.remove-btn:hover {
  border-color: #333;
  color: #f55;
}



.empty {
  color: #777;
  font-style: italic;
}
</style>