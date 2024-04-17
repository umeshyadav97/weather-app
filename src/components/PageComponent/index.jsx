"use client"
import React, { useMemo, useState } from "react"
import { Typography, Tabs, Tab } from "@mui/material"
import DaysCard from "../DaysCard"
import { RiCelsiusFill, RiFahrenheitFill } from "react-icons/ri"
import styles from "./pageComponent.module.css"
import TodaysCard from "../TodaysCard"

function PageComponent({ weatherData, weatherIcon, handleTabChange, selectedTab }) {
  const [isFahrenheitMode, setIsFahrenheitMode] = useState(false)
  const degreeSymbol = useMemo(() => (isFahrenheitMode ? "\u00b0F" : "\u00b0C"), [isFahrenheitMode])
  const toggleFahrenheit = () => {
    setIsFahrenheitMode(!isFahrenheitMode)
  }

  function convertToFahrenheit(celsius) {
    return (celsius * 9) / 5 + 32
  }

  const formatData = (temp) => {
    return Math.round(isFahrenheitMode ? convertToFahrenheit(temp) : temp)
  }
  return (
    <React.Fragment>
      <div className="px-5 pt-24 lg:pt-4 md:pt-4 sm:grid sm:grid-cols-12 sm:gap-4">
        <div className="sm:col-span-8">
          <div className="flex justify-start">
            <Tabs value={selectedTab} onChange={handleTabChange} centered>
              <Tab label="Today" />
              <Tab label="Week" />
            </Tabs>
          </div>
        </div>

        <div className="hidden sm:block sm:col-span-2">
          <div className={styles.toggle_container}>
            <input
              type="checkbox"
              className={styles.checkbox}
              id="fahrenheit-checkbox"
              onChange={toggleFahrenheit}
            />
            <label htmlFor="fahrenheit-checkbox" className={styles.label}>
              <RiFahrenheitFill />
              <RiCelsiusFill />
              <div className={styles.ball} />
            </label>
          </div>
        </div>

        <div className="pt-2 hidden sm:block sm:col-span-2">
          <img
            src="https://a.storyblok.com/f/191576/1200x800/a3640fdc4c/profile_picture_maker_before.webp"
            width={40}
            height={60}
            className="rounded"
            alt="Profile"
          />
        </div>

        <div className=" pt-5 sm:col-start-1 sm:col-span-12">
          {/* Content for the selected tab */}
          {selectedTab === 0 && (
            <div>
              <DaysCard
                data={weatherData}
                weatherIcon={weatherIcon}
                formatData={formatData}
                degreeSymbol={degreeSymbol}
              />
            </div>
          )}
          {selectedTab === 1 && (
            <div>
              <DaysCard
                data={weatherData}
                weatherIcon={weatherIcon}
                formatData={formatData}
                degreeSymbol={degreeSymbol}
              />
            </div>
          )}
        </div>

        <div className="py-4 sm:col-start-1 sm:col-span-12">
          <Typography className="text-base">Today's Highlights</Typography>
        </div>

        <div className="sm:col-start-1 sm:col-span-12">
          <TodaysCard data={weatherData} />
        </div>
      </div>
    </React.Fragment>
  )
}
export default PageComponent
