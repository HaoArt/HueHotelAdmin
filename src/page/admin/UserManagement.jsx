import { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';

const UserManagement = () => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [users, setUsers] = useState([
    {
      id: 1,
      username: 'admin',
      fullName: 'Admin',
      email: 'admin@example.com',
      phone: '0123456789',
      role: 'admin',
    },
    {
      id: 2,
      username: 'receptionist',
      fullName: 'Lễ tân',
      email: 'receptionist@example.com',
      phone: '0987654321',
      role: 'receptionist',
    },
  ]);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      username: '',
      password: '',
      fullName: '',
      email: '',
      phone: '',
      role: 'receptionist',
    },
  });

  const roles = [
    { value: 'admin', label: 'Quản trị viên' },
    { value: 'accountant', label: 'Kế toán' },
    { value: 'receptionist', label: 'Lễ tân' },
  ];

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    reset();
    setError('');
  };

  const onSubmit = async (data) => {
    try {
      // TODO: Gọi API thêm người dùng
      const newUser = {
        id: users.length + 1,
        ...data,
      };
      setUsers([...users, newUser]);
      handleClose();
    } catch (err) {
      setError('Có lỗi xảy ra khi tạo người dùng');
    }
  };

  const handleEdit = (user) => {
    reset(user);
    setOpen(true);
  };

  const handleDelete = (id) => {
    // TODO: Gọi API xóa người dùng
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant='h4'>Quản lý người dùng</Typography>
        <Button
          variant='contained'
          startIcon={<AddIcon />}
          onClick={handleOpen}
        >
          Thêm người dùng
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tên đăng nhập</TableCell>
              <TableCell>Họ tên</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Số điện thoại</TableCell>
              <TableCell>Vai trò</TableCell>
              <TableCell>Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.fullName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>
                  {roles.find((role) => role.value === user.role)?.label}
                </TableCell>
                <TableCell>
                  <IconButton color='primary' onClick={() => handleEdit(user)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color='error'
                    onClick={() => handleDelete(user.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth='sm' fullWidth>
        <DialogTitle>Thêm người dùng mới</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            {error && (
              <Alert severity='error' sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Controller
                  name='username'
                  control={control}
                  rules={{ required: 'Tên đăng nhập là bắt buộc' }}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      label='Tên đăng nhập'
                      error={!!error}
                      helperText={error?.message}
                      fullWidth
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name='password'
                  control={control}
                  rules={{ required: 'Mật khẩu là bắt buộc' }}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      type='password'
                      label='Mật khẩu'
                      error={!!error}
                      helperText={error?.message}
                      fullWidth
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name='fullName'
                  control={control}
                  rules={{ required: 'Họ tên là bắt buộc' }}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      label='Họ tên'
                      error={!!error}
                      helperText={error?.message}
                      fullWidth
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name='email'
                  control={control}
                  rules={{ required: 'Email là bắt buộc' }}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      type='email'
                      label='Email'
                      error={!!error}
                      helperText={error?.message}
                      fullWidth
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name='phone'
                  control={control}
                  rules={{ required: 'Số điện thoại là bắt buộc' }}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      label='Số điện thoại'
                      error={!!error}
                      helperText={error?.message}
                      fullWidth
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name='role'
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel>Vai trò</InputLabel>
                      <Select {...field} label='Vai trò'>
                        {roles.map((role) => (
                          <MenuItem key={role.value} value={role.value}>
                            {role.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Hủy</Button>
            <Button type='submit' variant='contained'>
              Thêm người dùng
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default UserManagement;
