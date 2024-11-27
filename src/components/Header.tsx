import { Grid2 as Grid, Typography } from "@mui/material";

export default function Header() {
  return (
    <Grid size={12} sx={{
      display: "flex",
      flexGrow: 0,
      backgroundColor: "#556cd6",
      height: "50px",
      alignItems: "center",
      justifyContent: "center",
      mb: 1
    }}>
      <Typography>HEADER</Typography>
    </Grid>
  )
}