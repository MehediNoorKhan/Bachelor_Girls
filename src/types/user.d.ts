export interface IUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  about_me?: string | null;
  description?: string | null;
  social_profile?: string | null;
  services?: IDBDatabaseInfoService[];
  images?: string[];
  role: "user" | "owner";
  phone?: string;
  balance?: string;
}
