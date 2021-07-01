import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

export interface SuccessDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

const SuccessDialog: React.FC<SuccessDialogProps> = (props) => {
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{props.content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} color="primary">
          Dismiss
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SuccessDialog;
