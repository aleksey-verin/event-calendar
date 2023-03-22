import { AppDispatch } from '../..'
import UserService from '../../../api/userService'
import { IEvent } from '../../../models/IEvent'
import { IUser } from '../../../models/IUser'
import { EventActionEnum, setEventsAction, setGuestsAction } from './types'

export const EventActionCreators = {
  setGuests: (payload: IUser[]): setGuestsAction => ({ type: EventActionEnum.SET_GUESTS, payload }),
  setEvents: (payload: IEvent[]): setEventsAction => ({
    type: EventActionEnum.SET_EVENTS,
    payload
  }),
  fetchGuests: () => async (dispatch: AppDispatch) => {
    try {
      const guests = await UserService.getUsers()
      dispatch(EventActionCreators.setGuests(guests))
    } catch (error) {
      console.log(error)
    }
  },
  createEvent: (event: IEvent) => async (dispatch: AppDispatch) => {
    try {
      const events = localStorage.getItem('event-events') || '[]'
      const json = JSON.parse(events) as IEvent[]
      json.push(event)
      dispatch(EventActionCreators.setEvents(json))
      localStorage.setItem('event-events', JSON.stringify(json))
    } catch (error) {
      console.log(error)
    }
  },
  fetchEvents: (userName: string) => async (dispatch: AppDispatch) => {
    try {
      const events = localStorage.getItem('event-events') || '[]'
      const json = JSON.parse(events) as IEvent[]
      const currentUserEvents = json.filter((ev) => ev.author === userName || ev.guest === userName)
      dispatch(EventActionCreators.setEvents(currentUserEvents))
    } catch (error) {
      console.log(error)
    }
  }
}
