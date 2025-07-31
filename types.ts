
export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

export interface Ad {
  id: number;
  type: 'image' | 'text';
  headline: string;
  content: string; // URL for image, text content for text ad
  cta: string; // Call to action
}
