import { Box, TextField } from '@mui/material';
import React, { FormEvent, useState } from 'react';
import { LoadingButton } from '@mui/lab';

interface Props {
  onSearch: (vacancyTitle: string) => void;
  isLoading: boolean;
}

const VacancySearch: React.FC<Props> = ({ onSearch, isLoading }) => {
  const [vacancyTitle, setVacancyTitle] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSearch(vacancyTitle);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '0 15px',
          margin: '15px 0',
        }}
      >
        <TextField
          fullWidth
          value={vacancyTitle}
          onChange={(event) => setVacancyTitle(event.target.value)}
          autoComplete="off"
          placeholder="Введите название вакансии..."
          InputProps={{
            style: { borderRadius: '30px' },
          }}
        />
        <LoadingButton
          loading={isLoading}
          type="submit"
          variant="contained"
          sx={{ py: 2, backgroundColor: '#FFD700', borderRadius: '30px' }}
        >
          Искать
        </LoadingButton>
      </Box>
    </form>
  );
};

export default VacancySearch;
