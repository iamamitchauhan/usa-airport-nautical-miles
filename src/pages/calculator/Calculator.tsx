import { useEffect, useState } from "react";
import { Grid, TextField, Autocomplete, Box, Typography } from "@mui/material";

import { OPTIONS } from "../../shared/constants";
import { distance } from "../../shared/utils";
import MapView from "./MapView";

interface Result {
  nauticalMiles: number;
  kilometers: number;
}

interface FromTo {
  value: { lat: number; lng: number };
  label: string;
  shortCode: string;
}

const DEFAULT_LOCATION = { value: { lat: 0, lng: 0 }, label: "", shortCode: "" };

const Calculator = () => {
  const [from, setFrom] = useState<FromTo>(DEFAULT_LOCATION);
  const [to, setTo] = useState<FromTo>(DEFAULT_LOCATION);

  const [result, setResult] = useState<Result | null>(null);

  useEffect(() => {
    if (!from?.value || !to?.value) {
      // show warning or info toast here
      console.info("Please enter both an Originating and Destination Airport.");

      setResult(null);
    } else {
      const lat1 = from.value.lat;
      const lat2 = to.value.lat;
      const lon1 = from.value.lng;
      const lon2 = to.value.lng;

      const kilometers = distance(lat1, lat2, lon1, lon2);
      const nauticalMiles = kilometers / 1.852;

      setResult({
        nauticalMiles,
        kilometers,
      });
    }
  }, [from?.value, to?.value]);

  return (
    <Grid container className="main-wrapper" direction={"column"} spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6" align="center" className="map-heading">
          Airport Distance Calculator - Calculate Airport To Airport Distance
        </Typography>
      </Grid>
      <Grid item xs={12} className="content-wrapper">
        <Grid container className="map-input-wrapper map-input-fields">
          <Grid item>
            <Autocomplete
              value={from}
              onChange={(event: any, value: any) => {
                setFrom(value ?? DEFAULT_LOCATION);
              }}
              id="from"
              fullWidth
              options={OPTIONS}
              renderInput={(params) => <TextField {...params} label="From" />}
            />
          </Grid>
          <Grid item>
            <Autocomplete
              value={to}
              onChange={(event: any, value: any) => {
                setTo(value ?? DEFAULT_LOCATION);
              }}
              id="to"
              fullWidth
              options={OPTIONS}
              renderInput={(params) => <TextField {...params} label="To" />}
            />
          </Grid>
        </Grid>
      </Grid>
      {result && result.nauticalMiles > 0 && from.shortCode && to.shortCode && (
        <Grid item xs={12} className=" distance-selector ">
          <Grid container justifyContent={"center"} className="distance-wrapper">
            <Grid item xs={12} className="distance-selector-inner">
              <div className="distance-selector-box">
                <span className="distance-points">From</span>
                <span className="cities">{from.shortCode}</span>
              </div>

              <span className="plane-icon">✈️</span>
              <div className="distance-selector-box">
                <span className="distance-points">To</span>
                <span className="cities">{to.shortCode}</span>
              </div>
            </Grid>

            <Grid item xs={12} className="distance">
              <Box>
                {`${result.nauticalMiles.toFixed(2)} nautical miles / ${result.kilometers.toFixed(2)} km is the distance From ${from.label} To ${
                  to.label
                }`}
              </Box>
            </Grid>
          </Grid>
        </Grid>
      )}
      <Grid item xs={12} sm={8} className="map-wrapper">
        <MapView paths={[from, to]} center={from.value} />
      </Grid>
    </Grid>
  );
};

export default Calculator;
