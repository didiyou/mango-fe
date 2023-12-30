import { AxiosResponse } from "axios";
import { http } from "./Http"
import { Resource, User } from "../env";

export let mePromise: Promise<AxiosResponse<Resource<User>>> | undefined

export const refreshMe = () => {
  mePromise = http.get<Resource<User>>('/me')
  return mePromise
}

export const fetchMe = refreshMe
