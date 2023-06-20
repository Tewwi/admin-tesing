import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { IPost } from "../../interface/post";

interface IDetailPostDialog {
  open: boolean;
  handleClose: () => void;
  data?: IPost;
}

const DetailPostDialog = (props: IDetailPostDialog) => {
  const { data, open, handleClose } = props;

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle fontSize={"24px"}>
        Detail Post{" "}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ display: "flex", gap: "12px" }}>
        <Box display="flex" flexDirection="column" gap="8px" alignItems="end">
          <Typography variant="body1" color="initial" noWrap>
            User ID:
          </Typography>
          <Typography variant="body1" color="initial" noWrap>
            Title:
          </Typography>
          <Typography variant="body1" color="initial" noWrap>
            Body:
          </Typography>
        </Box>
        <Box display="flex" flexDirection="column" gap="8px">
          <Typography variant="body1" color="initial">
            {data?.userId}
          </Typography>
          <Typography variant="body1" color="initial">
            {data?.title}
          </Typography>
          <Typography variant="body1" color="initial">
            {data?.body}
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default DetailPostDialog;
