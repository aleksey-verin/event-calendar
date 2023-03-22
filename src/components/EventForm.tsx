import { Button, DatePicker, Form, Input, Row, Select } from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import { Moment } from 'moment'
import React, { useState } from 'react'
import { useTypeSelector } from '../hooks/useTypesSelector'
import { IEvent } from '../models/IEvent'
import { IUser } from '../models/IUser'
import { formatDate } from '../utils/date'
import { rules } from '../utils/rules'

type EventFormProps = {
  guests: IUser[]
  submit: (event: IEvent) => void
}

const EventForm = ({ guests, submit }: EventFormProps) => {
  const [event, setEvent] = useState<IEvent>({ author: '', date: '', description: '', guest: '' })
  const { user } = useTypeSelector((state) => state.authReducer)

  const selectDate = (date: Dayjs | null) => {
    if (date) {
      setEvent({ ...event, date: formatDate(date.toDate()) })
    }
  }

  const submitForm = () => {
    // setEvent({...event, author: user.username})
    submit({ ...event, author: user.username })
    // console.log({ ...event, author: user.username })
  }

  return (
    <Form onFinish={submitForm}>
      <Form.Item
        labelCol={{ span: 8 }}
        label="Название события"
        name="description"
        rules={[rules.required()]}>
        <Input
          value={event.description}
          onChange={(e) => setEvent({ ...event, description: e.target.value })}
        />
      </Form.Item>
      <Form.Item
        labelCol={{ span: 8 }}
        label="Дата события"
        name="date"
        rules={[rules.required(), rules.isDateAfter('Нельзя создать событие в прошлом')]}>
        <DatePicker style={{ width: '100%' }} onChange={(date) => selectDate(date)} />
      </Form.Item>

      <Form.Item
        label="Выбрать гостя"
        name="guest"
        rules={[rules.required()]}
        labelCol={{ span: 8 }}>
        <Select
          style={{ width: '100%' }}
          onChange={(guest: string) => setEvent({ ...event, guest })}
          options={guests.map((guest) => ({ value: guest.username, label: guest.username }))}
        />
      </Form.Item>

      <Row justify={'center'}>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Создать
          </Button>
        </Form.Item>
      </Row>
    </Form>
  )
}

export default EventForm
