import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { vacancyFetchCategory, vacancyGetByCategory } from '../../../../feachers/vacancy/vacancyThunk';
import {
  selectClientVacancyCategory,
  selectClientVacancyCategoryFetching,
} from '../../../../feachers/vacancy/vacancySlice';

interface Props {
  toggleCategory: (show: boolean) => void;
}

export const VacancyCategory: React.FC<Props> = ({ toggleCategory }) => {
  const dispatch = useAppDispatch();
  const fetchCategoryLoading = useAppSelector(selectClientVacancyCategoryFetching);
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

  const combineItems = async () => {
    const combined: { [key: string]: string } = {};

    Object.entries(checkedItems).forEach(([name, value]) => {
      if (value === 'custom') {
        combined[name] = customValues[name];
      } else if (value) {
        combined[name] = value;
      }
    });

    await dispatch(vacancyGetByCategory(combined));
    toggleCategory(false);
  };

  return (
    <Box sx={{ marginBottom: { xs: '20px', md: '0' } }}>
      <Grid container direction="column">
        {fetchCategoryLoading ? (
          <CircularProgress />
        ) : (
          categoriesGet.map((category) => (
            <Grid item key={category.id}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {category.title}
              </Typography>
              <FormGroup sx={{ padding: 1 }} key={`form-group-${category.id}`}>
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
                      key={`custom-checkbox-${category.name}`}
                      control={<Checkbox color="primary" checked={checkedItems[category.name] === 'custom'} />}
                      label={'Ваш вариант'}
                      onChange={(event) =>
                        handleCustomChange(event as React.ChangeEvent<HTMLInputElement>, category.name)
                      }
                    />
                    <TextField
                      key={`custom-input-${category.name}`}
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
          ))
        )}
      </Grid>
      <Button
        onClick={() => combineItems()}
        sx={{
          backgroundColor: '#FFE585',
          color: 'black',
          borderRadius: '40px',
          padding: { xs: '10px 20px', md: '15px 30px' },
          fontSize: { xs: '14px', md: '16px' },
        }}
        variant="contained"
      >
        Оправить
      </Button>
    </Box>
  );
};
