import React, { Component } from "react";
import classes from "./DownBox.module.scss";
import Item from "./Item/Item";
import { useState } from "react";

export function DownBox(props) {  //получаем props

  const [open, setOpen] = useState(false); //хук состояния, есть переменная open, и метод setOpen, дефолтно она равна false

  return (
    <div onClick={() => setOpen(!open)} className={classes.DownBox}> {/* на онклике меняем значение стейта на противоположное */}
      <div className={classes.DownBox__Title}>
          {/* Вставляем title из props */}
        <span>{props.title}</span>
        {/* В зависимости от состояния хука меняем иконку */}
        {!open ? (
          <i className={"fa fa-chevron-down"} aria-hidden="true"></i>
        ) : (
          <i className={"fa fa-chevron-up"} aria-hidden="true"></i>
        )}
      </div>

      <div className={classes.DownBox__Content}>
          {/* В зависимости от состояния хука показываем текст из props */}
        {open && <p>{props.text}</p>}
      </div>
    </div>
  );
}

// Рабочий. Без props.
// class DownBox extends Component {

//         state = {
//             items: [
//             {item: 'Карьера', point: "down",
//             textHidden: "Карьера, 2018-2019г.",
//             textOpen: ""},
//             {item: 'Контакты', point: "down",
//             textHidden: "Тут контакты", textOpen: ""},
//             {item: 'О себе', point: "down",
//             textHidden: "Мужчина",
//             textOpen: ""},
//             {item: 'Интересы', point: "down",
//             textHidden: "Разносторонняя личность",
//             textOpen: ""},
//             ],
//         }
// // Меняет вид кнопки, на которую кликают. idx определяет кнопку.
//         changePointHandler = (idx) => {
//             let newItems = this.state.items;
//             if (newItems[idx].point == "up") {
//                 newItems[idx].point = "down"
//             } else {
//                 newItems[idx].point = "up";
//             }
//             let tmpText = newItems[idx].textHidden;
//             newItems[idx].textHidden = newItems[idx].textOpen;
//             newItems[idx].textOpen = tmpText;

//             this.setState({
//                 items: newItems
//             })
//         }
//          render () {
//             const items = this.state.items;

//             return (
//                 <div className={classes.DownBox}>
//                     <div className={classes.DownBox__UserPhoto}> </div>
//                     <p> <strong> {this.name} </strong> </p>
//                     <p> {this.city} </p>

//                     <Item
//                         num = {0}
//                         item = {items[0].item}
//                         changePointHandler = {this.changePointHandler}
//                         point = {items[0].point}
//                         text = {items[0].textOpen}/>
//                     <Item
//                         num = {1}
//                         item={items[1].item}
//                         changePointHandler = {this.changePointHandler}
//                         point={items[1].point}
//                         text = {items[1].textOpen}/>
//                     <Item
//                         num = {2}
//                         item={items[2].item}
//                         changePointHandler = {this.changePointHandler}
//                         point={items[2].point}
//                         text = {items[2].textOpen}/>
//                     <Item
//                         num = {3}
//                         item={items[3].item}
//                         changePointHandler = {this.changePointHandler}
//                         point={items[3].point}
//                         text = {items[3].textOpen}/>
//                 </div>

//             )

//         };
// }
//  export default DownBox;



// Получает данные из массива, а не через props.
// let props = {
//     name: "Имя Фамилия",
//     city: "Город",
//     career: "Информация",
//     contacts: "89112819382",
//     aboutMe: "Ничего не умею",
//     interests: "Бумага",
// }

// class DownBox extends Component {

//         state = {
//             items: [
//             {item: 'Карьера', point: "down",
//             textHidden: props.career,
//             textOpen: ""},
//             {item: 'Контакты', point: "down",
//             textHidden: props.contacts, textOpen: ""},
//             {item: 'О себе', point: "down",
//             textHidden: props.aboutMe,
//             textOpen: ""},
//             {item: 'Интересы', point: "down",
//             textHidden: props.interests,
//             textOpen: ""},
//             ],
//         }

//         changePointHandler = (idx) => {
//             let newItems = this.state.items;
//             let tmpText = newItems[idx].textHidden;
//             if (newItems[idx].point == "up") {
//                 newItems[idx].point = "down"
//             } else {
//                 newItems[idx].point = "up";
//             }
//             newItems[idx].textHidden = newItems[idx].textOpen;
//             newItems[idx].textOpen = tmpText;

