import { useCallback, useMemo, MouseEvent, useState } from "react";
import { Box, Grid2 as Grid, Typography } from "@mui/material";

import PlayIcon from "../icons/Play";
import { TableCell } from "./Game.styled";

interface IDoublesTableProps {
  gameBets: Record<string, boolean>;
  isTriple?: boolean;
  onSelect: (value: string) => void;
  onBulkSelect: (values: string[]) => void;
}

export default function GameTable({
  gameBets,
  isTriple = false,
  onSelect,
  onBulkSelect
}: IDoublesTableProps) {
  const [currentSetIndex, setCurrentSetIndex] = useState(0);

  const handleSetClick = useCallback((event: MouseEvent<HTMLDivElement>, setIndex: number) => {
    event.stopPropagation();

    setCurrentSetIndex(setIndex);
  }, []);

  const handleClick = useCallback((value: string) => {
    onSelect(value);
  }, [onSelect]);

  const cellsValues = useMemo(() => {
    return Array.from({ length: 10 }, (_, i) => {
      return Array.from({ length: 10 }, (_, j) => {
        return (i * 10 + 100 * currentSetIndex + j).toString().padStart(isTriple ? 3 : 2, "0");
      });
    });
  }, [currentSetIndex, isTriple]);

  const handleRowClick = useCallback((rowIndex: number) => {
    onBulkSelect(cellsValues[rowIndex])
  }, [cellsValues, onBulkSelect]);

  const handleCellClick = useCallback((event: MouseEvent<HTMLDivElement>, cellIndex: number) => {
    event.stopPropagation();

    const newBets = cellsValues.map(values => (
      values[cellIndex]
    ));

    onBulkSelect(newBets);
  }, [cellsValues, onBulkSelect]);

  return (
    <Grid container sx={{
      width: "100%",
      paddingLeft: '16px',
      paddingTop: '32px',
    }}>
      <Grid sx={{
        width: "100%",
      }}>
        {cellsValues.map((row, rowIndex) => (
          <Grid
            size={12}
            key={rowIndex}
            sx={{
              display: "flex",
              backgroundColor: "red",
              position: 'relative',

            }}
          >
            <Box
              sx={{
                position: 'absolute',
                left: '-12px',
                top: '50%',
                transform: 'translateY(-50%)',
                lineHeight: 0,
                cursor: 'pointer',
                zIndex: 10
              }}
              onClick={() => handleRowClick(rowIndex)}
            >
              <PlayIcon />
            </Box>
            {row.map((cellValue, cellIndex) => (
              <TableCell
                key={`${rowIndex}-${cellIndex}`}
                onClick={() => handleClick(cellValue)}
                className={`${gameBets?.[cellValue] ? 'selected': ''}`}
              >
                {isTriple && rowIndex === 0 && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '-30px',
                      padding: '2px 4px',
                      backgroundColor: `${cellIndex === currentSetIndex ? '#ff0' : '#fff'}`,
                      borderRadius: '8px'
                    }}
                    onClick={(event) => handleSetClick(event, cellIndex)}
                  >
                    {cellIndex.toString().padStart(3, "0")}
                  </Box>
                )}
                <Typography>{cellValue}</Typography>
                {rowIndex === cellsValues.length - 1 && (
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: '-12px',
                      left: '50%',
                      transform: 'translateX(-50%) rotate(-90deg)',
                      lineHeight: 0,
                      cursor: 'pointer'
                  }}
                    onClick={(event) => handleCellClick(event, cellIndex)}
                  >
                    <PlayIcon />
                  </Box>
                )}
              </TableCell>
            ))}
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
