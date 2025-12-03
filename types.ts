export enum ContentType {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  YOUTUBE = 'YOUTUBE',
}

export interface Content {
  id: string;
  type: ContentType;
  url: string;
  title: string;
}
