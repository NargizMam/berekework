import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { createHeadingDraft, deleteHeading, getAllHeading } from '../api/HeadingThunk';
import { selectAllHeading, selectHeadingFields } from '../model/HeadingSlice';
import { Link } from 'react-router-dom';
import HeadingForm from './HeadingForm';

export const HeadingAdmin = () => {
  const headings = useAppSelector(selectAllHeading);
  const headingFields = useAppSelector(selectHeadingFields);
  const dispatch = useAppDispatch();
  const [change, setChange] = useState(false);

  useEffect(() => {
    dispatch(getAllHeading());
  }, [dispatch]);

  const createHeadingDraftHandle = async () => {
    await dispatch(createHeadingDraft());
  };

  const deleteHandle = async (id: string) => {
    await dispatch(deleteHeading(id)).unwrap();
    await dispatch(getAllHeading());
  };

  console.log(headingFields);

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
      <button onClick={createHeadingDraftHandle}>add</button>
      {
        // Object.keys(headingFields, (field, ))
      }
      {
        change ?
          <HeadingForm/>
          :
          null
      }
    </div>
  );
};
