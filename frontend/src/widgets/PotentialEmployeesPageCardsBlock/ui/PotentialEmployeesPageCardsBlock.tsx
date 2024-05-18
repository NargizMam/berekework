import PotentialEmployeesPageCard from './PotentialEmployeesPageCard';
import './PotentialEmployeesPageCardsBlock.css';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { selectUsers, selectUsersLoading } from '../../../admin/page/usersPanel/model/usersSlice';
import { useEffect } from 'react';
import { getAllUser } from '../../../admin/page/usersPanel/api/usersThunk';
import { Loader } from '../../../shared/loader';

const PotentialEmployeesPageCardsBlock = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsers);
  const isLoading = useAppSelector(selectUsersLoading);

  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="PotentialEmployeesPageCardsBlock__container">
        <Loader />;
      </div>
    );
  }

  return (
    <div className="PotentialEmployeesPageCardsBlock__container">
      <h2 className="PotentialEmployeesPageCardsBlock__title">Сотрудники</h2>
      <div className="PotentialEmployeesPageCardsBlock__cards">
        {users.map((user) => (
          <PotentialEmployeesPageCard key={user._id} data={user} />
        ))}
      </div>
    </div>
  );
};

export default PotentialEmployeesPageCardsBlock;
