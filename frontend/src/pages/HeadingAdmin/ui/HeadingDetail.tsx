import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { selectSingleHeading } from '../model/HeadingSlice';
import { getSingleHeading } from '../api/HeadingThunk';
import { useParams } from 'react-router-dom';

// interface HeadingMutation {
//   title: string;
//   description: string;
//   image: File | null;
//   url: string;
// }

export const HeadingDetail = () => {
  const heading = useAppSelector(selectSingleHeading);
  const {location} = useParams() as { location: string };
  // const [state, setState] = useState<HeadingMutation>({
  //   title: '',
  //   description: '',
  //   image: null,
  //   url: '',
  // });
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSingleHeading(location));
  }, [dispatch, location]);

  console.log(heading);

  if (!heading) {
    return null;
  }

  return (
    <div>
      <h2>{heading.title}</h2>
    </div>
  );
};