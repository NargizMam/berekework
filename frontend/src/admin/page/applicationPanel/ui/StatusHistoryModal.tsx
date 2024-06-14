import React from 'react';
import {
  Box,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import dayjs from 'dayjs';
import { StatusHistory } from '../../../../app/types';

interface StatusHistoryModalProps {
  open: boolean;
  handleClose: () => void;
  history: StatusHistory[];
}

const StatusHistoryModal: React.FC<StatusHistoryModalProps> = ({ open, handleClose, history }) => {
  const getRoleName = (role: 'employer' | 'user') => {
    if (role === 'employer') return 'Работодатель';
    if (role === 'user') return 'Кандидат';
    return role;
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -40%)',
          width: '80%',
          maxWidth: 600,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 1,
        }}
      >
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Статус</TableCell>
                <TableCell>Действие</TableCell>
                <TableCell>Дата</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {history.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell>{entry.status}</TableCell>
                  <TableCell>{getRoleName(entry.changedBy)}</TableCell>
                  <TableCell>{dayjs(entry.changedAt).format('DD MMMM YYYY HH:mm')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Modal>
  );
};

export default StatusHistoryModal;
