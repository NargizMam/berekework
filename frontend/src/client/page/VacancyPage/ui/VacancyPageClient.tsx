import { Box, CircularProgress, Grid, Tooltip, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { useEffect, useRef, useState } from 'react';
import { VacancyCard } from '../../../../feachers/vacancyCard';
import { VacancyCategory } from '../../../widgets/vacancyCategory';
import { Tune } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import VacancySearch from '../../../widgets/vacancySearch/VacancySearch';
import {
  selectVacanciesLoading,
  selectVacancyLoading,
  selectVacancyToCards,
} from '../../../../feachers/vacancy/vacancySlice';
import { getAllVacancyByKgOrAbroad, getAllVacancyToCard } from '../../../../feachers/vacancy/vacancyThunk';
import { useLocation } from 'react-router-dom';

export const VacancyPageClient = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const isLoading = useAppSelector(selectVacanciesLoading);
  const [showCategory, setShowCategory] = useState(false);
  const vacancies = useAppSelector(selectVacancyToCards);
  const vacanciesFetching = useAppSelector(selectVacancyLoading);
  const [vacancyFilter, setVacancyFilter] = useState('');

  const upRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (location) {
      if (location?.search === '?Kyrgyzstan') {
        setVacancyFilter('Kyrgyzstan');
      } else if (location?.search === '?abroad') {
        setVacancyFilter('abroad');
      } else {
        dispatch(getAllVacancyToCard());
      }
    }
  }, [location, dispatch]);

  useEffect(() => {
    if (vacancyFilter.length > 0) {
      dispatch(getAllVacancyByKgOrAbroad(vacancyFilter));
    } else {
      dispatch(getAllVacancyToCard());
    }
  }, [dispatch, vacancyFilter]);

  const handleSearch = async (searchTerm: string) => {
    await dispatch(getAllVacancyToCard(searchTerm));
  };

  const scrollUp = () => {
    upRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  return (
    <Box sx={{ margin: '10px 0 20px', position: 'relative' }} id={'up'} ref={upRef}>
      <Box sx={{ display: { xs: 'flex', md: 'block' }, justifyContent: 'space-between' }}>
        <VacancySearch onSearch={handleSearch} isLoading={isLoading} />
        <Tooltip title={'Расширенный поиск'}>
          <IconButton
            sx={{ display: { xs: 'block', md: 'none' }, height: '40px', marginTop: '30px' }}
            onClick={() => setShowCategory((prevState) => !prevState)}
          >
            <Tune sx={{ borderRadius: '50%' }} />
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
          <VacancyCategory toggleCategory={setShowCategory} scrollUp={scrollUp} />
        </Box>
        <Grid container spacing={2}>
          {vacanciesFetching ? (
            <CircularProgress />
          ) : vacancies.length > 0 ? (
            vacancies.map((vacancy) => (
              <Grid item key={vacancy._id} xs={12} md={6}>
                <VacancyCard data={vacancy} visible={true} />
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
