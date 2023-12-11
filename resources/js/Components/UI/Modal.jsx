import React from "react";

const Modal = ({ isVisible, onClose, children, tittle }) => {
  
  if( !isVisible )return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"> 
      <div className='min-w-[500px] md:min-w-[800px] w-full flex justify-center items-center'>
        <div className='w-[380px] sm:w-[560px] md:w-auto rounded border border-[#323c7c] shadow-md'>
          <div className='w-full h-auto bg-[#323c7c] px-4 py-2 flex justify-between items-center justify-items-center text-white font-bold'>
            { tittle }
            <button onClick={ () => onClose() } className="px-4 py-2 bg-red-500 transition duration-700 ease-in-out rounded-md text-white border border-red-800 hover:bg-red-800 hover:border-white">
              Cerrar
            </button>
          </div>
          {React.cloneElement(children, { onClose })}
        </div>
      </div>
    </div>
  )
}

export default Modal