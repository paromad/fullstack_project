import { useState } from "react";
import { Link } from 'react-router-dom';
import React from "react";
import classes from './CustomButton.module.css'

const CustomButton = ({children, ...props}) => {
    return (
    <button {...props} className={classes.customBtn}>
        {children}
    </button>
    )
}

export function Button(props) {
    const { title, href, onClick } = props
    // console.log("BUTTON")
    // console.log(props)
  
    return (
      <Link to={href}>
        <button className={classes.customBtn} onClick={onClick}>
          {title}
        </button>
      </Link>
    )
  }
  

export default CustomButton;