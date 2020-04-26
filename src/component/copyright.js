import React from "react";

export default function CopyRight() {
  return (
    <div style={{fontSize: "12px",color:'#aaa',textDecoration:"none"}}>
      <p>Do not use your real name unless you know her/him very well. 
     * one time login Account will self destruct after log out, 
      you can use any email & user name for sign up,
       you should remember you credential theres no way to recover it
       or <b>use Google Account </b></p>
  <a style={{textDecoration:'none',color:'darkorange'}} href="#">Privacy polices </a>
  <a style={{textDecoration:'none',color:'darkorange'}} href="#">About us</a>
      <a style={{textDecoration:'none',color:'darkorange'}} href="#"> Contact us </a>
      <p style={{ marginBottom:'0', color: "#aaa" }}>
        &copy; Copyright by Dipanjan. 2020
      </p>
    </div>
  );
}
