import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

export interface DeleteDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirmDelete: () => void;
}

const DeleteConfirmationDialog: React.FC<DeleteDialogProps> = (props) => {
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>Are you sure you want to delete course?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Deleting a course is irrrevsible and cannot be undone
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            props.onConfirmDelete();
            props.onClose();
          }}
          color="primary"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
