import React from "react";
import classes from "./DropDown.module.scss";
import "../vars.scss";

class DropDown extends React.Component {

  constructor(props) {
    super();
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.cls = [classes.DropDownContent];
    this.state = {
      visible: false
    }
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({
        visible: false
      })
    }
  }

  onClick = () => {
    this.setState({
      visible: !this.state.visible
    })
  }

  render() {
    this.cls = this.state.visible ? [classes.DropDownContent, classes.active]: [classes.DropDownContent];
    return (
      <div className={classes.DropDown} ref={this.setWrapperRef}>
        <div className={classes.DropDownButton} onClick={this.onClick}>
          {this.props.children}
        </div>
        <div className={this.cls.join(" ")}>
          <ul>
            {this.props.items.map((item, index) => {
              return (
                <li key={index}>
                  <p onClick={() => {item.onClick(); this.setState({visible: false})}}>{item.text}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default DropDown;
