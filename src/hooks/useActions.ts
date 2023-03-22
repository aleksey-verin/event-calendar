import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { AppDispatch } from '../store'
import { allActionCreators } from '../store/reducers/action-creators'
// import type { AppDispatch } from './store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useActions = () => {
  const dispatch = useDispatch<AppDispatch>()
  return bindActionCreators(allActionCreators, dispatch)
}
