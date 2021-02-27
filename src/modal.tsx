import { FC, useState } from "react";
import {
  Checkbox,
  Modal,
  TextField,
  Button,
  Container,
  Box,
} from "@material-ui/core";

interface Props {
  id: string;
  values: {
    description: string;
    completed: boolean;
  };
  onSubmit: (
    id: string,
    description: string,
    completed: boolean
  ) => Promise<void>;
}
export const EditModal: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState(props.values.description);
  const [completed, setCompleted] = useState(props.values.completed);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        type="button"
        onClick={handleOpen}
      >
        Edit
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Box
          display="flex"
          height="100vh"
          justifyContent="center"
          alignItems="center"
          my="auto"
        >
          <Container>
            <Box bgcolor="white" p={5}>
              <TextField
                required
                id="standard-required"
                label="Task"
                fullWidth
                variant="filled"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <Checkbox
                checked={completed}
                onClick={() => setCompleted((p) => !p)}
              />
              <span>Completed</span>
              <br />
              <Button
                variant="contained"
                onClick={() => {
                  setOpen(false);
                }}
              >
                Close
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  props
                    .onSubmit(props.id, input, completed)
                    .then(() => setOpen(false))
                }
              >
                Edit Task
              </Button>
            </Box>
          </Container>
        </Box>
      </Modal>
    </>
  );
};
