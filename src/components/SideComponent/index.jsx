"use client"
import React, { useEffect, useState } from "react"
import { Grid, Typography, Divider, Skeleton } from "@mui/material"
import styles from "./sideComponent.module.css"
import axios from "axios"
import Search from "../Search"
import moment from "moment"
import { debounce } from "lodash"
import Image from "next/image"
import placeholderImageSrc from "@local/assets/images/cloudy.svg"

function SideBar({ weatherData, getWhetherData, city, imageData }) {
  const [countries, setCountries] = useState([])
  const [searchString, setSearchString] = useState("")
  const [countryMatch, setCountryMatch] = useState([])
  const searchCountries = debounce((input) => {
    setSearchString(input)
    if (!input) {
      setCountryMatch([])
    } else {
      let matches = countries.filter((country) => {
        const regex = new RegExp(`${input}`, "gi")
        return country.match(regex) || country.match(regex)
      })
      setCountryMatch(matches)
    }
  }, 2)

  const handleKeyPress = (e) => {
    if (e?.key === "Enter") {
      setSearchString("")
      searchCountries("")
      console.log("dhfjskjskjksk")
    }
  }

  useEffect(() => {
    const loadCountries = async () => {
      const response = await axios.get("https://restcountries.com/v3.1/all")
      let arr = []
      response.data.forEach((element) => {
        arr.push(element.name.official)
      })
      setCountries(arr)
    }

    loadCountries()
  }, [])

  useEffect(() => {
    if (searchString) getWhetherData(searchString)
  }, [searchString])

  const day_icon = (icon) => {
    return `${"https://openweathermap.org/img/wn/" + icon}@2x.png`
  }

  const checkDataFetching = (data, width) => {
    if (data === undefined || data === null || data === "") {
      return <Skeleton style={{ width: width ? width : "50%" }} />
    }
    return data
  }

  return (
    <React.Fragment>
      <Grid item className={styles.container}>
        <Grid item>
          <Search
            value={searchString}
            placeholder="Search for places..."
            onChange={(e) => {
              searchCountries(e.target.value)
            }}
            onKeyPress={(e) => handleKeyPress(e.targe)}
          />
        </Grid>
        <Grid item>
          <Image
            src={day_icon(checkDataFetching(weatherData?.list?.[0]?.weather?.[0])["icon"])}
            height={200}
            width={200}
            alt="Skeleton"
          />
        </Grid>
        <Grid item className="pb-3">
          <Typography variant="h5">
            {moment().format("dddd")},{" "}
            <span className={styles.timeText}>
              {new Date().getHours()}:{new Date().getMinutes()}
            </span>
          </Typography>
        </Grid>
        <Divider />
        <Grid container className="py-5 gap-2">
          <Grid item>
            <Image
              src={day_icon(weatherData?.list?.[0]?.weather?.[0]["icon"])}
              height={40}
              width={40}
              alt=""
            />
          </Grid>
          <Grid item display="flex" alignItems="center">
            <Typography>{weatherData?.list?.[0]?.weather?.[0]?.main}</Typography>
          </Grid>
        </Grid>
        <Grid container className={styles.containe}>
          <Grid item xs={12} className={styles.imageContainer}>
            <Image
              src={checkDataFetching(imageData?.results?.[0]?.urls?.thumb)}
              alt=""
              height={100}
              width={100}
              className={styles.image}
            />
            <div className={styles.text}>{city}</div>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
export default SideBar
