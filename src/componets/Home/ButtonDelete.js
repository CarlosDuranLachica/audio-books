import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Alert from '@material-ui/lab/Alert';

import { useDispatch } from "react-redux";


import {
  BorrarBooks,
} from "../Redux/Reducers/BooksReducer";

export default function SimpleSnackbar(props) {
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch()

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <Button
        onClick={handleClick}
        color="primary"
      >
        Borrar
      </Button>
      <Snackbar
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={10000}
        onClose={handleClose}
        message="¿Estas seguro de eliminar este libro?"
      >
        <Alert
          style={{ backgroundColor: "rgba(245, 1, 1, 0.3)" }}
          severity="error"
          action={
            <>
              <IconButton
                style={{ margin: "0 15px 0 0" }}
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                  dispatch(BorrarBooks(props.ID, props.Index))
                }}
              >
                Yes
            </IconButton>
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                No
            </IconButton>
            </>
          }
        >
          ¿Estas seguro de eliminar este libro?
        </Alert>
      </Snackbar>
    </div>
  );
}

/* import React, { useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }),
);

const ShowAlerts = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    setOpen(true);
  }, [props.Open]);
  return (
    <div className={classes.root}>
      <Collapse in={open}>
        <Alert
        style={{backgroundColor: "rgba(245, 1, 1, 0.3)", position:"fixed", top:"0"}}
         severity="error"
          action={
            <>
            <IconButton
              style={{margin:"0 15px 0 0"}}
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              Yes
            </IconButton>
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              No
            </IconButton>
            </>
          }
        >
          ¿Estas seguro de eliminar este libro?
        </Alert>
      </Collapse>
    </div>
  );
}

export default ShowAlerts; */