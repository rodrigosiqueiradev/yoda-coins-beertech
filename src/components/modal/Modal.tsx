import React, { ReactNode } from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import useStyles from "./Modal.style";

interface IModal {
  title?: string;
  children: ReactNode;
}

const TransitionsModal = ({ title, children }: IModal) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            {title && <h2 id="transition-modal-title">{title}</h2>}
            <p id="transition-modal-description">{children}</p>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default TransitionsModal;
