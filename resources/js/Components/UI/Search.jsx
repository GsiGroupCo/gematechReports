import React from 'react'

export default function Search({ SearchEvent }) {

    const handleChange = (e) => {
        SearchEvent(e.target.value.toLowerCase());
    };

    return (
        <input 
            type="text" 
            placeholder='Buscar...' 
            className='w-full h-[45px] px-4 py-2 mt-4 focus:outline-none bg-gray-600 text-white placeholder-white' 
            onChange={handleChange}
        />
    )
}
