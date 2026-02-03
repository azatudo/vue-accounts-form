<template>
  <div class="account-form">
    <div class="row">
      <label>Метка</label>
      <input
        v-model="labelInput"
        type="text"
        placeholder="dev; admin; prod"
        @blur="save"
      />
      <small class="hint">Метки вводятся через ;</small>
    </div>

    <div class="row">
      <label>Тип записи</label>
      <select v-model="local.type" @change="onTypeChange">
        <option value="LDAP">LDAP</option>
        <option value="LOCAL">Локальная</option>
      </select>
    </div>

    <div class="row">
      <label>Логин</label>
      <input
        v-model="local.login"
        type="text"
        @blur="save"
      />
    </div>

    <div class="row" v-if="local.type === 'LOCAL'">
      <label>Пароль</label>
      <input
        v-model="local.password"
        type="password"
        @blur="save"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import type { Account } from '../types/account'

const props = defineProps<{
  modelValue: Account
}>()

const emit = defineEmits<{
  (e: 'update', value: Account): void
}>()

const local = reactive<Account>({ ...props.modelValue })

const labelInput = computed({
  get() {
    return local.label.map(l => l.text).join('; ')
  },
  set(value: string) {
    local.label = value
      .split(';')
      .map(v => v.trim())
      .filter(Boolean)
      .map(v => ({ text: v }))
  },
})

function onTypeChange() {
  if (local.type === 'LDAP') {
    local.password = null
  }
  save()
}

function save() {
  emit('update', { ...local })
}
</script>

<style scoped>
.account-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.row {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

label {
  font-size: 12px;
  color: #aaa;
}

input,
select {
  padding: 6px 8px;
  background: transparent;
  border: 1px solid #555;
  color: #fff;
}

.hint {
  font-size: 11px;
  color: #777;
}
</style>