import VacancySearch from '../../widgets/vacancySearch/VacancySearch';
import { getAllVacancy } from '../../../admin/page/vacancyPanel/api/vacancyThunk';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { selectVacanciesLoading } from '../../../admin/page/vacancyPanel/model/vacancySlice';

const VacanciesPage = () => {
  const isLoading = useAppSelector(selectVacanciesLoading);
  const dispatch = useAppDispatch();

  const handleSearch = async (vacancyTitle: string) => {
    await dispatch(getAllVacancy(vacancyTitle));
  };

  return (
    <>
      <VacancySearch onSearch={handleSearch} isLoading={isLoading} />
    </>
  );
};

export default VacanciesPage;
