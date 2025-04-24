import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
} from '@mui/material';
import {
  Hotel as HotelIcon,
  Event as EventIcon,
  Person as PersonIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import { useState } from 'react';

const ReceptionistDashboard = () => {
  const [bookings, setBookings] = useState([
    {
      id: 'BK001',
      customer: 'Nguyễn Văn A',
      room: 'Gia đình 101',
      checkIn: '07/03/2024',
      checkOut: '10/03/2024',
      status: 'Đã xác nhận',
    },
    {
      id: 'BK002',
      customer: 'Trần Thị B',
      room: 'Đôi 201',
      checkIn: '07/03/2024',
      checkOut: '09/03/2024',
      status: 'Chờ xác nhận',
    },
    {
      id: 'BK003',
      customer: 'Lê Văn C',
      room: '3 người 301',
      checkIn: '06/03/2024',
      checkOut: '08/03/2024',
      status: 'Đã xác nhận',
    },
  ]);

  const stats = [
    {
      title: 'Phòng trống',
      value: '25',
      icon: <HotelIcon sx={{ fontSize: 40 }} />,
      color: '#2e7d32',
    },
    {
      title: 'Check-in hôm nay',
      value: '8',
      icon: <EventIcon sx={{ fontSize: 40 }} />,
      color: '#1976d2',
    },
    {
      title: 'Check-out hôm nay',
      value: '5',
      icon: <PersonIcon sx={{ fontSize: 40 }} />,
      color: '#ed6c02',
    },
    {
      title: 'Đặt phòng mới',
      value: '12',
      icon: <CheckCircleIcon sx={{ fontSize: 40 }} />,
      color: '#9c27b0',
    },
  ];

  const handleCheckIn = (id) => {
    setBookings(
      bookings.map((booking) =>
        booking.id === id ? { ...booking, status: 'Đã check-in' } : booking
      )
    );
  };

  const handleCheckOut = (id) => {
    setBookings(
      bookings.map((booking) =>
        booking.id === id ? { ...booking, status: 'Đã check-out' } : booking
      )
    );
  };

  return (
    <Box sx={{ width: '100%', p: 3 }}>
      <Typography variant='h4' gutterBottom sx={{ mb: 3 }}>
        Bảng điều khiển Lễ tân
      </Typography>

      <Grid
        container
        spacing={3}
        sx={{
          width: '100%',
          margin: 0,
        }}
      >
        {stats.map((stat, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            key={index}
            sx={{
              display: 'flex',
              p: 0,
            }}
          >
            <Card
              sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <CardContent sx={{ flex: 1, p: 3 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: '100%',
                  }}
                >
                  <Box>
                    <Typography
                      color='textSecondary'
                      gutterBottom
                      sx={{ fontSize: '1rem', fontWeight: 500 }}
                    >
                      {stat.title}
                    </Typography>
                    <Typography
                      variant='h5'
                      component='div'
                      sx={{ fontWeight: 600 }}
                    >
                      {stat.value}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      color: stat.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: `${stat.color}15`,
                      borderRadius: '50%',
                      p: 1,
                    }}
                  >
                    {stat.icon}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid
        container
        spacing={3}
        sx={{
          mt: 3,
          width: '100%',
          margin: 0,
        }}
      >
        <Grid item xs={12} sx={{ p: 0 }}>
          <Paper
            sx={{
              width: '100%',
              p: 3,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3,
              }}
            >
              <Typography variant='h6'>Đặt phòng hôm nay</Typography>
              <Button
                variant='contained'
                color='primary'
                sx={{
                  px: 3,
                  py: 1,
                  textTransform: 'none',
                  fontWeight: 500,
                }}
              >
                Thêm đặt phòng
              </Button>
            </Box>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Phòng</TableCell>
                    <TableCell>Khách</TableCell>
                    <TableCell>Check-in</TableCell>
                    <TableCell>Check-out</TableCell>
                    <TableCell>Trạng thái</TableCell>
                    <TableCell align='right'>Thao tác</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell>{booking.room}</TableCell>
                      <TableCell>{booking.customer}</TableCell>
                      <TableCell>{booking.checkIn}</TableCell>
                      <TableCell>{booking.checkOut}</TableCell>
                      <TableCell>
                        <Chip
                          label={booking.status}
                          color={
                            booking.status === 'Đã check-in'
                              ? 'success'
                              : booking.status === 'Chờ check-in'
                              ? 'warning'
                              : 'default'
                          }
                          size='small'
                          sx={{ minWidth: 100 }}
                        />
                      </TableCell>
                      <TableCell align='right'>
                        <Button
                          variant='outlined'
                          size='small'
                          sx={{
                            mr: 1,
                            textTransform: 'none',
                            minWidth: 80,
                          }}
                        >
                          Chi tiết
                        </Button>
                        {booking.status === 'Đã check-in' ? (
                          <Button
                            variant='contained'
                            size='small'
                            color='secondary'
                            onClick={() => handleCheckOut(booking.id)}
                            sx={{
                              textTransform: 'none',
                              minWidth: 80,
                            }}
                          >
                            Check-out
                          </Button>
                        ) : booking.status === 'Chờ check-in' ? (
                          <Button
                            variant='contained'
                            size='small'
                            color='primary'
                            onClick={() => handleCheckIn(booking.id)}
                            sx={{
                              textTransform: 'none',
                              minWidth: 80,
                            }}
                          >
                            Check-in
                          </Button>
                        ) : null}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReceptionistDashboard;
