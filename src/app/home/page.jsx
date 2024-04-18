"use client"
import React, { useEffect, useState } from "react"
import SideBar from "../../components/SideComponent"
import styles from "./page.module.css"
import PageComponent from "@local/components/PageComponent"
import axios from "axios"
import { Loader } from "@local/redux/dispatcher/Loader"
import AppLoader from "@local/components/Loader/AppLoader"
const Home = () => {
  const API_KEY = "2108884a9c36b243748500ddaba11d68"
  const [noData, setNoData] = useState()
  const [weatherData, setWeatherData] = useState([])
  const [city, setCity] = useState()
  const [weatherIcon, setWeatherIcon] = useState(`https://openweathermap.org/img/wn/10n@2x.png`)
  const [loading, setLoading] = useState(false)
  const [selectedTab, setSelectedTab] = useState(0)
  const [imageData, setImageData] = useState({})

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue)
  }

  const myIP = (location) => {
    const { latitude, longitude } = location.coords
    getWhetherData([latitude, longitude])
  }
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(myIP)
  }, [])

  const countryPhoto = async (country) => {
    const url = "https://api.unsplash.com/search/photos"
    const clientId = "DAMCMRUzXUyOVNIQNKIpa7YVmVMoXWiGIMH_JX_Ul5E"
    try {
      const res = await axios.get(`${url}?query=${country}&client_id=${clientId}`)
      const resData = res.data
      setImageData(resData)
    } catch (error) {
      console.error("Error fetching country photo:", error)
      setNoData("Location Not Found")
    }
  }
  const getWhetherData = async (location) => {
    setLoading(true)
    let search_type =
      typeof location === "string" ? `q=${location}` : `lat=${location[0]}&lon=${location[1]}`
    const url = `https://api.openweathermap.org/data/2.5/forecast`

    try {
      const res = await axios.get(
        `${url}?${search_type}&appid=${API_KEY}&units=metric&cnt=7&exclude=hourly,minutely,`
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
      countryPhoto(whether_data.city.name)
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
    <div className="md:flex md:justify-center pt-5 h-full bg-gray-300">
      {loading && <AppLoader />}
      <div className="grid sm:w-full md:mx-20 md:my-10 md:w-full">
        <div className={`${styles.containerCard} col-span-12`}>
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            <div className="sm:col-span-4 ">
              <SideBar
                city={city}
                weatherData={weatherData}
                getWhetherData={getWhetherData}
                imageData={imageData}
              />
            </div>
            <div className="sm:col-span-8  bg-gray-100 md:rounded-tr-3xl md:rounded-br-3xl">
              <PageComponent
                weatherData={weatherData}
                weatherIcon={weatherIcon}
                selectedTab={selectedTab}
                handleTabChange={handleTabChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
