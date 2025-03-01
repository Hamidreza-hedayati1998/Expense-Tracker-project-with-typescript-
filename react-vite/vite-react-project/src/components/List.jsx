
const List=()=>{
    const items=["Tesla","Benz","Toyota","BYD","BMW"];
    return(
        <ul>
            {items.length ? items.map((item,index)=>
                <li onClick={(e)=>console.log("click",e)} key={item}>{item}-{index}</li>
            
            ):(<div>There is no item</div>
            )}
        </ul>
    )
}
export default List;