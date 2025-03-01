
/* eslint-disable react/prop-types */
import './List.css'
import { useState } from "react";

const List=({items,onClick,label})=>{
    
    const [selectedItem,setSelectedItem]=useState(0);
    const handelclick=(index,item)=>{
        setSelectedItem(index);
        onClick(item);
    };
    return(
    <>
        <label style={{color:"red"}}>{label}</label>
        <ul>
            {items?.length ? items.map((item,index)=>
                <li 
                onClick={()=>handelclick(index,item)}  key={item.name} className={selectedItem===index ? "seleted-item"
                    :""}>{item.name}
                </li>
            
            ):(<div>There is no item</div>
            )}
        </ul>
    </>
    )
}
export default List;