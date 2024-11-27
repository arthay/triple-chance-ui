import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { Box, Grid2 as Grid, Typography } from "@mui/material";

import Roulette from "./Game/Roulette";
import GameTable from "./Game/GameTable";
import toggleKeyFromObject from "../utils/toggleKeyFromObject";
import toggleBulkKeysFromObject from "../utils/toggleBulkKeysFromObject";
import { TGameBets } from "../types";

export default function Game() {
  const [doubleGameBets, setDoubleGameBets] = useState<TGameBets>({});
  const [tripleGameBets, setTripleGameBets] = useState<TGameBets>({});

  const handleSelectGameBet = useCallback((value: string, cb: Dispatch<SetStateAction<TGameBets>>) => {
    cb(prev => toggleKeyFromObject(prev, value));
  }, []);

  const handleBulkSelectGameBets = useCallback((values: string[], cb: Dispatch<SetStateAction<TGameBets>>) => {
    cb(prev => toggleBulkKeysFromObject(prev, values));
  }, []);

  return (
    <Grid
      size={12}
      sx={{
        display: "flex",
        backgroundColor: "#15fcd6",
        flexGrow: 2,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid
        size={10}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Typography>Doubles table</Typography>
        <GameTable
          gameBets={doubleGameBets}
          onSelect={(value) => handleSelectGameBet(value, setDoubleGameBets)}
          onBulkSelect={(values) => handleBulkSelectGameBets(values, setDoubleGameBets)}
        />
      </Grid>
      <Grid
        size={9}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          height: "100%",
          backgroundColor: "#5fc456",
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <Typography>Seconds left</Typography>
          <Typography>0</Typography>
        </Box>
        <Roulette />
      </Grid>
      <Grid
        size={10}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography>Triples table</Typography>
        <GameTable
          gameBets={tripleGameBets}
          isTriple
          onSelect={(value) => handleSelectGameBet(value, setTripleGameBets)}
          onBulkSelect={(values) => handleBulkSelectGameBets(values, setTripleGameBets)}
        />
      </Grid>
    </Grid>
  );
}
