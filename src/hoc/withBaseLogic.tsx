import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export type BaseLogicProps = {
  navigate: ReturnType<typeof useNavigate>
  location: Location
}

const withBaseLogic =
  <P extends BaseLogicProps>(Component: React.ComponentType<P>) =>
  (props: Omit<P, keyof BaseLogicProps>) => {
    const navigate = useNavigate()
    const location = useLocation()

    return <Component {...(props as P)} navigate={navigate} location={location} />
  }

export default withBaseLogic
