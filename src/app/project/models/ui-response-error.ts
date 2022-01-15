export class UIResponseError extends Error {
  statusCode: number;
  error?: any;
  messageKey: string;
}
