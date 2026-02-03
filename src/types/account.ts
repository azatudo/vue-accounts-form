export type AccountType = 'LDAP' | 'LOCAL';

export interface AccountLabel {
  text: string;
}

export interface Account {
  id: string;
  label: AccountLabel[];
  type: AccountType;
  login: string;
  password: string | null;
}