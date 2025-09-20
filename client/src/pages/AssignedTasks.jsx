import React, { useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
} from "@mui/material";

const AssignedTasks = () => {
  // Dummy tasks
  const [tasklist] = useState([
    {
      id: 1,
      task: "Prepare Report",
      description: "Prepare the monthly financial report",
      assignto: "John Doe",
      date: "2024-10-19",
      status: "assigned",
    },
    {
      id: 2,
      task: "Schedule Meeting",
      description: "Set up project kickoff meeting",
      assignto: "Jane Smith",
      date: "2024-10-20",
      status: "pending",
    },
    {
      id: 3,
      task: "Finalize Document",
      description: "Complete and submit final draft",
      assignto: "Michael Lee",
      date: "2024-10-21",
      status: "completed",
    },
  ]);

  const [selectedTask, setSelectedTask] = useState(null);

  const handleOpen = (task) => setSelectedTask(task);
  const handleClose = () => setSelectedTask(null);

  return (
    <Box sx={{ p: 3 }}>
      {!tasklist.length ? (
        <Typography variant="body1" sx={{ textAlign: "center", mt: 4 }}>
          No Assigned Tasks!
        </Typography>
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
          <Table>
            <TableBody>
              {tasklist.map((task, index) => (
                <TableRow
                  key={task.id}
                  hover
                  sx={{ cursor: "pointer" }}
                  onClick={() => handleOpen(task)}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{task.task}</TableCell>
                  <TableCell>{task.date}</TableCell>
                  <TableCell>
                    {task.status === "assigned" ? (
                      <Button size="small" variant="outlined" color="primary">
                        ASSIGNED
                      </Button>
                    ) : task.status === "pending" ? (
                      <Button size="small" variant="outlined" color="warning">
                        REVIEW
                      </Button>
                    ) : (
                      <Button size="small" variant="contained" color="success" disabled>
                        COMPLETED
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Task Details Dialog */}
      <Dialog
        open={!!selectedTask}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3, p: 2 },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: "bold",
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          Task Details
        </DialogTitle>
        <DialogContent dividers>
          {selectedTask && (
            <Stack spacing={2}>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Task
                </Typography>
                <Typography variant="body1">{selectedTask.task}</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Description
                </Typography>
                <Typography variant="body1">
                  {selectedTask.description}
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Assigned To
                </Typography>
                <Typography variant="body1">{selectedTask.assignto}</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Due Date
                </Typography>
                <Typography variant="body1">{selectedTask.date}</Typography>
              </Box>
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          {selectedTask?.status === "assigned" && (
            <Button variant="outlined" color="primary">
              ASSIGNED
            </Button>
          )}
          {selectedTask?.status === "pending" && (
            <Button variant="outlined" color="warning">
              REVIEW
            </Button>
          )}
          {selectedTask?.status === "completed" && (
            <Button variant="contained" color="success" disabled>
              COMPLETED
            </Button>
          )}
          <Button onClick={handleClose} color="inherit">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AssignedTasks;
