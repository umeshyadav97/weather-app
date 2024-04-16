import React, { useState, useEffect } from "react"
import SearchIcon from "@local/assets/images/search.svg"
// import CrossIcon from "@local/assets/icons/cross.svg"
import { InputBase } from "@mui/material"
import Image from "next/image"

const Search = ({ value, onChange, onClose, placeholder, style, Clear, onKeyPress }) => {
  const [closeBtn, setcloseBtn] = useState(false)
  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    if (value?.length >= 1) {
      setcloseBtn(true)
    } else {
      setcloseBtn(false)
    }
  }, [value])

  return (
    <div style={style}>
      <div
        className="select-option"
        style={{
          display: "flex",
          borderRadius: 8,
          maxWidth: 200,
          color: "#A4B3CC",
          paddingLeft: "12px",
          paddingRight: "12px",
          ...style
        }}>
        <div onClick={() => setIsOpen(true)} className="cursor-pointer row-center">
          <Image src={SearchIcon} alt="search" style={{ paddingTop: "3px" }} />
        </div>
        {isOpen ? (
          <InputBase
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onKeyPress={onKeyPress}
            onClick={() => setIsOpen(true)}
            style={{
              fontSize: 14
            }}
          />
        ) : (
          ""
        )}
        <div style={{ marginLeft: "auto", display: "flex", alignSelf: "center" }}>
          {closeBtn ? (
            <div
              onClick={() => {
                setcloseBtn(false)
                Clear()
                if (onClose) {
                  onClose()
                }
              }}
              className="cursor-pointer"
              style={{ alignSelf: "center", display: "flex" }}>
              {/* <Image src={CrossIcon} alt="close" /> */}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default Search
