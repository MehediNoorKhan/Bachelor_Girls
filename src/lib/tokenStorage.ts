// Token storage utility for Remember Me functionality
export interface TokenStorage {
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: string;
  rememberMe: boolean;
  user?: {
    id: string;
    email: string;
    role: string;
    name: string;
  };
}

const TOKEN_STORAGE_KEY = "auth_tokens";
const REMEMBER_ME_KEY = "remember_me";

/**
 * Store authentication tokens with appropriate persistence
 * @param tokens - Token data to store
 * @param rememberMe - Whether to persist tokens across browser sessions
 */
export const storeTokens = (tokens: TokenStorage): void => {
  try {
    const storage = tokens.rememberMe ? localStorage : sessionStorage;

    // Store tokens
    storage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(tokens));

    // Store remember me preference separately
    localStorage.setItem(REMEMBER_ME_KEY, JSON.stringify(tokens.rememberMe));

    console.log(
      `Tokens stored in ${
        tokens.rememberMe ? "localStorage" : "sessionStorage"
      }`,
    );
  } catch (error) {
    console.error("Failed to store tokens:", error);
  }
};

/**
 * Retrieve stored authentication tokens
 * @returns Token data or null if not found
 */
export const getStoredTokens = (): TokenStorage | null => {
  try {
    // Check both localStorage and sessionStorage
    let stored = localStorage.getItem(TOKEN_STORAGE_KEY);
    let isFromLocalStorage = true;

    if (!stored) {
      stored = sessionStorage.getItem(TOKEN_STORAGE_KEY);
      isFromLocalStorage = false;
    }

    if (stored) {
      const tokens: TokenStorage = JSON.parse(stored);

      // Check if token has expired
      if (tokens.expiresAt && new Date(tokens.expiresAt) < new Date()) {
        console.log("Stored tokens have expired");
        clearStoredTokens();
        return null;
      }

      console.log(
        `Tokens retrieved from ${
          isFromLocalStorage ? "localStorage" : "sessionStorage"
        }`,
      );
      return tokens;
    }

    return null;
  } catch (error) {
    console.error("Failed to retrieve tokens:", error);
    return null;
  }
};

/**
 * Clear stored authentication tokens
 */
export const clearStoredTokens = (): void => {
  try {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    sessionStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(REMEMBER_ME_KEY);
    console.log("Tokens cleared from storage");
  } catch (error) {
    console.error("Failed to clear tokens:", error);
  }
};

/**
 * Get remember me preference
 * @returns boolean indicating remember me preference
 */
export const getRememberMePreference = (): boolean => {
  try {
    const stored = localStorage.getItem(REMEMBER_ME_KEY);
    return stored ? JSON.parse(stored) : false;
  } catch (error) {
    console.error("Failed to get remember me preference:", error);
    return false;
  }
};

/**
 * Update stored tokens (useful for refresh token flow)
 * @param newTokens - New token data to store
 */
export const updateStoredTokens = (newTokens: Partial<TokenStorage>): void => {
  try {
    const existingTokens = getStoredTokens();
    if (existingTokens) {
      const updatedTokens = { ...existingTokens, ...newTokens };
      storeTokens(updatedTokens);
    }
  } catch (error) {
    console.error("Failed to update tokens:", error);
  }
};

/**
 * Check if user is remembered (has valid tokens with rememberMe=true)
 * @returns boolean indicating if user should be auto-logged in
 */
export const shouldAutoLogin = (): boolean => {
  try {
    const tokens = getStoredTokens();
    return !!(tokens?.rememberMe && tokens?.accessToken && tokens?.user);
  } catch (error) {
    console.error("Failed to check auto-login status:", error);
    return false;
  }
};
