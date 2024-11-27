import { useEffect } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Grid2 as Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Header from "./components/Header";
import Game from "./components/Game";
import Info from "./components/Info";

function App() {
  // Access the client
  const queryClient = useQueryClient();

  // Queries
  const query = useQuery<Array<string>>({
    queryKey: ["todos"],
    queryFn: () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(
            JSON.parse(
              localStorage.getItem("data") || JSON.stringify(["1", "2", "3"])
            )
          );
        }, 1_000);
      });
    },
  });

  // Mutations
  const mutation = useMutation({
    mutationFn: () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const newData = [...(query.data || []), Date.now().toString()];
          localStorage.setItem("data", JSON.stringify(newData));
          resolve(newData);
        }, 1_000);
      });
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return (
    <Grid container sx={{
      display: "flex",
      flexDirection: "column",
      alignContent: "space-between",
      height: "100dvh",
      width: "100dvw",
    }}>
      <Header />
      <Game />
      <Info />
    </Grid>
  )

  return (
    <Box>
      {query.isLoading && <CircularProgress />}
      {query.isError && <Typography>ERROR</Typography>}
      {query.isSuccess && (
        <List>
          {query.data.map((todo, i) => (
            <ListItem key={i}>
              <ListItemText primary={todo} />
            </ListItem>
          ))}
        </List>
      )}
      <Button variant="contained" onClick={() => mutation.mutate}>
        Add
      </Button>
    </Box>
  );
}

export default App;
