export interface Presentin {
  id: string;
  uid: string;
  recipientName: string;
  title: string;
  collectCash: boolean;
  groupName: string;
  createdAt: string;
  updatedAt: string;
  status: PresentinStatus;
}

export enum PresentinStatus {
  Open = 'OPEN',
  Closed = 'CLOSED',
}

export interface PresentinMessage {
  senderName: string;
  message: string;
  image: string | null;
  donateCash: boolean;
  cashAmount: number;
  uid: string;
}
