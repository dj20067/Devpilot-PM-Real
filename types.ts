
export interface User {
  id: string;
  name: string;
  avatar: string;
  company?: string;
  email?: string;
  phone?: string;
  type?: string; // e.g., "企业高级账号"
  tier?: string; // e.g., "0星"
  tags?: string[];
  tenantType?: string; // e.g., "未签约组织"
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string; // HTML supported for rich text simulation
  timestamp: string;
  isSystem?: boolean;
  type: 'text' | 'notice' | 'system_end';
  readStatus?: 'read' | 'unread';
  status?: 'sending' | 'sent' | 'failed';
}

export interface ChatSession {
  id: string;
  user: User;
  lastMessage: string;
  lastMessageTime: string;
  status: 'active' | 'queued' | 'ended';
  hasCertificate?: boolean;
  unreadCount?: number;
}

export enum RightPanelTab {
  ACTIONS = 'ACTIONS',
  CUSTOMER_INFO = 'CUSTOMER_INFO',
  HISTORY = 'HISTORY',
  MORE_INFO = 'MORE_INFO',
}

export interface OutboundContext {
  userId: string;
  userName: string;
  recordType: 'session' | 'ticket';
  recordId: string;
  recordTitle?: string; // e.g., "会话 #123" or "工单：无法安装"
}

export type UserRole = 'official' | 'developer';