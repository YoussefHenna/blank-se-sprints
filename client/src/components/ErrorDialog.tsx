import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

export interface ErrorDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

const ErrorDialog: React.FC<ErrorDialogProps> = (props) => {
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

export default ErrorDialog;
