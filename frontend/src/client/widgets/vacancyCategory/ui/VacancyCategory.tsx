import { Box, Checkbox, FormControlLabel, FormGroup, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

interface VacancyCategory {
  id: string;
  title: string;
  values: { id: string; value: string }[];
  name: string;
  value: string;
  input: {
    isInput: boolean;
    placeholder: string;
  };
}

const vacancyCategories: VacancyCategory[] = [
  {
    id: Math.random().toString(),
    title: 'Уровень дохода',
    values: [
      { id: Math.random().toString(), value: 'от 1300 сом' },
      { id: Math.random().toString(), value: 'от 17700 сом' },
      { id: Math.random().toString(), value: 'от 34200 сом' },
      { id: Math.random().toString(), value: 'от 50150 сом' },
      { id: Math.random().toString(), value: 'от 67000 сом' },
      { id: Math.random().toString(), value: 'от 83450 сом' },
    ],
    name: 'salary',
    value: 'salary',
    input: {
      isInput: true,
      placeholder: 'от',
    },
  },
  {
    id: Math.random().toString(),
    title: 'Уровень дохода',
    values: [
      { id: Math.random().toString(), value: 'от 1300 сом' },
      { id: Math.random().toString(), value: 'от 17700 сом' },
      { id: Math.random().toString(), value: 'от 34200 сом' },
      { id: Math.random().toString(), value: 'от 50150 сом' },
      { id: Math.random().toString(), value: 'от 67000 сом' },
      { id: Math.random().toString(), value: 'от 83450 сом' },
    ],
    name: 'salary2',
    value: 'salary2',
    input: {
      isInput: true,
      placeholder: 'от',
    },
  },
];

export const VacancyCategory = () => {
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: string }>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, name: string, value: string) => {
    setCheckedItems({ ...checkedItems, [name]: value });
    console.log(event.target);
  };

  return (
    <Box sx={{ border: '1px solid red' }}>
      <Grid container direction="column">
        {vacancyCategories.map((category) => (
          <Grid item key={category.id}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {category.title}
            </Typography>
            <FormGroup sx={{ padding: 1 }}>
              {category.values.map((item) => (
                <FormControlLabel
                  key={item.id}
                  control={<Checkbox checked={checkedItems[category.name] === item.value} />}
                  label={item.value}
                  onChange={(event) =>
                    handleChange(event as React.ChangeEvent<HTMLInputElement>, category.name, item.value)
                  }
                />
              ))}
              {category.input.isInput && (
                <>
                  <FormControlLabel control={<Checkbox color="primary" />} label={'Ваш вариант'} />
                  <TextField placeholder={category.input.placeholder} />
                </>
              )}
            </FormGroup>
          </Grid>
        ))}
        <Grid item>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Уровень запрлаты
          </Typography>
          <FormGroup sx={{ padding: 1 }}>
            <FormControlLabel control={<Checkbox />} label="Required" />
          </FormGroup>
        </Grid>
      </Grid>
    </Box>
  );
};
