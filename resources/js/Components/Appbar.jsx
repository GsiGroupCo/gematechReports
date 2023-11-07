import React from 'react'

export default function Appbar({ children }) {
  return (
    <nav className="w-full h-auto py-4 bg-[#323c7c]  flex justify-evenly items-center justify-items-center gap-3">
        { children }
    </nav>
  )
}
