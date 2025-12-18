export interface IConversation {
  conversation_id: string;
  user: {
    id: number;
    avatar: string;
    username: string;
    name: string;
    email: string;
  };
  last_message: {
    id: number;
    sender_id: number;
    receiver_id: number;
    message: string;
    conversation_id: string;
    created_at: string;
  };
}

export interface IMessage {
  id: number;
  sender_id: string;
  receiver_id: string;
  message: string;
  conversation_id: string;
  created_at: string;
  updated_at: string;
}

export interface IMessageWithHuman extends IMessage {
  created_human: string;
}

export interface IPaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface IMessagePagination {
  current_page: number;
  data: IMessageWithHuman[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: IPaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}
