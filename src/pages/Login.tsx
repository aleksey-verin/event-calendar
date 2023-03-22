import { Card, Layout, Row } from 'antd'
import React from 'react'
import LoginForm from '../components/LoginForm'

type Props = {}

const Login = (props: Props) => {
  return (
    <Layout>
      <Row justify="center" align="middle" className="login">
        <Card>
          <LoginForm />
        </Card>
      </Row>
    </Layout>
  )
}

export default Login