//             this.setState({
//                 items: newItems
//             })
//         }

//          render () {
//             const items = this.state.items;

//             return (
//                 <div className={classes.DownBox}>
//                     <div className={classes.DownBox__UserPhoto}> </div>
//                     <p> <strong> {props.name} </strong> </p>
//                     <p> {props.city} </p>

//                     <Item
//                         num = {0}
//                         item = {items[0].item}
//                         changePointHandler = {this.changePointHandler}
//                         point = {items[0].point}
//                         text = {items[0].textOpen}/>
//                     <Item
//                         num = {1}
//                         item={items[1].item}
//                         changePointHandler = {this.changePointHandler}
//                         point={items[1].point}
//                         text = {items[1].textOpen}/>
//                     <Item
//                         num = {2}
//                         item={items[2].item}
//                         changePointHandler = {this.changePointHandler}
//                         point={items[2].point}
//                         text = {items[2].textOpen}/>
//                     <Item
//                         num = {3}
//                         item={items[3].item}
//                         changePointHandler = {this.changePointHandler}
//                         point={items[3].point}
//                         text = {items[3].textOpen}/>
//                 </div>

//             )

//         };
// }
//  export default DownBox;

// Не работает. Пыталась через useState.
// function DownBox (props) {

//     const [items, setState] = useState (
//             {id: 0, item: 'Карьера', point: "down",
//             textHidden: props.career,
//             textOpen: ""},
//             {id: 1, item: 'Контакты', point: "down",
//             textHidden: props.contacts, textOpen: ""},
//             {id: 2, item: 'О себе', point: "down",
//             textHidden: props.aboutMe,
//             textOpen: ""},
//             {id: 3, item: 'Интересы', point: "down",
//             textHidden: props.interests,
//             textOpen: ""},
//     );

//     const changePointHandler = (idx) => {
//             let newItems = items;
//             let tmpText = newItems[idx].textHidden;
//             if (newItems[idx].point == "up") {
//                 newItems[idx].point = "down"
//             } else {
//                 newItems[idx].point = "up";
//             }
//             newItems[idx].textHidden = newItems[idx].textOpen;
//             newItems[idx].textOpen = tmpText;
//             setState({
//                 items: newItems
//             })
//         }

//             // const items = items;

//             return (
//                 <div className={classes.DownBox}>
//                     <div className={classes.DownBox__UserPhoto}> </div>
//                     <p> <strong> {props.name} </strong> </p>
//                     <p> {props.city} </p>

//                     <Item
//                         num = {0}
//                         item = {items[0].item}
//                         changePointHandler = {changePointHandler}
//                         point = {items[0].point}
//                         text = {items[0].textOpen}/>
//                     <Item
//                         num = {1}
//                         item={items.item}
//                         changePointHandler = {changePointHandler}
//                         point={items[1].point}
//                         text = {items[1].textOpen}/>
//                     <Item
//                         num = {2}
//                         item={items.item}
//                         changePointHandler = {changePointHandler}
//                         point={items[2].point}
//                         text = {items[2].textOpen}/>
//                     <Item
//                         num = {3}
//                         item={items.item}
//                         changePointHandler = {changePointHandler}
//                         point={items[3].point}
//                         text = {items[3].textOpen}/>
//                 </div>

//             )

//         };
//  export default DownBox;

// Недоделанный и не работающий варинт через функцию.
// const DownBox = props => {

//     let changeBlock = props => {
//         props.point = "up";
//         props.text = "";
//     }

//     return (
//     <div className={classes.DownBox}>

//         <div className={classes.DownBox__UserPhoto}> </div>
//              <p> <strong> {props.name} </strong> </p>
//              <p>{props.city}</p>

//                     <Item
//                         item="Карьера"
//                         changeBlock = {changeBlock}
//                         point="down"
//                         text = {props.career}/>
//                     <Item
//                         item="Контакты"
//                         // changePointHandler = {changePointHandler}
//                         point="down"
//                         text = {props.contacts}/>
//                     <Item
//                         item="О себе"
//                         // changePointHandler = {changePointHandler}
//                         point="down"
//                         text = {props.aboutMe}/>
//                     <Item
//                         item={"Интересы"}
//                         // changePointHandler = {changePointHandler}
//                         point={"down"}
//                         text = {props.interests}/>
//     </div>
//     )
// };
//  export default DownBox;
