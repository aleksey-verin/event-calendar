import { AppDispatch } from '../..'
import UserService from '../../../api/userService'
import { IUser } from '../../../models/IUser'
import {
  AuthActionsEnum,
  setAuthAction,
  setErrorAction,
  setIsLoadingAction,
  setUserAction
} from './types'

export const AuthActionCreators = {
  setUser: (user: IUser): setUserAction => ({ type: AuthActionsEnum.SET_USER, payload: user }),
  setIsAuth: (auth: boolean): setAuthAction => ({ type: AuthActionsEnum.SET_AUTH, payload: auth }),
  setIsLoading: (payload: boolean): setIsLoadingAction => ({
    type: AuthActionsEnum.SET_IS_LOADING,
    payload
  }),
  setError: (payload: string): setErrorAction => ({ type: AuthActionsEnum.SET_ERROR, payload }),
  login: (username: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(AuthActionCreators.setIsLoading(true))
      setTimeout(async () => {
        // const response = await fetch('./users.json')
        // const mockUsers: IUser[] = await response.json()
        const mockUsers = await UserService.getUsers()
        const mockUser = mockUsers.find(
          (user) => user.username === username && user.password === password
        )
        if (mockUser) {
          localStorage.setItem('event-auth', 'true')
          localStorage.setItem('event-username', mockUser.username)
          dispatch(AuthActionCreators.setUser(mockUser))
          dispatch(AuthActionCreators.setIsAuth(true))
        } else {
          dispatch(AuthActionCreators.setError('Некорректный логин или пароль'))
          dispatch(AuthActionCreators.setIsLoading(false))
        }
      }, 1000)
    } catch (e) {
      dispatch(AuthActionCreators.setError('Произошла ошибка'))
    }
  },
  logout: () => async (dispatch: AppDispatch) => {
    localStorage.removeItem('event-auth')
    localStorage.removeItem('event-username')
    dispatch(AuthActionCreators.setUser({} as IUser))
    dispatch(AuthActionCreators.setIsAuth(false))
  }
}
