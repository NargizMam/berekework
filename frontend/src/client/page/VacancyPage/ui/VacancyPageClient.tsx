import { Box, CircularProgress, Grid, Tooltip, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { selectClientVacancies, selectClientVacancyFetching } from '../model/vacancySlice';
import { useEffect, useState } from 'react';
import { vacancyFetchAll } from '../api/vacancyThunks';
import { VacancyCard } from '../../../../feachers/vacancyCard';
import { VacancyCategory } from '../../../widgets/vacancyCategory';
import { Tune } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import VacancySearch from '../../../widgets/vacancySearch/VacancySearch';
import { selectVacanciesLoading } from '../../../../feachers/vacancy/vacancySlice';
import { getAllVacancy } from '../../../../feachers/vacancy/vacancyThunk';

export const VacancyPageClient = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectVacanciesLoading);
  const [showCategory, setShowCategory] = useState(false);
  const vacancies = useAppSelector(selectClientVacancies);
  const vacanciesFetching = useAppSelector(selectClientVacancyFetching);

  useEffect(() => {
    dispatch(vacancyFetchAll());
  }, [dispatch]);

  const handleSearch = async (vacancyTitle: string) => {
    await dispatch(getAllVacancy(vacancyTitle));
  };

  return (
    <Box sx={{ margin: '10px 0 20px' }}>
      <Box sx={{ display: { xs: 'flex', md: 'block' }, justifyContent: 'space-between' }}>
        <VacancySearch onSearch={handleSearch} isLoading={isLoading} />
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
            <Grid item xs={12} sx={{ textAlign: 'center', padding: '20px', mt: 3 }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                Вакансий не найдено
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                К сожалению, на основе выбранных вами критериев вакансий в данный момент нет.
              </Typography>
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
};
