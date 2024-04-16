"use client"
import React, { useEffect, useState } from "react"
import { Grid, Typography, Divider } from "@mui/material"
import styles from "./sideComponent.module.css"
import WeatherIcon from "@local/assets/images/cloudy.svg"
import Image from "next/image"
import axios from "axios"
import Search from "../Search"
import moment from "moment"

function SideBar({ weatherData, getWhetherData, city }) {
  const [countries, setCountries] = useState([])
  const [searchString, setSearchString] = useState("")
  const [countryMatch, setCountryMatch] = useState([])
  const searchCountries = (input) => {
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
  }

  const handleKeyPress = (e) => {
    if (e?.key === "Enter") {
      setSearchString("")
      searchCountries("")
      console.log("dhfjskjskjksk")
    }
  }

  console.log(weatherData)

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

  // curl https://api.unsplash.com/search/photos?query=minimal █

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
          <img
            src={day_icon(weatherData?.list?.[0]?.weather?.[0]["icon"])}
            height={200}
            width={200}
            alt="img"
          />
        </Grid>
        <Grid item>
          <Typography className={styles.tempText}>{city}</Typography>
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
            <img
              src={day_icon(weatherData?.list?.[0]?.weather?.[0]["icon"])}
              height={30}
              width={30}
              alt="img"
            />
          </Grid>
          <Grid item>
            <Typography>{weatherData?.list?.[0]?.weather?.[0]?.main}</Typography>
          </Grid>
        </Grid>
        <Grid container className="pb-5 gap-2">
          <Grid item>
            <Image src={WeatherIcon} height={30} width={30} alt="img" />
          </Grid>
          <Grid item>
            <Typography>Rain-30%</Typography>
          </Grid>
        </Grid>
        <Grid container className={styles.containe}>
          <Grid item xs={12} className={styles.imageContainer}>
            <img
              src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
              alt="Image"
              className={styles.image}
            />
            <div className={styles.text}>Your Text Here</div>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
export default SideBar
