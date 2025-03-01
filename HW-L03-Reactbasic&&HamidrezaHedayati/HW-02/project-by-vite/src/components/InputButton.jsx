import React from 'react'

const InputButton= () => {
  const handelclick=()=>{
     const inputValue=document.getElementById('boxInput').value;
  console.log("input value:",inputValue);
  };
 
  return (
    <div className='flex flex-col items-center justify-center space-y-3'> 
        
        <input className='border-none outline-none py-5 px-3 w-64 bg-blue-500 rounded-sm text-orange-500 mb-6 mt-8 ' id='boxInput' type='text'  placeholder='enter a value'  />  
        <button className='bg-green-700 text-white py-5 px-3 rounded-md w-32' onClick={handelclick}>Input Value</button>
    </div>
  )
}

export default InputButton;