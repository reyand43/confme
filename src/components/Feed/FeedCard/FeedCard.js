import classes from "./FeedCard.module.scss";
import React from "react";
import { UserItem } from "../../UI/UserItem/UserItem";

const FeedCard = (props) => {
  return (
    <div className={classes.FeedCard}>
      <div className={classes.FeedCard__Head}>
        <UserItem />
        <p>Black Lives Matter </p>
      </div>
      <div className={classes.FeedCard__Content}>
        <div className={classes.FeedCard__Content__Text}>Верхний текст</div>
        <div className={classes.FeedCard__Content__Image}></div>
        <hr style = {{color: "black"}}></hr>
        <div className={classes.FeedCard__Content__Bottom}>
          <i className="fa fa-heart-o" aria-hidden="true"></i>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
