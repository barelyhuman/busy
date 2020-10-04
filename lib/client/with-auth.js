import React, { useEffect } from 'react'

// Add Router Implementation
let navigation

export default function withAuth (WrappedComponent) {
  return (props) => {
    useEffect(() => {
      const token = window.localStorage.getItem('auth')
      if (!token) {
        navigation.push('/login')
      }
    }, [])

    return <WrappedComponent {...props} />
  }
}
