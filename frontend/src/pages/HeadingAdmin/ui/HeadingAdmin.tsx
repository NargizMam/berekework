import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { deleteHeading, getAllHeading } from '../api/HeadingThunk';
import { selectAllHeading } from '../model/HeadingSlice';
import { Link } from 'react-router-dom';
import HeadingForm from './HeadingForm';

export const HeadingAdmin = () => {
  const headings = useAppSelector(selectAllHeading);
  const dispatch = useAppDispatch();
  const [change, setChange] = useState(false);

  useEffect(() => {
    dispatch(getAllHeading());
  }, [dispatch]);

  const deleteHandle = async (id: string) => {
    await dispatch(deleteHeading(id)).unwrap();
    await dispatch(getAllHeading());
  };

  return (
    <div>
      {
        headings.map((heading) => (
          <>
            <Link key={heading._id} to={heading.location}>
              <h2>{heading.title}</h2>
            </Link>
            <button onClick={() => deleteHandle(heading._id)}>delete</button>
          </>
        ))
      }
      <button onClick={() => setChange(!change)}>add</button>
      {
        change ?
          <HeadingForm/>
          :
          null
      }
    </div>
  );
};
