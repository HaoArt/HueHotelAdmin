import { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Avatar,
} from '@mui/material';
import { PhotoCamera as PhotoCameraIcon } from '@mui/icons-material';

const Profile = () => {
  const [profileData, setProfileData] = useState({
    fullName: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    phone: '0123456789',
    address: '123 Đường ABC, Quận XYZ, TP. Hồ Chí Minh',
    position: 'Nhân viên lễ tân',
  });

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Xử lý logic cập nhật thông tin
    console.log('Profile data:', profileData);
  };

  return (
    <Container maxWidth='md'>
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant='h4' gutterBottom>
          Thông tin cá nhân
        </Typography>
        <Paper sx={{ p: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
              <Avatar
                sx={{
                  width: 150,
                  height: 150,
                  margin: '0 auto',
                  mb: 2,
                }}
              />
              <Button
                variant='outlined'
                startIcon={<PhotoCameraIcon />}
                sx={{ mt: 2 }}
              >
                Thay đổi ảnh
              </Button>
            </Grid>
            <Grid item xs={12} md={8}>
              <Box component='form' onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label='Họ và tên'
                      name='fullName'
                      value={profileData.fullName}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label='Email'
                      name='email'
                      type='email'
                      value={profileData.email}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label='Số điện thoại'
                      name='phone'
                      value={profileData.phone}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label='Địa chỉ'
                      name='address'
                      value={profileData.address}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label='Chức vụ'
                      name='position'
                      value={profileData.position}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type='submit'
                      variant='contained'
                      color='primary'
                      sx={{ mt: 2 }}
                    >
                      Cập nhật thông tin
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default Profile;
