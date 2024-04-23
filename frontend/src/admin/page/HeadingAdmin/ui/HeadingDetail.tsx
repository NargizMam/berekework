import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { selectSingleHeading } from '../model/HeadingSlice';
import { getSingleHeading } from '../api/HeadingThunk';
import { useParams } from 'react-router-dom';
import { API_URL } from '../../../../app/constants/links';

export const HeadingDetail = () => {
  const heading = useAppSelector(selectSingleHeading);
  const {location} = useParams() as { location: string };
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSingleHeading(location));
  }, [dispatch, location]);

  if (!heading) {
    return null;
  }

  return (
    <div>
      <h2>{heading.title.element}</h2>
      {
        heading.image ?
          <img src={API_URL + '/' +heading.image} alt="image"/>
          :
          null
      }
      <p>{heading.description}</p>
    </div>
  );
};