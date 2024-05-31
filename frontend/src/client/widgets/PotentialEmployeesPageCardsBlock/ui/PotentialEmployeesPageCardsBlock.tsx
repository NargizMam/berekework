import PotentialEmployeesPageCard from './PotentialEmployeesPageCard';
import './PotentialEmployeesPageCardsBlock.css';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { selectUsers, selectUsersLoading } from '../../../../admin/page/usersPanel/model/usersSlice';
import { useEffect } from 'react';
import { getAllUser } from '../../../../admin/page/usersPanel/api/usersThunk';
import { Loader } from '../../../../shared/loader';

export interface PotentialEmployeesCardsBlockTitleApiData {
  primary: {
    titletext: string;
  };
}

interface Props {
  slice: PotentialEmployeesCardsBlockTitleApiData;
}

const PotentialEmployeesPageCardsBlock: React.FC<Props> = ({ slice }) => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsers);
  const isLoading = useAppSelector(selectUsersLoading);

	useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);
	
	console.log('users', users);

  if (isLoading) {
    return (
      <div className="PotentialEmployeesPageCardsBlock__container">
        <Loader />;
      </div>
    );
  }

  return (
    <div className="PotentialEmployeesPageCardsBlock__container">
      <h2 className="PotentialEmployeesPageCardsBlock__title">{slice.primary.titletext}</h2>
      {users.length === 0 ? (
        <p className="PotentialEmployeesPageCardsBlock__subtitle-no-cards">Нет сотрудников для отображения</p>
      ) : (
        <div className="PotentialEmployeesPageCardsBlock__cards">
          {users.map((user) => (
            <PotentialEmployeesPageCard key={user._id} data={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PotentialEmployeesPageCardsBlock;
