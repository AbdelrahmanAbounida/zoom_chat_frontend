import React, { useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/router'

const logout = () => {

    const {currentUser,logout} = useAuth()
    const router = useRouter()

    useEffect(()=>{
        if(currentUser){
            logout()
        }
        router.push("/")
    },[])
  return (
    <div>logout</div>
  )
}

export default logout