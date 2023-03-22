import { Button, Form, Input } from 'antd'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useActions } from '../hooks/useActions'
// import { useAppDispatch } from '../hooks/useActions'
import { useTypeSelector } from '../hooks/useTypesSelector'
import { AuthActionCreators } from '../store/reducers/auth/action-creators'
import { rules } from '../utils/rules'

type Props = {}

const LoginForm = (props: Props) => {
  // const dispatch = useDispatch()
  const { error, isLoading } = useTypeSelector((state) => state.authReducer)
  const { login } = useActions()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const submit = () => {
    console.log('submit')
    login(username, password)
  }

  return (
    <Form
      style={{ maxWidth: 600 }}
      labelCol={{ span: 12 }}
      wrapperCol={{ span: 16 }}
      onFinish={submit}>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <Form.Item
        label="Имя пользователя"
        name="username"
        rules={[rules.required('Пожалуйста введите имя пользователя')]}>
        <Input value={username} onChange={(e) => setUsername(e.target.value)} />
      </Form.Item>
      <Form.Item
        label="Пароль"
        name="password"
        rules={[rules.required('Пожалуйста введите пароль')]}>
        <Input value={password} onChange={(e) => setPassword(e.target.value)} type={'password'} />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Войти
        </Button>
      </Form.Item>
    </Form>
  )
}

export default LoginForm
