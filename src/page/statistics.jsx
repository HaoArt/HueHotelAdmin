import { useState } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { FileDownload as FileDownloadIcon } from '@mui/icons-material';

const Statistics = () => {
  const [timeRange, setTimeRange] = useState('month');

  // Dữ liệu mẫu cho biểu đồ
  const revenueData = [
    { name: '01/03', revenue: 15000000 },
    { name: '02/03', revenue: 18000000 },
    { name: '03/03', revenue: 12000000 },
    { name: '04/03', revenue: 21000000 },
    { name: '05/03', revenue: 25000000 },
    { name: '06/03', revenue: 28000000 },
    { name: '07/03', revenue: 30000000 },
  ];

  // Dữ liệu mẫu cho danh sách hóa đơn
  const invoices = [
    {
      id: 'HD001',
      date: '07/03/2024',
      customer: 'Nguyễn Văn A',
      room: 'Gia đình 101',
      amount: 2500000,
      status: 'Đã thanh toán',
    },
    {
      id: 'HD002',
      date: '07/03/2024',
      customer: 'Trần Thị B',
      room: 'Đôi 201',
      amount: 3500000,
      status: 'Chờ thanh toán',
    },
    {
      id: 'HD003',
      date: '06/03/2024',
      customer: 'Lê Văn C',
      room: '3 người 301',
      amount: 1800000,
      status: 'Đã thanh toán',
    },
  ];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value);
  };

  const handleExportReport = () => {
    // Tạo dữ liệu để xuất
    const reportData = {
      timeRange,
      revenue: {
        data: revenueData,
        total: revenueData.reduce((sum, item) => sum + item.revenue, 0),
      },
      invoices: invoices.map((invoice) => ({
        ...invoice,
        amount: formatCurrency(invoice.amount),
      })),
    };

    // Tạo tên file với timestamp
    const timestamp = new Date().toISOString().split('T')[0];
    const fileName = `bao-cao-doanh-thu-${timestamp}.json`;

    // Tạo và tải file
    const jsonString = JSON.stringify(reportData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;

    // Trigger download
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <Box sx={{ width: '100%', p: 3 }}>
      <Typography variant='h4' gutterBottom sx={{ mb: 3 }}>
        Thống kê
      </Typography>

      <Grid container spacing={3} sx={{ width: '100%', margin: 0 }}>
        <Grid item xs={12} sx={{ p: 0 }}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3,
              }}
            >
              <Typography variant='h6'>Thống kê doanh thu</Typography>
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel>Thời gian</InputLabel>
                <Select
                  value={timeRange}
                  label='Thời gian'
                  onChange={(e) => setTimeRange(e.target.value)}
                  size='small'
                >
                  <MenuItem value='week'>7 ngày qua</MenuItem>
                  <MenuItem value='month'>Tháng này</MenuItem>
                  <MenuItem value='quarter'>Quý này</MenuItem>
                  <MenuItem value='year'>Năm nay</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ width: '100%', height: 400 }}>
              <ResponsiveContainer>
                <LineChart
                  data={revenueData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='name' />
                  <YAxis
                    tickFormatter={(value) =>
                      new Intl.NumberFormat('vi-VN', {
                        notation: 'compact',
                        compactDisplay: 'short',
                      }).format(value)
                    }
                  />
                  <Tooltip
                    formatter={(value) => formatCurrency(value)}
                    labelFormatter={(label) => `Ngày: ${label}`}
                  />
                  <Legend />
                  <Line
                    type='monotone'
                    dataKey='revenue'
                    name='Doanh thu'
                    stroke='#1976d2'
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} sx={{ p: 0 }}>
          <Paper sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3,
              }}
            >
              <Typography variant='h6'>Danh sách hóa đơn</Typography>
              <Button
                variant='contained'
                onClick={handleExportReport}
                startIcon={<FileDownloadIcon />}
                sx={{
                  px: 3,
                  py: 1,
                  textTransform: 'none',
                  fontWeight: 500,
                }}
              >
                Xuất báo cáo
              </Button>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Mã hóa đơn</TableCell>
                    <TableCell>Ngày</TableCell>
                    <TableCell>Khách hàng</TableCell>
                    <TableCell>Phòng</TableCell>
                    <TableCell>Số tiền</TableCell>
                    <TableCell>Trạng thái</TableCell>
                    <TableCell align='right'>Thao tác</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell>{invoice.id}</TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell>{invoice.customer}</TableCell>
                      <TableCell>{invoice.room}</TableCell>
                      <TableCell>{formatCurrency(invoice.amount)}</TableCell>
                      <TableCell>
                        <Chip
                          label={invoice.status}
                          color={
                            invoice.status === 'Đã thanh toán'
                              ? 'success'
                              : 'warning'
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
                            textTransform: 'none',
                            minWidth: 80,
                          }}
                        >
                          Chi tiết
                        </Button>
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

export default Statistics;
