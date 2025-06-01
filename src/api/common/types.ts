export interface ResponseMessage {
  data: any;
  success: boolean;
  error?: string;
}

export interface DefaultResponse extends ResponseMessage {
  success: boolean;
}
