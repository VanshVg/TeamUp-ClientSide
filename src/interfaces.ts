export interface dataI {
  success: boolean;
  type?: string;
  message: string;
  reset_token?: string;
}

export interface responseI {
  data: dataI;
}

export interface axiosErrorI {
  response: responseI;
}
