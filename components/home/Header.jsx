import Link from "next/link";
import {FaVideo} from 'react-icons/fa'
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const {currentUser} = useAuth()

  return (
    <header className="flex flex-col xs:flex-row justify-between items-center w-full mt-3 border-b pb-2 sm:px-4 px-2 border-gray-500 gap-2">
      <Link href="/" className="flex space-x-2">
        <FaVideo className="sm:w-9 sm:h-9 w-7 h-7 text-indigo-600 "/>
        <h1 className="sm:text-3xl text-xl font-bold ml-2 tracking-tight">
          CHAT <span className="text-indigo-600">WITH</span>ZOOM
        </h1>
      </Link>
      {currentUser ? (
        <div className="flex items-center space-x-4">
          <Link
          className="flex max-w-fit items-center justify-center space-x-2 rounded-lg border border-indigo-600 text-white px-5 py-2 text-sm shadow-md hover:bg-indigo-700 bg-indigo-600 font-medium transition"
          href="/logout"
        >
          <p>Logout </p>
        </Link>
        </div>
      ) : (

        <div className="flex items-center space-x-4">
            <Link
              className="flex max-w-fit items-center justify-center space-x-2 rounded-md border border-indigo-600 text-white px-5 py-2 text-sm shadow-md hover:bg-indigo-700 bg-indigo-600 font-medium transition"
              href="/signup"
            >
              <p>Sign Up </p>
            </Link>

            <Link
              className="flex max-w-fit items-center justify-center space-x-2 rounded-lg border border-indigo-700 text-white px-5 py-2 text-sm shadow-md hover:bg-indigo-700 bg-indigo-600  font-medium transition"
              href="/login"
            >
              <p>Login</p>
            </Link>
        </div>
        
      )}
    </header>
  );
}
