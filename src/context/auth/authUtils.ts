
import { User } from './types';

// Storage keys
export const STORAGE_KEY = "trinova_user";
export const SAVED_EMAILS_KEY = "trinova_saved_emails";
export const USER_CREDENTIALS_KEY = "trinova_user_credentials";
export const PASSWORD_RESET_TOKENS_KEY = "password_reset_tokens";

// Storage utility functions
export const getStoredUser = (): User | null => {
  const storedUser = localStorage.getItem(STORAGE_KEY);
  if (storedUser) {
    try {
      return JSON.parse(storedUser);
    } catch (error) {
      localStorage.removeItem(STORAGE_KEY);
    }
  }
  return null;
};

export const getSavedEmails = (): string[] => {
  const storedEmails = localStorage.getItem(SAVED_EMAILS_KEY);
  if (storedEmails) {
    try {
      return JSON.parse(storedEmails);
    } catch (error) {
      localStorage.removeItem(SAVED_EMAILS_KEY);
    }
  }
  return [];
};

export const getStoredCredentials = (): Record<string, { password: string, username: string }> => {
  const storedCredentials = localStorage.getItem(USER_CREDENTIALS_KEY);
  if (storedCredentials) {
    try {
      return JSON.parse(storedCredentials);
    } catch (error) {
      localStorage.removeItem(USER_CREDENTIALS_KEY);
    }
  }
  return {};
};

export const getStoredResetTokens = (): Record<string, string> => {
  const storedTokens = localStorage.getItem(PASSWORD_RESET_TOKENS_KEY);
  if (storedTokens) {
    try {
      return JSON.parse(storedTokens);
    } catch (error) {
      localStorage.removeItem(PASSWORD_RESET_TOKENS_KEY);
    }
  }
  return {};
};

export const storeUser = (user: User): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
};

export const storeSavedEmails = (emails: string[]): void => {
  localStorage.setItem(SAVED_EMAILS_KEY, JSON.stringify(emails));
};

export const storeCredentials = (credentials: Record<string, { password: string, username: string }>): void => {
  localStorage.setItem(USER_CREDENTIALS_KEY, JSON.stringify(credentials));
};

export const storeResetTokens = (tokens: Record<string, string>): void => {
  localStorage.setItem(PASSWORD_RESET_TOKENS_KEY, JSON.stringify(tokens));
};
