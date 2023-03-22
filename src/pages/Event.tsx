import { Button, Layout, Modal, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import EventCalendar from '../components/EventCalendar'
import EventForm from '../components/EventForm'
import { useActions } from '../hooks/useActions'
import { useTypeSelector } from '../hooks/useTypesSelector'
import { IEvent } from '../models/IEvent'

type Props = {}

const Event = (props: Props) => {
  const [open, setOpen] = useState(false)
  const { guests, events } = useTypeSelector((state) => state.eventReducer)
  const { fetchGuests, createEvent, fetchEvents } = useActions()
  const { user } = useTypeSelector((state) => state.authReducer)

  useEffect(() => {
    fetchGuests()
    fetchEvents(user.username)
  }, [])

  const addNewEvent = (event: IEvent) => {
    setOpen(false)
    createEvent(event)
  }

  return (
    <Layout>
      <EventCalendar events={events} />
      <Row justify={'center'} style={{ backgroundColor: 'white' }}>
        <Button type="primary" onClick={() => setOpen(true)}>
          Добавить событие
        </Button>
      </Row>
      <Modal title="Добавить событие" open={open} footer={null} onCancel={() => setOpen(false)}>
        <EventForm guests={guests} submit={addNewEvent} />
      </Modal>
    </Layout>
  )
}

export default Event
