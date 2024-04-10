import React from "react"
import "../styles/globals.css"
import { ToastContainer } from "react-toastify"
import Home from "./home/page"

function Index() {
  return (
    <React.Fragment>
      <Home></Home>
      <ToastContainer />
    </React.Fragment>
  )
}

export default Index
