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
        :class="{ error: errors.login }"
        @blur="save"
      />
      <small v-if="errors.login" class="error-text">
        {{ errors.login }}
      </small>
    </div>

    <div class="row" v-if="local.type === 'LOCAL'">
      <label>Пароль</label>
      <input
        v-model="local.password"
        type="password"
        :class="{ error: errors.password }"
        @blur="save"
      />
      <small v-if="errors.password" class="error-text">
        {{ errors.password }}
      </small>
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

const errors = reactive({
  login: '',
  password: '',
})

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

function validate() {
  errors.login = ''
  errors.password = ''

  if (!local.login || !local.login.trim()) {
    errors.login = 'Логин обязателен'
  }

  if (local.type === 'LOCAL') {
    if (!local.password || !local.password.trim()) {
      errors.password = 'Пароль обязателен'
    }
  }

  return !errors.login && !errors.password
}

function onTypeChange() {
  if (local.type === 'LDAP') {
    local.password = null
    errors.password = ''
  }
  save()
}

function save() {
  if (!validate()) return
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

input.error {
  border-color: #c00;
}

.hint {
  font-size: 11px;
  color: #777;
}

.error-text {
  font-size: 11px;
  color: #c00;
}
</style>