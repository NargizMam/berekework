import { Box, Button, ButtonGroup, Grid, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import Container from '@mui/material/Container';
import { useEffect } from 'react';
import { fetchAllPages } from '../api/adminPageThunks';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { selectPageFetchingAll, selectPages } from '../model/adminPageSlice';

export const AdminAllPages = () => {
  const dispatch = useAppDispatch();
  const pages = useAppSelector(selectPages);
  const fetchAllPagesLoading = useAppSelector(selectPageFetchingAll);

  useEffect(() => {
    dispatch(fetchAllPages());
  }, [dispatch]);

  const onDeletePage = (pageId: string) => {
    console.log(pageId);
  };

  const onEditPage = (pageId: string) => {
    console.log(pageId);
  };

  return (
    <Container style={{ position: 'relative' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', margin: '15px 0' }}>
        {fetchAllPagesLoading && pages.length < 0 ? (
          <Typography variant={'h4'} sx={{ fontWeight: 'bold' }}>
            Страницы еще не созданы
          </Typography>
        ) : (
          <Typography variant={'h4'} sx={{ fontWeight: 'bold' }}>
            Все страницы
          </Typography>
        )}
        <Button variant="contained" component={NavLink} to="new-page">
          Create Page
        </Button>
      </Box>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {pages.map((page) => (
          <Grid
            item
            xs={12}
            key={page._id}
            sx={{
              border: '1px solid black',
              padding: 2,
              borderRadius: '14px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '10px',
            }}
          >
            <Typography>{page.name}</Typography>
            <ButtonGroup variant="outlined">
              <Button onClick={() => onEditPage(page._id)}>Edit</Button>
              <Button onClick={() => onDeletePage(page._id)}>Delete</Button>
            </ButtonGroup>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
