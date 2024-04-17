import React from "react"
import Lottie from "lottie-react"
import AnimationFile from "@local/assets/animations/default-loader.json"

const AppLoader = () => {
  return (
    <div
      style={{
        display: "block",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(255, 255, 255, 0.8)",
        zIndex: 1000
      }}>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)"
        }}>
        <div className="flex flex-col gap-6 justify-center w-full items-center">
          <Lottie animationData={AnimationFile} loop={true} />
          <h1 className="text-base">Loading...</h1>
        </div>
      </div>
    </div>
  )
}

export default AppLoader
