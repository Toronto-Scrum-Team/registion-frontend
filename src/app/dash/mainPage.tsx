import React from 'react'

export default function mainPage(){
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5]">
        <div className="bg-[#071922] p-8 rounded-[30px] shadow max-w-md w-full">
          <h1 className="text-2xl font-bold text-white font-mina text-center mb-6">Dashboard</h1>
          <p className="text-white text-center mb-4">
            Authentication successful! Welcome, {/*user.name*/}.
          </p>
          <p className="text-white/70 text-center text-sm">
            it changes, can you see it?
          </p>
        </div>
      </div>
    </div>
  )
}