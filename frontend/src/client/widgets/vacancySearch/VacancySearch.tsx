import { Box, TextField } from '@mui/material';
import React, { FormEvent, useState } from 'react';
import { LoadingButton } from '@mui/lab';

interface Props {
  onSearch: (searchTerm: string) => void;
  isLoading: boolean;
}

const VacancySearch: React.FC<Props> = ({ onSearch, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '0 15px',
          margin: '15px 0',
          mt: '24px',
          mb: '24px',
        }}
      >
        <TextField
          fullWidth
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          autoComplete="off"
          placeholder="Профессия, должность или компания"
          label="Поиск вакансий"
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
