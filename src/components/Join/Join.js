import { useState, useEffect } from "react";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Join = ({ socket, setActivePlayer }) => {
  const classes = useStyles();
  const [nicknameInput, setNicknameInput] = useState("");
  const [roomInput, setRoomInput] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [roomError, setRoomError] = useState("");

  useEffect(() => {
    socket.on("enterRoom", (newPlayer) => {
      setActivePlayer(newPlayer);
    });

    socket.on("errorParticipantName", () => {
      setNicknameError("Choose another name");
    });
  }, []);

  const handleNicknameChange = (e) => {
    setNicknameInput(e.target.value);
  };

  const handleRoomChange = (e) => {
    setRoomInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    nicknameInput
      ? setNicknameError("")
      : setNicknameError("Nickname is required");
    roomInput ? setRoomError("") : setRoomError("Room is required");
    if (nicknameInput && roomInput) {
      socket.emit("join", nicknameInput, roomInput);
      setNicknameInput("");
      setRoomInput("");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline>
        <div className={classes.paper}></div>
        <Typography component="h1" variant="h5">
          Enter or create a room!
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <TextField
            error={nicknameError}
            helperText={nicknameError}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="nickname"
            label="Nickname"
            name="nickname"
            autoFocus
            value={nicknameInput}
            onChange={handleNicknameChange}
          />
          <TextField
            error={roomError}
            helperText={roomError}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="room"
            label="Room"
            id="room"
            value={roomInput}
            onChange={handleRoomChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Enter
          </Button>
        </form>
      </CssBaseline>
    </Container>
  );
};

export default Join;
