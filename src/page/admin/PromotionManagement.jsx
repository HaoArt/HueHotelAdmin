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
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const PromotionManagement = () => {
  const [open, setOpen] = useState(false);
  const [promotions, setPromotions] = useState([
    {
      id: 1,
      name: 'Khuyến mãi mùa hè',
      code: 'SUMMER2024',
      discount: '20%',
      startDate: '2024-06-01',
      endDate: '2024-08-31',
      status: 'Đang áp dụng',
    },
    {
      id: 2,
      name: 'Ưu đãi cuối tuần',
      code: 'WEEKEND',
      discount: '15%',
      startDate: '2024-02-01',
      endDate: '2024-12-31',
      status: 'Đang áp dụng',
    },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    code: '',
    discount: '',
    startDate: null,
    endDate: null,
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({
      name: '',
      code: '',
      discount: '',
      startDate: null,
      endDate: null,
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (field) => (date) => {
    setFormData({
      ...formData,
      [field]: date,
    });
  };

  const handleSubmit = () => {
    // TODO: Gọi API thêm ưu đãi
    const newPromotion = {
      id: promotions.length + 1,
      ...formData,
      startDate: formData.startDate.format('YYYY-MM-DD'),
      endDate: formData.endDate.format('YYYY-MM-DD'),
      status: 'Đang áp dụng',
    };
    setPromotions([...promotions, newPromotion]);
    handleClose();
  };

  const handleEdit = (promotion) => {
    setFormData({
      ...promotion,
      startDate: dayjs(promotion.startDate),
      endDate: dayjs(promotion.endDate),
    });
    setOpen(true);
  };

  const handleDelete = (id) => {
    // TODO: Gọi API xóa ưu đãi
    setPromotions(promotions.filter((promotion) => promotion.id !== id));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant='h4'>Quản lý ưu đãi</Typography>
        <Button
          variant='contained'
          startIcon={<AddIcon />}
          onClick={handleOpen}
        >
          Thêm ưu đãi
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tên ưu đãi</TableCell>
              <TableCell>Mã</TableCell>
              <TableCell>Giảm giá</TableCell>
              <TableCell>Ngày bắt đầu</TableCell>
              <TableCell>Ngày kết thúc</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {promotions.map((promotion) => (
              <TableRow key={promotion.id}>
                <TableCell>{promotion.name}</TableCell>
                <TableCell>{promotion.code}</TableCell>
                <TableCell>{promotion.discount}</TableCell>
                <TableCell>{promotion.startDate}</TableCell>
                <TableCell>{promotion.endDate}</TableCell>
                <TableCell>{promotion.status}</TableCell>
                <TableCell>
                  <IconButton
                    color='primary'
                    onClick={() => handleEdit(promotion)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color='error'
                    onClick={() => handleDelete(promotion.id)}
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
        <DialogTitle>
          {formData.id ? 'Chỉnh sửa ưu đãi' : 'Thêm ưu đãi mới'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Tên ưu đãi'
                name='name'
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Mã ưu đãi'
                name='code'
                value={formData.code}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Giảm giá'
                name='discount'
                value={formData.discount}
                onChange={handleChange}
                placeholder='VD: 20%'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label='Ngày bắt đầu'
                  value={formData.startDate}
                  onChange={handleDateChange('startDate')}
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label='Ngày kết thúc'
                  value={formData.endDate}
                  onChange={handleDateChange('endDate')}
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleSubmit} variant='contained'>
            {formData.id ? 'Cập nhật' : 'Thêm'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PromotionManagement;
