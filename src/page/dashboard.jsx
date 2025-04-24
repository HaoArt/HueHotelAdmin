import { Box, Grid, Paper, Typography, Card, CardContent } from '@mui/material';
import {
  People as PeopleIcon,
  Hotel as HotelIcon,
  AttachMoney as MoneyIcon,
  Event as EventIcon,
} from '@mui/icons-material';

const Dashboard = () => {
  const stats = [
    {
      title: 'Tổng số khách',
      value: '150',
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
      color: '#1976d2',
    },
    {
      title: 'Phòng trống',
      value: '6',
      icon: <HotelIcon sx={{ fontSize: 40 }} />,
      color: '#2e7d32',
    },
    {
      title: 'Doanh thu tháng',
      value: '50,000,000 VND',
      icon: <MoneyIcon sx={{ fontSize: 40 }} />,
      color: '#ed6c02',
    },
    {
      title: 'Đặt phòng hôm nay',
      value: '12',
      icon: <EventIcon sx={{ fontSize: 40 }} />,
      color: '#9c27b0',
    },
  ];

  return (
    <Box sx={{ width: '100%', p: 3 }}>
      <Typography variant='h4' gutterBottom sx={{ mb: 3 }}>
        Tổng quan
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
        <Grid item xs={12} md={6} sx={{ p: 0 }}>
          <Paper
            sx={{
              p: 3,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography variant='h6' gutterBottom>
              Đặt phòng gần đây
            </Typography>
            {/* TODO: Thêm danh sách đặt phòng gần đây */}
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} sx={{ p: 0 }}>
          <Paper
            sx={{
              p: 3,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography variant='h6' gutterBottom>
              Thống kê doanh thu
            </Typography>
            {/* TODO: Thêm biểu đồ doanh thu */}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
