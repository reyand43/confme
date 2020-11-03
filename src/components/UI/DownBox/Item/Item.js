import React from 'react'
import classes from "./Item.module.scss";

// Со state. Работает.
const Item = props => (
    <button 
        className={classes.Item} 
        onClick={() => props.changePointHandler(props.num)}
    >
        <p> 
         <strong> {props.item} </strong> 
         <i className={"fa fa-chevron-" + props.point} aria-hidden="true"></i> 
        </p>
        <p>
            {props.text}
        </p>
        
    </button>
)

// не работает через функцию
// const Item = props => (
//     <button 
//         className={classes.Item} 
//         onClick={() => props.changeBlock(props)}
//     >
//         <p> 
//          <strong> {props.item} </strong> 
//          <i className={"fa fa-chevron-" + props.point} aria-hidden="true"></i> 
//         </p>
//         <p>
//             {props.text}
//         </p>
//     </button>
// )

export default Item;
