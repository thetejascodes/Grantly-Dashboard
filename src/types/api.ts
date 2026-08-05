export interface SessionUser {
  id: string;
  email: string;
  displayName: string;
  avatarUrl: string | null;
}

export interface ClientRecord {
  id: string;
  ownerUserId: string;
  name: string;
  clientId: string;
  redirectUris: string[];
  grantTypes: string[];
  responseTypes: string[];
  scopes: string[];
  createdAt: string;
  updatedAt: string | null;
}

export interface CreatedClientResponse extends ClientRecord {
  clientSecret: string;
}