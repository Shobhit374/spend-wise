import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Nav = () => {
  return (
    <header className="container max-w-2xl px-6 py-6 mx-auto">
      {/*User section*/}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-[40px] w-[40px] rounded-full overflow-hidden">
            <img className="w-full h-full object-cover" src="https://thispersondoesnotexist.com/" alt="Profile Pic"/>
          </div>
          <small>Welcome, User</small>
        </div>
        <nav className="flex items-center gap-2">
          <div>
            <Link href = "/" className="flex gap-2 flex-center">
              {/*Logo Image*/}
              <Image src = "/assets/statistics.png" alt="Stats" 
              width={30}
              height={30}/>
            </Link> 
          </div>
          <div>
            <button className="btn btn-danger">Sign Out</button>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Nav
