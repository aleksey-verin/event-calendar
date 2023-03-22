import { Layout, Menu, MenuProps, Row } from 'antd'
import { Header } from 'antd/es/layout/layout'
import MenuItem from 'antd/es/menu/MenuItem'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useActions } from '../hooks/useActions'
import { useTypeSelector } from '../hooks/useTypesSelector'
import { RouteNames } from '../routes'
import { AuthActionCreators } from '../store/reducers/auth/action-creators'

type Props = {}

const Navbar = (props: Props) => {
  const { logout } = useActions()
  const { isAuth, user } = useTypeSelector((state) => state.authReducer)

  const items1: MenuProps['items'] = ['Логин'].map((key) => ({
    key,
    label: `${key}`
  }))
  const items2: MenuProps['items'] = ['Выйти'].map((key) => ({
    key,
    label: `${key}`
  }))

  const router = useNavigate()
  return (
    <Layout>
      <Header className="header">
        <Row justify={'end'}>
          {isAuth ? (
            <>
              <div style={{ color: 'white', marginRight: 20 }} className="logo">
                {user.username}
              </div>
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['Выйти']}
                items={items2}
                onClick={logout}
              />
            </>
          ) : (
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['Логин']}
              items={items1}
              onClick={() => router(RouteNames.LOGIN)}
            />
          )}
        </Row>
      </Header>
    </Layout>
  )
}

export default Navbar
