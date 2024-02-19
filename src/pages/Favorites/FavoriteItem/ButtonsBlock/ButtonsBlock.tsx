import { FC } from "react";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface IButtonsBlock {
  onClick: () => void;
}

export const ButtonsBlock: FC<IButtonsBlock> = ({ ...props }) => {
  const { onClick } = props;
  return (
    <IconButton aria-label="delete" onClick={onClick}>
      <DeleteIcon sx={{ color: "white" }} />
    </IconButton>
  );
};
