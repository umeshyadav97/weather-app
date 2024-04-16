"use client"
import React, { useEffect, useState } from "react"
import SideBar from "../../components/SideComponent"
import styles from "./page.module.css"
import { Grid } from "@mui/material"
import PageComponent from "@local/components/PageComponent"
import axios from "axios"
const Home = () => {
  const API_KEY = "c30fa2d5b6301312b0293bce70fc2282"
  const [noData, setNoData] = useState()
  const [weatherData, setWeatherData] = useState([])
  const [city, setCity] = useState()
  const [countryMatch, setCountryMatch] = useState([])
  const [weatherIcon, setWeatherIcon] = useState(`https://openweathermap.org/img/wn/10n@2x.png`)
  const [loading, setLoading] = useState(false)
  const [searchString, setSearchString] = useState("")
  const [countries, setCountries] = useState([])
  const [showDropdown, setDropDown] = useState(false)
  const [selectedTab, setSelectedTab] = useState(0)

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue)
  }

  const myIP = (location) => {
    const { latitude, longitude } = location.coords
    getWhetherData([latitude, longitude])
  }
  const searchCountries = (input) => {
    // const {value}=input.target;
    setDropDown(true)
    setSearchString(input)

    if (!input) {
      // created if-else loop for matching countries according to the input
      setCountryMatch([])
    } else {
      let matches = countries.filter((country) => {
        // eslint-disable-next-line no-template-curly-in-string
        const regex = new RegExp(`${input}`, "gi")
        // console.log(regex)
        return country.match(regex) || country.match(regex)
      })
      setCountryMatch(matches)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    getWhetherData(searchString)
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

  if (typeof window !== "undefined") {
    window.addEventListener("load", function () {
      navigator.geolocation.getCurrentPosition(myIP)
    })
  }

  const countryPhoto = async (country) => {
    const url = "https://api.unsplash.com/search/photos"
    try {
      const res = await axios.get(
        `${url}?query=${country}&client_id=${DAMCMRUzXUyOVNIQNKIpa7YVmVMoXWiGIMH_JX_Ul5E}`
      )
      const resData = res.data
      console.log(resData)
    } catch (error) {
      console.error("Error fetching country photo:", error)
      setNoData("Location Not Found")
      setLoading(false)
    }
  }

  useEffect(() => {
    countryPhoto(city)
  }, [city])

  const getWhetherData = async (location) => {
    setLoading(true)
    let search_type =
      typeof location === "string" ? `q=${location}` : `lat=${location[0]}&lon=${location[1]}`
    const url = `https://api.openweathermap.org/data/2.5/forecast`

    try {
      const res = await axios.get(
        `${url}?${search_type}&appid=${API_KEY}&units=metric&cnt=7&exclude=hourly,daily,`
      )
      const whether_data = res.data
      if (whether_data.cod !== "200") {
        setNoData("Location Not Found")
        setCity("Unknown Location")
        setTimeout(() => {
          setLoading(false)
        }, 500)
        return
      }
      setWeatherData(whether_data)
      const dailyData = whether_data.list.reduce((acc, item) => {
        const date = item.dt_txt.split(" ")[0]
        if (!acc[date]) {
          acc[date] = {
            date: date,
            temp: item.main.temp,
            weather: item.weather[0].main,
            icon: item.weather[0].icon
          }
        }
        return acc
      }, {})
      setTimeout(() => {
        setLoading(false)
      }, 500)
      // countryPhoto(whether_data.city.country)
      setCity(`${whether_data.city.name}, ${whether_data.city.country}`)
      setWeatherIcon(
        `${"https://openweathermap.org/img/wn/" + whether_data.list[0].weather[0]["icon"]}@4x.png`
      )
    } catch (e) {
      setNoData("Location Not Found")
      setLoading(false)
    }
  }

  return (
    <div className={styles.pageContainer}>
      <Grid container className={styles.container}>
        <Grid item xs={12} className={styles.containerCard}>
          <Grid container>
            <Grid item xs={4}>
              <SideBar city={city} weatherData={weatherData} getWhetherData={getWhetherData} />
            </Grid>
            <Grid item xs={8} className={styles.pagebackground}>
              <PageComponent
                weatherData={weatherData}
                weatherIcon={weatherIcon}
                selectedTab={selectedTab}
                handleTabChange={handleTabChange}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default Home
