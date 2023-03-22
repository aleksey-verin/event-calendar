import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useTypeSelector } from '../hooks/useTypesSelector'
import Event from '../pages/Event'
import Login from '../pages/Login'
import { RouteNames } from '../routes'

type Props = {}

const AppRouter = (props: Props) => {
  const { isAuth } = useTypeSelector((state) => state.authReducer)
  return isAuth ? (
    <Routes>
      <Route path={RouteNames.EVENT} element={<Event />} />
      <Route path="*" element={<Navigate replace to={RouteNames.EVENT} />} />
    </Routes>
  ) : (
    <Routes>
      <Route path={RouteNames.LOGIN} element={<Login />} />
      <Route path="*" element={<Navigate replace to={RouteNames.LOGIN} />} />
    </Routes>
  )
}

export default AppRouter
