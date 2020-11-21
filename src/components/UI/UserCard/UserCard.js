import React from "react";
import { NavLink } from "react-router-dom";
import { closeUserCard } from "../../../store/actions/openUserCard";
import { DownBox } from "../DownBox/DownBox";
import { Loader } from "../Loader/Loader";
import { UserPhoto } from "../UserPhoto/UserPhoto";
import classes from "./UserCard.module.scss";

export function UserCard(props) {
  {
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
                  {props.user.Name} {props.user.Surname}
                </span>
              </div>
              <div className={classes.UserCard__Role}>
                <span>{props.user.AccountType}</span>
              </div>
              {(props.user.City || props.user.Country) && (
                <div className={classes.UserCard__Location}>
                  <span>
                    {props.user.City}
                    {", "}
                    {props.user.Country}
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
                    <NavLink
                      onClick={closeUserCard}
                      to={"/dialogs/" + props.user.id}
                    >
                      <button>Написать</button>
                    </NavLink>
                    <button onClick={props.onClickContacts}>В контакты</button>
                  </>
                )}
              </div>
              {props.user.WorkPlace && (
                <DownBox
                  title="Карьера"
                  work={props.user.WorkPlace}
                  prof={props.user.Position}
                  workLink={props.user.CompanyName}
                />
              )}

              {props.user.tel ||
                props.user.email ||
                (props.user.Vk && (
                  <DownBox
                    title="Контакты"
                    tel={props.user.Phone}
                    email={props.user.Email}
                    vk={props.user.Vk}
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
}
