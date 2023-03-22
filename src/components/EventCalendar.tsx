import { Badge, BadgeProps, Calendar } from 'antd'
import { Dayjs } from 'dayjs'
import React from 'react'
import { IEvent } from '../models/IEvent'
import { formatDate } from '../utils/date'

interface EventCalendarProps {
  events: IEvent[]
}

const EventCalendar = (props: EventCalendarProps) => {
  const dateCellRender = (value: Dayjs) => {
    const formatedDate = formatDate(value.toDate())
    const currentDayEvents = props.events.filter((ev) => ev.date === formatedDate)
    return (
      <ul className="events">
        {currentDayEvents.map((item) => (
          <li key={item.description}>
            <Badge status={'success'} text={item.description} />
          </li>
        ))}
      </ul>
    )
  }

  return <Calendar dateCellRender={dateCellRender} />
}

export default EventCalendar
