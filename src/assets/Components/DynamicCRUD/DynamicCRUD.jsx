import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Box, 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  TextField, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Typography, 
  IconButton,
  CircularProgress,
  Snackbar,
  Alert,
  Pagination,
  styled
} from '@mui/material';
import { 
  Add as AddIcon, 
  Edit as EditIcon, 
  Delete as DeleteIcon, 
  Search as SearchIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';

// Styled components for better aesthetics
const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  marginTop: theme.spacing(3),
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
}));

const StyledTableHeaderCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.common.white,
  fontWeight: 'bold',
}));

const ActionButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(0.5),
  textTransform: 'none',
}));

export const DynamicCRUD = ({ 
  endpoint = '', 
  fields = [], 
  title = '',
  pageSize = 5,
  children,
  customData = null // เพิ่ม prop นี้
}) => {
  // State management
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // ใช้ customData ถ้ามีการส่งเข้ามา
      if (customData) {
        setData(Array.isArray(customData) ? customData : []);
        setTotalItems(customData.length || 0);
        setError(null);
        return;
      }
      
      // ถ้าไม่มี customData ให้เรียก API ตามปกติ
      const response = await axios.get(`${endpoint}?q=${searchTerm}&_page=${currentPage}&_limit=${pageSize}`);
      const responseData = Array.isArray(response.data) ? response.data : [];
      setData(responseData);
      setTotalItems(parseInt(response.headers['x-total-count'] || responseData.length, 10));
      setError(null);
    } catch (err) {
      setError(err.message);
      setData([]);
      showSnackbar(`Error fetching data: ${err.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };
  
  // เพิ่ม useEffect เพื่อ watch customData
  useEffect(() => {
    if (customData) {
      fetchData();
    }
  }, [customData, searchTerm, currentPage]);

  // Handle pagination change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Show snackbar notification
  const showSnackbar = (message, severity = 'success') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  // Close snackbar
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Initialize form for new item
  const handleAddNew = () => {
    setCurrentItem(createEmptyItem());
    setIsEditing(false);
    setOpenDialog(true);
  };

  // Initialize form for editing
  const handleEdit = (item) => {
    setCurrentItem({ ...item });
    setIsEditing(true);
    setOpenDialog(true);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentItem(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Submit form (create or update)
  const handleSubmit = async () => {
    try {
      if (isEditing) {
        await axios.put(`${endpoint}/${currentItem.id}`, currentItem);
        showSnackbar('Item updated successfully!');
      } else {
        await axios.post(endpoint, currentItem);
        showSnackbar('Item created successfully!');
      }
      fetchData();
      setOpenDialog(false);
    } catch (err) {
      showSnackbar(`Error: ${err.message}`, 'error');
    }
  };

  // Delete an item
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${endpoint}/${id}`);
      showSnackbar('Item deleted successfully!');
      fetchData();
    } catch (err) {
      showSnackbar(`Error deleting item: ${err.message}`, 'error');
    }
  };

  // Create empty item based on fields configuration
  const createEmptyItem = () => {
    const item = {};
    fields.forEach(field => {
      item[field.name] = field.type === 'number' ? 0 : '';
    });
    return item;
  };

  // Close dialog
  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  // Effect to fetch data when component mounts or search term changes
  useEffect(() => {
    fetchData();
  }, [searchTerm, currentPage]);

  // Calculate total pages
  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
        {title}
      </Typography>
  
      {/* Search and Action Bar */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
            }}
            sx={{ width: 300 }}
          />
          <IconButton onClick={fetchData} color="primary" sx={{ ml: 1 }}>
            <RefreshIcon />
          </IconButton>
        </Box>
        
        {/* แสดง children หรือปุ่ม Add New ตามปกติ */}
        {children || (
          <ActionButton
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAddNew}
          >
            Add New
          </ActionButton>
        )}
      </Box>


      {/* Loading Indicator */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Error Message */}
      {error && (
        <Alert severity="error" sx={{ my: 2 }}>
          {error}
        </Alert>
      )}

      {/* Data Table */}
      {!loading && !error && (
        <>
          <StyledTableContainer component={Paper}>
            <Table>
              <StyledTableHead>
                <TableRow>
                  {fields.map((field) => (
                    <StyledTableHeaderCell key={field.name}>
                      {field.label}
                    </StyledTableHeaderCell>
                  ))}
                  <StyledTableHeaderCell>Actions</StyledTableHeaderCell>
                </TableRow>
              </StyledTableHead>
  
              <TableBody>
  {loading ? (
    <TableRow>
      <TableCell colSpan={(fields || []).length + 1} align="center">
        <CircularProgress />
      </TableCell>
    </TableRow>
  ) : error ? (
    <TableRow>
      <TableCell colSpan={(fields || []).length + 1} align="center">
        <Alert severity="error">{error}</Alert>
      </TableCell>
    </TableRow>
  ) : (data || []).length > 0 ? (
    (data || []).map((item) => (
      <TableRow key={item.id || Math.random()} hover>
        {(fields || []).map((field) => (
          <TableCell key={`${item.id}-${field.name}`}>
            {item[field.name]}
          </TableCell>
        ))}
        <TableCell>
          <IconButton onClick={() => handleEdit(item)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(item.id)}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    ))
  ) : (
    <TableRow>
      <TableCell colSpan={(fields || []).length + 1} align="center">
        No data available
      </TableCell>
    </TableRow>
  )}
</TableBody>
            </Table>
          </StyledTableContainer>

          {/* Pagination */}
          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                shape="rounded"
              />
            </Box>
          )}
        </>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {isEditing ? 'Edit Item' : 'Add New Item'}
        </DialogTitle>
        <DialogContent>
          {currentItem && fields.map((field) => (
            <TextField
              key={field.name}
              margin="normal"
              fullWidth
              label={field.label}
              name={field.name}
              type={field.type || 'text'}
              value={currentItem[field.name] || ''}
              onChange={handleInputChange}
              InputProps={{
                ...(field.type === 'number' ? { inputProps: { min: 0 } } : {}),
              }}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            {isEditing ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default DynamicCRUD;