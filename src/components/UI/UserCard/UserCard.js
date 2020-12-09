import React from "react";
import { Link, NavLink } from "react-router-dom";
import { closeUserCard } from "../../../store/actions/openUserCard";
import { DownBox } from "../DownBox/DownBox";
import { Loader } from "../Loader/Loader";
import { UserPhoto } from "../UserPhoto/UserPhoto";
import classes from "./UserCard.module.scss";

export function UserCard(props) {
  
    if (props) {
      return (
        <div className={classes.UserCard}>
          {props.loading === true ? (
            <Loader />
          ) : (
            <>
              <UserPhoto size={"lg"} rounded={"true"} />
              <div className={classes.UserCard__Name}>
                <span>
                  {props.user.name} {props.user.surname}
                </span>
              </div>
              <div className={classes.UserCard__Role}>
                <span>{props.user.role}</span>
              </div>
              {(props.user.city || props.user.country) && (
                <div className={classes.UserCard__Location}>
                  <span>
                    {props.user.city}
                    {", "}
                    {props.user.country}
                  </span>
                </div>
              )}

              <div className={classes.UserCard__Buttons}>
                {!!props.dialog ? (
                  <div className={classes.UserCard__Buttons__ForDialog}>
                    {" "}
                    <button onClick={props.onClickContacts}>
                      В контакты
                    </button>{" "}
                  </div>
                ) : (
                  <>
                   <Link to={{
                    pathname:"/dialogs/"+ props.dialogId,
                    state: {friendId: props.user.id}
                    }
                  }>
                  <button>Написать</button>
                    </Link>
                    <button onClick={props.onClickContacts}>В контакты</button>
                  </>
                )}
              </div>
              {props.user.WorkPlace && (
                <DownBox
                  title="Карьера"
                  work={props.user.workplace}
                  prof={props.user.position}
                  workLink={props.user.company}
                />
              )}

              {props.user.tel ||
                props.user.email ||
                (props.user.vk && (
                  <DownBox
                    title="Контакты"
                    tel={props.user.phone}
                    email={props.user.email}
                    vk={props.user.vk}
                  />
                ))}

              {/* {props.user.WorkPlace && 
             <DownBox
             title = "О себе"
             text1 = {props.user.WorkPlace}
             text2 = {props.user.Position}
             link = {props.user.CompanyName}/>} */}

              {props.user.WorkPlace && (
                <DownBox
                  title="Интересы"
                  look={props.user.Look}
                  suggest={props.user.Suggest}
                  hobby={props.user.Hobby}
                />
              )}
            </>
          )}
          {props.children}
        </div>
      );
    }
  
}
