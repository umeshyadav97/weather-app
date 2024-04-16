"use client"
import React, { useMemo, useState } from "react"
import { Grid, Typography, Tabs, Tab } from "@mui/material"
import Image from "next/image"
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
      <Grid container className="px-5 pt-4">
        <Grid item xs={8}>
          <Grid container>
            <Grid item xs={12} display="flex" justifyContent="start">
              <Tabs value={selectedTab} onChange={handleTabChange} centered>
                <Tab label="Today" />
                <Tab label="Week" />
              </Tabs>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={2}>
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
        </Grid>
        <Grid item xs={2} className="pt-2">
          <Image
            src="https://a.storyblok.com/f/191576/1200x800/a3640fdc4c/profile_picture_maker_before.webp"
            width={40}
            height={60}
            className="rounded"
          />
        </Grid>
      </Grid>
      <Grid item className="px-8 pt-5">
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
            {" "}
            <DaysCard
              data={weatherData}
              weatherIcon={weatherIcon}
              formatData={formatData}
              degreeSymbol={degreeSymbol}
            />
          </div>
        )}
      </Grid>
      <Grid item className="pl-8 py-4">
        <Typography className="text-base">Today's Highlights</Typography>
      </Grid>
      <Grid item className="px-8">
        <TodaysCard data={weatherData} />
      </Grid>
    </React.Fragment>
  )
}
export default PageComponent
