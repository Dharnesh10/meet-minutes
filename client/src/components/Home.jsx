import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Stack } from '@mui/material';
import { Person, CalendarToday, Schedule, MeetingRoom } from '@mui/icons-material';

export default function Home() {
  const userName = 'Enitha'; // Example: you can fetch this dynamically
  const meetings = [
    {
      id: 1,
      title: 'Review Meeting',
      dept: 'Students Affairs',
      host: 'Enitha J R',
      date: '19/10/2024',
      venue: 'Aero Seminar Hall',
      time: '10:00 AM',
      followup: true,
      img: '/meeting1.png',
    },
    {
      id: 2,
      title: 'Planning Meeting',
      dept: 'Admin',
      host: 'Enitha J R',
      date: '20/10/2024',
      venue: 'Main Conference Room',
      time: '2:00 PM',
      followup: false,
      img: '/meeting2.png',
    },
    {
      id: 1,
      title: 'Review Meeting',
      dept: 'Students Affairs',
      host: 'Enitha J R',
      date: '19/10/2024',
      venue: 'Aero Seminar Hall',
      time: '10:00 AM',
      followup: true,
      img: '/meeting1.png',
    },
    {
      id: 2,
      title: 'Planning Meeting',
      dept: 'Admin',
      host: 'Enitha J R',
      date: '20/10/2024',
      venue: 'Main Conference Room',
      time: '2:00 PM',
      followup: false,
      img: '/meeting2.png',
    },
  ];

  return (
    <Box sx={{
      pl: { xs: 3, md: 11 }, // xs = mobile, md = desktop/laptop
      pt: 3,
    }}>
      {/* Welcome Message */}
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, color: 'text.primary' }}>
        Welcome, {userName} !
      </Typography>

      {/* Meetings Cards */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
        {meetings.length > 0 ? (
          meetings.map((meeting) => (
            <Card
              key={meeting.id}
              sx={{
                width: 280,
                borderRadius: 3,
                boxShadow: 3,
                cursor: 'pointer',
                position: 'relative',
              }}
            >
              {/* Follow-up badge */}
              {meeting.followup && (
                <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
                  <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 'bold' }}>
                    F
                  </Typography>
                </Box>
              )}

              {/* Image */}
              <CardMedia
                component="img"
                height="120"
                // image={meeting.img}
                image="./meeting.png"
                alt={meeting.title}
              />

              <CardContent>
                {/* Title & Dept */}
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                  {meeting.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                  By {meeting.dept}
                </Typography>

                {/* Details */}
                <Stack spacing={1}>
                  {/* Host */}
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Person fontSize="small" sx={{ color: 'text.secondary' }} />
                    <Typography variant="body2" sx={{ color: 'text.primary' }}>
                      {meeting.host}
                    </Typography>
                  </Stack>

                  {/* Date & Time */}
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <CalendarToday fontSize="small" sx={{ color: 'text.secondary' }} />
                    <Typography variant="body2" sx={{ color: 'text.primary' }}>
                      {meeting.date}
                    </Typography>
                    <Schedule fontSize="small" sx={{ color: 'text.secondary', ml: 1 }} />
                    <Typography variant="body2" sx={{ color: 'text.primary' }}>
                      {meeting.time}
                    </Typography>
                  </Stack>

                  {/* Venue */}
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <MeetingRoom fontSize="small" sx={{ color: 'text.secondary' }} />
                    <Typography variant="body2" sx={{ color: 'text.primary' }}>
                      {meeting.venue}
                    </Typography>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography>No My meetings!</Typography>
        )}
      </Box>
    </Box>
  );
}
