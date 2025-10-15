// Appwrite User Types
export interface AppwriteUser {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  name: string;
  registration: string;
  status: boolean;
  labels: string[];
  passwordUpdate: string;
  email: string;
  phone: string;
  emailVerification: boolean;
  phoneVerification: boolean;
  mfa: boolean;
  prefs: Record<string, any>;
  targets: Target[];
  accessedAt: string;
}

export interface AppwriteSession {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  userId: string;
  expire: string;
  provider: string;
  providerUid: string;
  providerAccessToken: string;
  providerAccessTokenExpiry: string;
  providerRefreshToken: string;
  ip: string;
  osCode: string;
  osName: string;
  osVersion: string;
  clientType: string;
  clientCode: string;
  clientName: string;
  clientVersion: string;
  clientEngine: string;
  clientEngineVersion: string;
  deviceName: string;
  deviceBrand: string;
  deviceModel: string;
  countryCode: string;
  countryName: string;
  current: boolean;
  factors: string[];
  secret: string;
  mfaUpdatedAt: string;
}

export interface Target {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  name: string;
  userId: string;
  providerId?: string;
  providerType: string;
  identifier: string;
}

export interface AppwriteTeam {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  name: string;
  total: number;
  prefs: Record<string, any>;
}

export interface Membership {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  userId: string;
  userName: string;
  userEmail: string;
  teamId: string;
  teamName: string;
  invited: string;
  joined: string;
  confirm: boolean;
  mfa: boolean;
  roles: string[];
}

// Custom Profile interface for Al-Kabir
export interface Profile {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  user_id: string;
  email: string;
  full_name: string;
  phone?: string;
  address?: string;
  city: string;
  avatar_url?: string;
  date_of_birth?: string;
  gender?: 'male' | 'female' | 'other';
  preferences?: Record<string, any>;
  is_professional?: boolean;
  is_verified?: boolean;
  last_login?: string;
}

// Authentication error types
export interface AuthError {
  message: string;
  code: number;
  type: string;
  response: {
    message: string;
    code: number;
    type: string;
    version: string;
  };
}

// JWT Token interface
export interface JWT {
  jwt: string;
}

// Token interface
export interface Token {
  $id: string;
  $createdAt: string;
  userId: string;
  secret: string;
  expire: string;
  phrase: string;
}

// Preferences type
export interface Preferences {
  [key: string]: any;
}

// Log entry interface
export interface Log {
  event: string;
  userId: string;
  userEmail: string;
  userName: string;
  mode: string;
  ip: string;
  time: string;
  osCode: string;
  osName: string;
  osVersion: string;
  clientType: string;
  clientCode: string;
  clientName: string;
  clientVersion: string;
  clientEngine: string;
  clientEngineVersion: string;
  deviceName: string;
  deviceBrand: string;
  deviceModel: string;
  countryCode: string;
  countryName: string;
}

// MFA types
export interface MfaFactors {
  totp: boolean;
  phone: boolean;
  email: boolean;
  recoveryCode: boolean;
}

export interface MfaChallenge {
  $id: string;
  $createdAt: string;
  userId: string;
  expire: string;
}

export interface MfaRecoveryCodes {
  recoveryCodes: string[];
}

export interface MfaType {
  secret: string;
  uri: string;
}

// Lists
export interface SessionsList {
  total: number;
  sessions: AppwriteSession[];
}

export interface LogsList {
  total: number;
  logs: Log[];
}

export interface MembershipsList {
  total: number;
  memberships: Membership[];
}

export interface TeamsList {
  total: number;
  teams: AppwriteTeam[];
}

export interface TargetsList {
  total: number;
  targets: Target[];
}

// Account Recovery
export interface AccountRecovery {
  $id: string;
  $createdAt: string;
  userId: string;
  secret: string;
  expire: string;
}

// Email/Phone Verification
export interface Verification {
  $id: string;
  $createdAt: string;
  userId: string;
  secret: string;
  expire: string;
}

// Identity interface for OAuth providers
export interface Identity {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  userId: string;
  provider: string;
  providerUid: string;
  providerEmail: string;
  providerAccessToken: string;
  providerAccessTokenExpiry: string;
  providerRefreshToken: string;
}

export interface IdentitiesList {
  total: number;
  identities: Identity[];
}