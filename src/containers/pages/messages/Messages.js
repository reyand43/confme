import React from "react";

import { connect } from "react-redux";
import classes from "./Messages.module.scss";
import MyMessage from "../../../components/UI/Messages/MyMessage/MyMessage";
import FriendMessage from "../../../components/UI/Messages/FriendMessage/FriendMessage";
import { sendMessages, clearState } from "../../../store/actions/dialog";
import { db } from "../../../services/firebase";
import { fetchUserById} from "../../../store/actions/users";
import { Loader } from "../../../components/UI/Loader/Loader";


export default function Messages(props){
  function renderMessages() {
    console.log('PROPS IN DIALOG', props)
    return props.messages.map((chat) => {
      return chat.uid === localStorage.getItem("userId") ? (
        <li key={chat.timestamp}>
          <div className={classes.right}>
            <MyMessage
              
              time={formatTime(chat.timestamp)}
              text={chat.content}
            />
          </div>
        </li>
      ) : (
        <li key={chat.timestamp}>
          <div className={classes.left}>
            <FriendMessage
              time={formatTime(chat.timestamp)}
              text={chat.content}
              name={chat.name}
              surname={chat.surname}
            />
          </div>
        </li>
      );
    });
  }

  
  //загрузить сообщения
  
  // changeHandler(event) {
  //   this.setState({
  //     content: event.target.value,
  //   });
  // }

  // sendHandler = () => {
  //   const chatArea = this.myRef.current;
  //   this.props.sendMessages(
  //     this.state.userId, //мой id
  //     this.state.content, //текст сообщения
  //     this.state.friendId, //С кем чатимся
  //     this.props.name, //мое имя
  //     this.props.surname, //моя фамилия
  //     this.props.user.Name, //имя с кем чатимся
  //     this.props.user.Surname, //фамилия с кем чатимся
  //     this.props.id //id с кем чатимся
  //   );
  //   this.setState({
  //     content: "", //после отправки обнуляем то что в стейте сообщения
  //   });
  //   chatArea.scrollBy(0, chatArea.scrollHeight);
  // };

  // submitHandler = (event) => {
  //   event.preventDefault();
  // };

  // componentWillReceiveProps(newProps){
  //   console.log('received!', newProps)
  // }

  //редактировать время
  function formatTime(timestamp) {
    const d = new Date(timestamp);
    const time = `${d.getHours()}:${d.getMinutes()}`;
    return time;
  }

  return(
    <div className={classes.Messages}>
      <ul>{renderMessages()}</ul>
    </div>
  )
}

  // return (
  //     <div className={classes.Dialog}>
  //       <div className={classes.Dialog__ChatHeader}>
  //           <div className={classes.Dialog__ChatHeader__Name}>
  //           <span>Арина Грозных</span>
  //           <div className={classes.Dialog__ChatHeader__Name__Status}>
  //           <div className={classes.Dialog__ChatHeader__Name__Dot}/> 
  //           <span>online</span>

  //           </div>
  //           </div>
  //           <div className={classes.Dialog__ChatHeader__Settings}>
  //             <i className="fa fa-ellipsis-h" aria-hidden="true"></i>
  //           </div>
  //       </div>
  //       <div className={classes.Dialog__ChatBody} ref={this.myRef}>
  //       <ul>
  //              {this.state.chats.length !== 0 ? (
  //               this.renderMessages()
  //             ) : (
  //               <Loader />
  //             )}
  //           </ul>
  //       </div>
  //       <div className={classes.Dialog__ChatFooter}>
  //       <form onSubmit={this.submitHandler}>
  //              <i className="fa fa-plus" aria-hidden="true"></i>
  //              <input
  //               name="content"
  //               value={this.state.content}
  //               onChange={this.changeHandler}
  //               placeholder="Введите ваше сообщение"
  //               type="text"
  //             />
  //             <i
  //               onClick={this.sendHandler}
  //               type="submit"
  //               className="fa fa-paper-plane-o"
  //               aria-hidden="true"
  //             ></i>
  //           </form>
  //       </div>
  //     </div>
  //   );
  

// function mapStateToProps(state) {
//   return {
//     user: state.users.user,
//     name: state.editProfile.name,
//     surname: state.editProfile.surname,

//     messages: state.dialogList.messages,
//     messagesLoading: state.dialogList.messagesLoading,
//     selectedDialog: state.dialogList.selectedDialog
//     // content: state.dialog.content,
//     // chats: state.dialog.chats,
//     // loadingChats: state.dialog.loadingChats,
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     fetchMessages: (dialogId) => dispatch(fetchMessages(dialogId)),
//     sendMessages: (
//       userId,
//       content,
//       friendId,
//       name,
//       surname,
//       withName,
//       withSurname,
//       withId
//     ) =>
//       dispatch(
//         sendMessages(
//           userId,
//           content,
//           friendId,
//           name,
//           surname,
//           withName,
//           withSurname,
//           withId
//         )
//       ),
//     fetchUserById: (userId) => dispatch(fetchUserById(userId)),
//     clearState: () => dispatch(clearState())
//   };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Dialog);

//<div className={classes.wrapper}>
      //   <div className={classes.Dialog}>
      //     <div className={classes.Dialog__chatHeader}>
      //     <NavLink  to={"/dialogs/"} className={classes.nostyle}>
      //       <div className={classes.Dialog__chatHeader__backButton}>
      //         <i className="fa fa-angle-left" aria-hidden="true"></i>
      //         <span>Назад</span>
      //       </div>
      //      </NavLink>
            
      //         <span className={classes.Dialog__chatHeader__userName}>

      //           {this.props.user.Name}&nbsp;{this.props.user.Surname}
      //         </span>
            
      //       <div className={classes.Dialog__chatHeader__userPhoto}>
      //       <UserPhoto />
      //       </div>
      //     </div>
      //     <div className={classes.Dialog__chatBody} ref={this.myRef}>
      //       <ul>
      //         {this.state.chats.length !== 0 ? (
      //           this.renderMessages()
      //         ) : (
      //           <Loader />
      //         )}
      //       </ul>
      //     </div>
      //     <div className={classes.Dialog__chatFooter}>
      //       <form onSubmit={this.submitHandler}>
      //         <i className="fa fa-plus" aria-hidden="true"></i>
      //         <input
      //           name="content"
      //           value={this.state.content}
      //           onChange={this.changeHandler}
      //           placeholder="Введите ваше сообщение"
      //           type="text"
      //         />
      //         <i
      //           onClick={this.sendHandler}
      //           type="submit"
      //           className="fa fa-paper-plane-o"
      //           aria-hidden="true"
      //         ></i>
      //       </form>
      //     </div>
      //   </div>
      // </div>
      


