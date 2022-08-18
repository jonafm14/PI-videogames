import React from "react";
import Style from "../loadingPage/LoadingPage.module.css";

export default function LoadingPage() {
  return (
    <div class={Style.progress-loader}>
      <div class={Style.progress}></div>
    </div>
  );
}
