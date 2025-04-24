import { useState } from 'react';
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
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Divider,
} from '@mui/material';
import {
  AttachMoney as MoneyIcon,
  AccountBalance as AccountIcon,
  Receipt as ReceiptIcon,
  TrendingUp as TrendingUpIcon,
  Print as PrintIcon,
  Download as DownloadIcon,
} from '@mui/icons-material';

const AccountantDashboard = () => {
  const [openInvoice, setOpenInvoice] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const stats = [
    {
      title: 'Doanh thu tháng',
      value: '150,000,000 VND',
      icon: <MoneyIcon sx={{ fontSize: 40 }} />,
      color: '#1976d2',
    },
    {
      title: 'Chi phí tháng',
      value: '50,000,000 VND',
      icon: <AccountIcon sx={{ fontSize: 40 }} />,
      color: '#d32f2f',
    },
    {
      title: 'Lợi nhuận tháng',
      value: '100,000,000 VND',
      icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
      color: '#2e7d32',
    },
    {
      title: 'Hóa đơn chờ xử lý',
      value: '15',
      icon: <ReceiptIcon sx={{ fontSize: 40 }} />,
      color: '#ed6c02',
    },
  ];

  const recentTransactions = [
    {
      id: 1,
      date: '2024-02-20',
      description: 'Thanh toán phòng Gia đình 101',
      amount: '700,000 VND',
      type: 'Thu',
      status: 'Đã thanh toán',
    },
    {
      id: 2,
      date: '2024-02-19',
      description: 'Chi phí bảo trì',
      amount: '500,000 VND',
      type: 'Chi',
      status: 'Đã thanh toán',
    },
    {
      id: 3,
      date: '2024-02-18',
      description: 'Thanh toán phòng Đôi 103',
      amount: '400,000 VND',
      type: 'Thu',
      status: 'Chờ thanh toán',
    },
  ];

  const expenses = [
    {
      id: 'CT001',
      date: '07/03/2024',
      category: 'Tiền lương',
      description: 'Lương nhân viên tháng 3',
      amount: 25000000,
      status: 'Đã thanh toán',
    },
    {
      id: 'CT002',
      date: '07/03/2024',
      category: 'Tiện ích',
      description: 'Hóa đơn điện nước tháng 3',
      amount: 3500000,
      status: 'Chờ thanh toán',
    },
    {
      id: 'CT003',
      date: '06/03/2024',
      category: 'Bảo trì',
      description: 'Sửa chữa hệ thống điều hòa',
      amount: 1800000,
      status: 'Đã thanh toán',
    },
  ];

  const handleOpenInvoice = (transaction) => {
    setSelectedBooking(transaction);
    setOpenInvoice(true);
  };

  const handleCloseInvoice = () => {
    setOpenInvoice(false);
    setSelectedBooking(null);
  };

  const handlePrintInvoice = () => {
    // TODO: Xử lý in hóa đơn
    console.log('In hóa đơn:', selectedBooking);
  };

  const handleDownloadInvoice = () => {
    // TODO: Xử lý tải hóa đơn
    console.log('Tải hóa đơn:', selectedBooking);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant='h4' gutterBottom>
        Bảng điều khiển Kế toán
      </Typography>

      {/* Thống kê */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 3,
                },
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Box>
                    <Typography color='textSecondary' gutterBottom>
                      {stat.title}
                    </Typography>
                    <Typography variant='h5' component='div'>
                      {stat.value}
                    </Typography>
                  </Box>
                  <Box sx={{ color: stat.color }}>{stat.icon}</Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Giao dịch gần đây */}
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant='h6'>Giao dịch gần đây</Typography>
          <Button
            variant='outlined'
            startIcon={<DownloadIcon />}
            onClick={() => console.log('Xuất báo cáo')}
          >
            Xuất báo cáo
          </Button>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Ngày</TableCell>
                <TableCell>Mô tả</TableCell>
                <TableCell align='right'>Số tiền</TableCell>
                <TableCell>Loại</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell align='center'>Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentTransactions.map((transaction) => (
                <TableRow
                  key={transaction.id}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    },
                  }}
                >
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell align='right'>{transaction.amount}</TableCell>
                  <TableCell>
                    <Chip
                      label={transaction.type}
                      color={transaction.type === 'Thu' ? 'success' : 'error'}
                      size='small'
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={transaction.status}
                      color={
                        transaction.status === 'Đã thanh toán'
                          ? 'success'
                          : 'warning'
                      }
                      size='small'
                    />
                  </TableCell>
                  <TableCell align='center'>
                    <IconButton
                      color='primary'
                      onClick={() => handleOpenInvoice(transaction)}
                    >
                      <ReceiptIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Dialog xuất hóa đơn */}
      <Dialog
        open={openInvoice}
        onClose={handleCloseInvoice}
        maxWidth='md'
        fullWidth
      >
        <DialogTitle>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant='h6'>Hóa đơn thanh toán</Typography>
            <Box>
              <IconButton onClick={handlePrintInvoice} color='primary'>
                <PrintIcon />
              </IconButton>
              <IconButton onClick={handleDownloadInvoice} color='primary'>
                <DownloadIcon />
              </IconButton>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedBooking && (
            <Box sx={{ p: 2 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant='h6' gutterBottom>
                    Thông tin hóa đơn
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant='subtitle2' color='textSecondary'>
                    Mã hóa đơn
                  </Typography>
                  <Typography variant='body1'>
                    INV-{selectedBooking.id}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant='subtitle2' color='textSecondary'>
                    Ngày lập
                  </Typography>
                  <Typography variant='body1'>
                    {selectedBooking.date}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='subtitle2' color='textSecondary'>
                    Mô tả
                  </Typography>
                  <Typography variant='body1'>
                    {selectedBooking.description}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant='subtitle2' color='textSecondary'>
                    Loại giao dịch
                  </Typography>
                  <Chip
                    label={selectedBooking.type}
                    color={selectedBooking.type === 'Thu' ? 'success' : 'error'}
                    size='small'
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant='subtitle2' color='textSecondary'>
                    Số tiền
                  </Typography>
                  <Typography variant='h6' color='primary'>
                    {selectedBooking.amount}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='subtitle2' color='textSecondary'>
                    Trạng thái
                  </Typography>
                  <Chip
                    label={selectedBooking.status}
                    color={
                      selectedBooking.status === 'Đã thanh toán'
                        ? 'success'
                        : 'warning'
                    }
                    size='small'
                  />
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseInvoice}>Đóng</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AccountantDashboard;
