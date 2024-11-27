import { styled } from "@mui/system";
import { Box } from "@mui/material";

export const TableCell = styled(Box)({
  display: "flex",
  position: "relative",
  border: "2px solid green",
  borderRadius: "5px",
  padding: "8px",
  gap: "5px",
  flexGrow: 1,
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  '&:nth-of-type(odd)': {
    backgroundColor: '#1af'
  },
  '&:nth-of-type(even)': {
    backgroundColor: '#fac'
  },
  '&.selected': {
    backgroundColor: '#fa1'
  }
});
