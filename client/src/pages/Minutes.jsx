import React, { useState } from "react";
import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
} from "@mui/material";

const MinutesPage = () => {
  const [minutes, setMinutes] = useState([
    "TIME TABLE ALTERATION FOR FIRST YEARS",
    "PROJECT REVIEW",
    "VENUE CHANGE",
  ]);

  const toBeDiscussed = [
    { title: "TIME TABLE ALTERATION FOR FIRST YEARS", status: "COMPLETED" },
    { title: "PROJECT REVIEW", status: "ONGOING" },
    { title: "VENUE CHANGE", status: "NOT ASSIGNED" },
  ];

  const [newMinute, setNewMinute] = useState("");

  const addMinute = () => {
    if (newMinute.trim() !== "") {
      setMinutes([...minutes, newMinute]);
      setNewMinute("");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "COMPLETED":
        return "green";
      case "ONGOING":
        return "orange";
      case "NOT ASSIGNED":
        return "red";
      default:
        return "grey";
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        p: 3,
        height: "100vh",
        boxSizing: "border-box",
      }}
    >
      {/* Top Panel - Minutes */}
      <Card sx={{ flex: 1, borderRadius: 2, p: 2, boxShadow: 3, minHeight: "40%" }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          MINUTES
        </Typography>
        <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="+ Minute"
            value={newMinute}
            onChange={(e) => setNewMinute(e.target.value)}
          />
          <Button variant="contained" onClick={addMinute}>
            Add
          </Button>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, overflowY: "auto", maxHeight: "calc(100% - 80px)" }}>
          {minutes.map((m, i) => (
            <Box
              key={i}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                p: 1,
                border: "1px solid",
                borderColor: "grey.300",
                borderRadius: 1,
              }}
            >
              <Typography>{i + 1}. {m}</Typography>
              <Button size="small" variant="outlined">
                EDIT
              </Button>
            </Box>
          ))}
        </Box>
      </Card>

      {/* Bottom Panel - To Be Discussed */}
      <Card
        sx={{
          flex: 1,
          borderRadius: 2,
          p: 2,
          boxShadow: 3,
          backgroundColor: "#f0f7ff",
          minHeight: "40%",
          overflowY: "auto",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          TO BE DISCUSSED
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {toBeDiscussed.map((item, i) => (
            <Box
              key={i}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                p: 1,
                borderBottom: i < toBeDiscussed.length - 1 ? "1px solid #ccc" : "none",
              }}
            >
              <Typography>{i + 1}. {item.title}</Typography>
              <Typography sx={{ color: getStatusColor(item.status), fontWeight: "bold" }}>
                {item.status}
              </Typography>
            </Box>
          ))}
        </Box>
      </Card>
    </Box>
  );
};

export default MinutesPage;
