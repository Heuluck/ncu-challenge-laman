import { instance } from "../instance"
import type { LoginRequest } from "./user-req"
import type { AuthLoginResponse } from "./user-res"

export const Login = (data: LoginRequest): Promise<AuthLoginResponse> => {
  return instance.post('/auth/login', data)
}