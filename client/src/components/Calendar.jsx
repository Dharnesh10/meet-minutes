// import React, { useState } from "react";
// import { Box, Paper, Typography } from "@mui/material";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
// import dayjs from "dayjs";

// function MyCalendar() {
//   const [selectedDate, setSelectedDate] = useState(dayjs());

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           p: 3,
//         }}
//       >
//         <Paper sx={{ p: 2, boxShadow: 3 }}>
//           <Typography variant="h6" sx={{ mb: 2 }}>
//             Calendar
//           </Typography>
//           <StaticDatePicker
//             displayStaticWrapperAs="desktop"
//             value={selectedDate}
//             onChange={(newValue) => setSelectedDate(newValue)}
//           />
//         </Paper>
//       </Box>
//     </LocalizationProvider>
//   );
// }

// export default MyCalendar;


import React, { useEffect, useState } from "react";
import { Box, Paper, Typography, List, ListItem, ListItemText } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import dayjs from "dayjs";
import { gapi } from "gapi-script";

const CLIENT_ID = "1057670838406-sdjvpi4poqnjq066eopkekqg1rio03un.apps.googleusercontent.com"; // For OAuth2
const API_KEY = "AIzaSyA6j0mNGknXhE0-Mte6i4u2s5olVsnytYQ"; // For public calendar access
// const CALENDAR_ID = "dharneshk10@gmail.com@group.calendar.google.com"; // Google Calendar ID
const CALENDAR_ID = "primary"; // Use "primary" for the authenticated user's primary calendar
const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

function MyCalendar() {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [events, setEvents] = useState([]);

  useEffect(() => {
    function start() {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
        scope: SCOPES,
      }).then(() => {
        gapi.client.load("calendar", "v3", () => {
          fetchEvents();
        });
      });
    }

    gapi.load("client:auth2", start);
  }, []);

  const fetchEvents = () => {
    gapi.client.calendar.events
      .list({
        calendarId: CALENDAR_ID,
        timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 20,
        orderBy: "startTime",
      })
      .then((response) => {
        const events = response.result.items.map((event) => ({
          title: event.summary,
          start: event.start.dateTime || event.start.date,
          end: event.end.dateTime || event.end.date,
        }));
        setEvents(events);
      });
  };

  const eventsForSelectedDate = events.filter((event) => {
    const eventDate = dayjs(event.start);
    return eventDate.isSame(selectedDate, "day");
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 3, p: 3 }}>
        {/* Calendar */}
        <Paper sx={{ flex: 1, p: 2, boxShadow: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Google Calendar</Typography>
          <StaticDatePicker
            displayStaticWrapperAs="desktop"
            value={selectedDate}
            onChange={(newValue) => setSelectedDate(newValue)}
          />
        </Paper>

        {/* Events */}
        <Paper sx={{ flex: 1, p: 2, boxShadow: 3, minHeight: "400px" }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Events for {selectedDate.format("DD MMM YYYY")}
          </Typography>
          {eventsForSelectedDate.length === 0 ? (
            <Typography>No events for this day.</Typography>
          ) : (
            <List>
              {eventsForSelectedDate.map((event, index) => (
                <ListItem key={index} sx={{ mb: 1, border: "1px solid #ccc", borderRadius: 1 }}>
                  <ListItemText
                    primary={event.title}
                    secondary={`Time: ${dayjs(event.start).format("HH:mm")} - ${dayjs(event.end).format("HH:mm")}`}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Paper>
      </Box>
    </LocalizationProvider>
  );
}

export default MyCalendar;
