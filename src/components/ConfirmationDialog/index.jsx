import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

const ConfirmationDialog = ({
  title,
  content,
  no,
  yes,
  onAccept,
  onDeny,
  onClose,
  open,
}) => {
  /**
   * Close the dialog
   */
  const close = () => {
    if (onClose) onClose();
  };

  /**
   * Deny the confirmation
   */
  const deny = () => {
    if (onDeny) onDeny();
    close();
  };

  /**
   * Accept the confirmation
   */
  const accept = () => {
    if (onAccept) onAccept();
    close();
  };

  return (
    <Dialog open={open} onClose={close}>
      <DialogTitle>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={deny}>
          {no}
        </Button>
        <Button onClick={accept} autoFocus>
          {yes}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
