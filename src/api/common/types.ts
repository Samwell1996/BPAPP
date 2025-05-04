export interface ResponseMessage {
  success: boolean;
  error?: string;
}

export interface DefaultResponse extends ResponseMessage {
  success: boolean;
}
