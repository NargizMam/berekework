import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { selectSingleHeading } from '../model/HeadingSlice';
import { getSingleHeading } from '../api/HeadingThunk';
import { useParams } from 'react-router-dom';
import HeadingForm from './HeadingForm';

export const HeadingDetail = () => {
  const heading = useAppSelector(selectSingleHeading);
  const {location} = useParams() as { location: string };
  const dispatch = useAppDispatch();
  const [change, setChange] = useState(false);

  useEffect(() => {
    dispatch(getSingleHeading(location));
  }, [dispatch, location]);

  const changeHandle = () => {
    setChange(prevState => !prevState);
  };

  if (!heading) {
    return null;
  }

  return (
    <div>
      <h2>{heading.title}</h2>
      <button onClick={changeHandle}>change</button>
      {
        change ?
          <HeadingForm location={location} id={heading._id} heading={heading}/>
          :
          null
      }
    </div>
  );
};