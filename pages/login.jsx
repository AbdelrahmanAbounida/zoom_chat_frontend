import React, { useRef, useState,useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {GoogleAuthProvider} from 'firebase/auth'
import {FaVideo} from 'react-icons/fa'
import {FcGoogle} from 'react-icons/fc'

const Login = () => {

    const {currentUser,login,signInWithGoogle} = useAuth()
    const [error,seterror] = useState()
    const [loading,setloading] = useState()
    const router = useRouter()

    console.log("signup")
    const emailRef = useRef()
    const passwordRef = useRef()

    // ######## Login
    const handleLogin = async (e)=>{
        e.preventDefault()
    
        // Handle form errors
        if(!passwordRef.current.value){
          return seterror("Passwords shouldn't be none")
        }
        if(!emailRef.current.value){
          return seterror("Email is not correct")
        }
       
      try{
        seterror('')
        setloading(true)
        await login(emailRef.current.value,passwordRef.current.value)
        
      }
      catch (e){
        setloading(false)
        console.log(e)
        console.log(e.code?.split("auth/")[1])
        // setloading(false)
        seterror(e.code.split("auth/")[1])
        
      }
    }


    // ######## Google Login
    const handleGoogleLogin= async(e)=>{
        e.preventDefault()
      
        console.log(e)
          seterror('')
          setloading(true)
          await signInWithGoogle().then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
      
            console.log(user)
            console.log(currentUser)
            setloading(false)
            router.push("/")
            // ...
          }).catch((error) => {
            const errorCode = error.code;
            console.log(errorCode)
            const credential = GoogleAuthProvider.credentialFromError(error);
      
            console.log(credential)
            seterror(credential)
          });
      }

      useEffect( () => {  
        if(currentUser){
        router.push("/chat")
        }
      }, [currentUser]);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden dark:bg-black bg-white">


<section class="bg-gray-50 dark:bg-gray-900">

{ error &&
                          <div className="max-w-2xl mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-2" role="alert">
                          <strong className="font-bold">Error! </strong>
                          <span className="block sm:inline">{error}</span>
                          {/* <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                              <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                          </span> */}
                          </div>
                          }

  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
      <Link href="/" className="flex space-x-2">
        <FaVideo className="sm:w-9 sm:h-9 w-7 h-7 text-indigo-600 "/>
        <h1 className="sm:text-3xl text-xl font-bold ml-2 tracking-tight">
          CHAT <span className="text-indigo-600">WITH</span>ZOOM
        </h1>
      </Link>  
      </a>
     

      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8 justify-items-center flex-auto">
             
              <button onClick={handleGoogleLogin} class="bg-white hover:bg-gray-100 text-gray-700   border   inline-flex items-center font-medium rounded-lg text-md px-5 py-2.5 text-center w-full border-gray-300">
                <div className='flex m-auto'>
                    <FcGoogle size={22} />
                    Login With Google
                </div>
              </button>

              <form class="space-y-4 md:space-y-6" action="#" onSubmit={handleLogin}>
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input ref={emailRef} type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input ref={passwordRef} type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                  </div>
                  <div class="flex items-center justify-between">
                      <div class="flex items-start">
                          <div class="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-indigo-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-indigo-600 dark:ring-offset-gray-800" required="" />
                          </div>
                          <div class="ml-3 text-sm">
                            <label for="remember" class="text-gray-500 dark:text-gray-300">Remember me</label>
                          </div>
                      </div>
                      <a href="#" class="text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-500">Forgot password?</a>
                  </div>

                  {loading ? 
                    <div role="status" className='mx-auto w-10'>
                      <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-indigo-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                      </svg>
                    </div>
                    :
                  <button type="submit" class="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">Login</button>
                  }

                  <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                      Don’t have an account yet? <a href="/signup" class="font-medium text-indigo-600 hover:underline dark:text-indigo-500">Sign up</a>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>

  </div>
  )
}

export default Login