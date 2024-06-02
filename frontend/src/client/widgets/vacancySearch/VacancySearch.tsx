import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';

interface SearchQuery {
  searchQuery: string;
}

const initialState: SearchQuery = {
  searchQuery: '',
};

interface Props {
  onSearch: (searchQuery: string) => void;
}

const VacancySearch: React.FC<Props> = ({ onSearch }) => {
  const [state, setState] = useState<SearchQuery>(initialState);

  const submitFormHandler = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(state.searchQuery);
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Box component="form" onSubmit={submitFormHandler} display="flex" alignItems="center" gap={2}>
      <TextField
        label="Search by company or profession"
        variant="outlined"
        name="searchQuery"
        value={state.searchQuery}
        onChange={inputChangeHandler}
      />
      <Button variant="contained" color="primary" type="submit">
        Search
      </Button>
    </Box>
  );
};

export default VacancySearch;
