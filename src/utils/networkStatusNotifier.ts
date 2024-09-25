'use client'

import { useEffect } from 'react'
import toast from 'react-hot-toast'

export function NetworkStatusNotifier() {
  useEffect(() => {
    const handleOnline = () => {
      toast.success('Você está online novamente!')
    }

    const handleOffline = () => {
      toast.error('Você está offline!')
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Cleanup listeners on component unmount
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])
  return null
}
