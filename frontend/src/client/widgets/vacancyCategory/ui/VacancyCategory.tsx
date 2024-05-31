import React, { useEffect, useState } from 'react';
import { Box, Button, Checkbox, FormControlLabel, FormGroup, Grid, TextField, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { selectClientVacancyCategory } from '../../../page/VacancyPage/model/vacancySlice';
import { vacancyFetchCategory } from '../../../page/VacancyPage/api/vacancyThunks';

export const VacancyCategory = () => {
  const dispatch = useAppDispatch();
  const categoriesGet = useAppSelector(selectClientVacancyCategory);

  const [checkedItems, setCheckedItems] = useState<{ [key: string]: string }>({});
  const [customValues, setCustomValues] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    dispatch(vacancyFetchCategory());
  }, [dispatch]);

  const handleChange = (name: string, value: string) => {
    if (checkedItems[name] === value) {
      setCheckedItems({ ...checkedItems, [name]: '' });
    } else {
      setCheckedItems({ ...checkedItems, [name]: value });
    }
  };

  const handleCustomChange = (event: React.ChangeEvent<HTMLInputElement>, name: string) => {
    if (event.target.checked) {
      setCheckedItems({ ...checkedItems, [name]: 'custom' });
    } else {
      setCheckedItems({ ...checkedItems, [name]: '' });
    }
  };

  const handleCustomInputChange = (event: React.ChangeEvent<HTMLInputElement>, name: string) => {
    setCustomValues({ ...customValues, [name]: event.target.value });
  };

  const combineItems = () => {
    const combined: { [key: string]: string } = {};

    Object.entries(checkedItems).forEach(([name, value]) => {
      if (value === 'custom') {
        combined[name] = customValues[name];
      } else if (value) {
        combined[name] = value;
      }
    });
    console.log(combined);
  };
  return (
    <Box sx={{ border: '1px solid red' }}>
      <Button onClick={() => combineItems()}>Test</Button>
      <Grid container direction="column">
        {categoriesGet.map((category) => (
          <Grid item key={category.id}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {category.title}
            </Typography>
            <FormGroup sx={{ padding: 1 }}>
              {category.values.map((item) => (
                <FormControlLabel
                  key={item.id}
                  control={<Checkbox checked={checkedItems[category.name] === item.valueSend} />}
                  label={item.value}
                  onChange={() => handleChange(category.name, item.valueSend)}
                />
              ))}
              {category.input?.isInput && (
                <>
                  <FormControlLabel
                    control={<Checkbox color="primary" checked={checkedItems[category.name] === 'custom'} />}
                    label={'Ваш вариант'}
                    onChange={(event) =>
                      handleCustomChange(event as React.ChangeEvent<HTMLInputElement>, category.name)
                    }
                  />
                  <TextField
                    placeholder={category.input.placeholder}
                    value={customValues[category.name] || ''}
                    onChange={(event) =>
                      handleCustomInputChange(event as React.ChangeEvent<HTMLInputElement>, category.name)
                    }
                    disabled={checkedItems[category.name] !== 'custom'}
                  />
                </>
              )}
            </FormGroup>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
