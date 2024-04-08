import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { getAllHeading } from '../api/HeadingThunk';
import { selectAllHeading } from '../model/HeadingSlice';
import { Link } from 'react-router-dom';

export const HeadingAdmin = () => {
  const headings = useAppSelector(selectAllHeading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllHeading());
  }, [dispatch]);

  console.log(headings);

  return (
    <div>
      {
        headings.map((heading) => (
          <Link key={heading._id} to={heading.location}>
            <h2>{heading.title}</h2>
          </Link>
        ))
      }
    </div>
  );
};
