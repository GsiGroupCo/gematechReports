import React from 'react'

export default function Appbar({ children }) {
  return (
    <nav className="w-full h-auto px-4 py-2 xl:px-64 bg-[#323c7c]  flex justify-evenly items-center justify-items-center gap-3">
        { children }
    </nav>
  )
}
