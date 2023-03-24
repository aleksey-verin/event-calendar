import { RouteObject } from 'react-router-dom'
import Event from '../pages/Event'
import Login from '../pages/Login'

export interface IRoute {
  path: string
  // element: React.ComponentType
}

export enum RouteNames {
  LOGIN = `/event-calendar/login`,
  EVENT = '/event-calendar/'
}

export const publicRoutes: IRoute[] = [{ path: RouteNames.LOGIN }]

export const privateRoutes: IRoute[] = [{ path: RouteNames.EVENT }]
