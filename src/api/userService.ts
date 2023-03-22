import { IUser } from '../models/IUser'

export default class UserService {
  static async getUsers(): Promise<IUser[]> {
    const response = await fetch('./users.json')
    return await response.json()
  }
}
