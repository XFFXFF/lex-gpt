export enum OpenAIModel {
  DAVINCI_TURBO = "gpt-3.5-turbo"
}

export type XYChunk = {
  pageContent: string;
  metadata: Metadata;
}

interface Metadata {
  date: string;
  title: string;
  url: string;
}
