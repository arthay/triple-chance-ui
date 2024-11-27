import { Grid2 as Grid, Typography } from "@mui/material";

export default function Info() {
  return (
    <Grid size={12} sx={{
      display: "flex",
      backgroundColor: "#f23456",
      height: "250px",
      alignItems: "center",
      justifyContent: "center",
      flexGrow: 0,
      mt: 1
    }}>
      <Typography>INFO</Typography>
    </Grid>
  )
}
