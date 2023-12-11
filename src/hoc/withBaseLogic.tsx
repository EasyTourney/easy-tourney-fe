import { useDispatch } from 'react-redux'
import { Dispatch } from 'redux'
import { useLocation, useNavigate } from 'react-router-dom'

export type BaseLogicProps = {
  navigate: ReturnType<typeof useNavigate>
  location: Location
  dispatch: Dispatch<any>
}

const withBaseLogic =
  <P extends BaseLogicProps>(Component: React.ComponentType<P>) =>
  (props: Omit<P, keyof BaseLogicProps>) => {
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()

    return <Component {...(props as P)} navigate={navigate} location={location} dispatch={dispatch} />
  }

export default withBaseLogic
