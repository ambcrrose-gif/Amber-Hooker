export enum Sender {
  USER = 'user',
  BOT = 'bot'
}

export interface Message {
  id: string;
  text: string;
  sender: Sender;
  timestamp: Date;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  pairingNotes?: string;
}
