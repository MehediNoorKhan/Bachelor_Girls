export interface INotification {
  id: string;
  type: string;
  message: string;
  title: string;
  created_at: string;
  isRead: boolean;
  description?: string;
}
