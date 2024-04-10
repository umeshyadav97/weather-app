"use client"
import React from "react"
import { Box, Grid } from "@mui/material"
import { useStyles } from "./commonLayoutStyles"

function CommonLayout({ children }) {
  const styles = useStyles()
  return (
    <Box sx={styles.main}>
      <Grid container>
        {
          <Grid item xs={12}>
            {children}
          </Grid>
        }
      </Grid>
    </Box>
  )
}

export default CommonLayout
