/* eslint-disable no-unused-vars */
import { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Add as AddIcon } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { Routes, Route, Navigate } from 'react-router-dom';
import RoomManagement from './admin/RoomManagement';
import PromotionManagement from './admin/PromotionManagement';
import UserManagement from './admin/UserManagement';

// TabPanel component
function TabPanel({ children, value, index, ...other }) {
  return (
    <div role='tabpanel' hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

// AddUserDialog Component
const AddUserDialog = ({ open, onClose, onUserAdded }) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      username: '',
      password: '',
      fullName: '',
      email: '',
      phone: '',
      role: 'customer',
    },
  });

  const roles = [
    { value: 'accountant', label: 'Kế toán' },
    { value: 'receptionist', label: 'Lễ tân' },
  ];

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      // API call sẽ được thêm sau
      onUserAdded(data);
      handleClose();
    } catch (err) {
      setError('Có lỗi xảy ra khi tạo người dùng');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    reset();
    setError('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth='sm' fullWidth>
      <DialogTitle>Thêm người dùng mới</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          {error && (
            <Alert severity='error' sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box sx={{ display: 'grid', gap: 2 }}>
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
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button type='submit' variant='contained' disabled={loading}>
            {loading ? 'Đang xử lý...' : 'Thêm người dùng'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

// Main Admin Component
const Admin = () => {
  const [tabValue, setTabValue] = useState(0);
  const [users, setUsers] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const userColumns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'username', headerName: 'Tên đăng nhập', width: 130 },
    { field: 'fullName', headerName: 'Họ tên', width: 180 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'phone', headerName: 'Số điện thoại', width: 130 },
    { field: 'role', headerName: 'Vai trò', width: 130 },
    {
      field: 'actions',
      headerName: 'Thao tác',
      width: 200,
      renderCell: (params) => (
        <Box>
          <Button color='primary' size='small'>
            Sửa
          </Button>
          <Button color='error' size='small'>
            Xóa
          </Button>
        </Box>
      ),
    },
  ];

  const handleAddUser = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, { ...newUser, id: Date.now() }]);
  };

  return (
    <Routes>
      <Route index element={<Navigate to='users' replace />} />
      <Route path='users' element={<UserManagement />} />
      <Route path='rooms' element={<RoomManagement />} />
      <Route path='promotions' element={<PromotionManagement />} />
    </Routes>
  );
};

export default Admin;
