import React from 'react'
import { useRef, useState, useEffect } from "react";

const ProductCard = ({data, isLoading}) => {

  return (

    <>

    {isLoading ? (<div></div>)
    :
        <div>
            {data.results.map((result) =>
            <div key={result.id}>
                {/* <img src={result.data.mainimage.url}/> */}
                {result.data.images.map((im) => {
                    <img src={im.image.url} alt={im.image.url}/>


                })}

            </div>
            
            
            )}
        </div>
}
    </>
 ) 
}

export default ProductCard