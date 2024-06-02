import { Box, CircularProgress, Grid, Tooltip, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { selectClientVacancies, selectClientVacancyFetching } from '../model/vacancySlice';
import { useEffect, useState } from 'react';
import { vacancyFetchAll } from '../api/vacancyThunks';
import { VacancyCard } from '../../../../feachers/vacancyCard';
import { VacancyCategory } from '../../../widgets/vacancyCategory';
import { Tune } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';

export const VacancyPageClient = () => {
  const dispatch = useAppDispatch();
  const [showCategory, setShowCategory] = useState(false);
  const vacancies = useAppSelector(selectClientVacancies);
  const vacanciesFetching = useAppSelector(selectClientVacancyFetching);

  useEffect(() => {
    dispatch(vacancyFetchAll());
  }, [dispatch]);

  return (
    <Box sx={{ margin: '10px 0 20px' }}>
      <Box>
        <Tooltip title={'Расширенный поиск'}>
          <IconButton
            sx={{ display: { xs: 'block', md: 'none' } }}
            onClick={() => setShowCategory((prevState) => !prevState)}
          >
            <Tune />
          </IconButton>
        </Tooltip>
      </Box>
      <Box sx={{ display: { xs: 'block', md: 'flex' }, alignItems: 'flex-start' }}>
        <Box
          sx={{
            display: { xs: showCategory ? 'block' : 'none', md: 'block' },
            margin: 0,
            width: { sm: showCategory ? '100%' : '300px', md: '400px', lg: '500px' },
          }}
        >
          <VacancyCategory toggleCategory={setShowCategory} />
        </Box>
        <Grid container spacing={2}>
          {vacanciesFetching ? (
            <CircularProgress />
          ) : vacancies.length > 0 ? (
            vacancies.map((vacancy) => (
              <Grid item key={vacancy._id} xs={12} sm={6}>
                <VacancyCard
                  data={{
                    city: vacancy.city,
                    vacancyTitle: vacancy.vacancyTitle,
                    _id: vacancy._id,
                    salary: {
                      minSalary: parseFloat(vacancy.salary.minSalary),
                      maxSalary: parseFloat(vacancy.salary.maxSalary),
                    },
                    company: vacancy.employer.companyName,
                    logo: vacancy.employer.logo,
                  }}
                  visible={true}
                />
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography>No Vacancy</Typography>
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
};
