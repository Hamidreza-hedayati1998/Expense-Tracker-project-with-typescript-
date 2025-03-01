import React from 'react'

const CardProduct = ({products}) => {
  return (
    <div>
        
            {products?.length ? products.map((product)=>
            <div className='space-x-3 p-6 m-3 bg-slate-300 border-l-4  rounded-md border-orange-600'>
                <p 
                  key={product.name} className=" space-y-2 text-2xl text-orange-400">{product.name}
                </p>
                <p 
                  key={product.price} className=" space-y-2 text-lg text-black">{product.price}
                </p>
                <p 
                  key={product.description} className=" space-y-2 text-lg text-black">{product.description}
                </p>
            </div>
            ):(<div>There is no item</div>
            )}
        
    </div>
  )
}

export default CardProduct