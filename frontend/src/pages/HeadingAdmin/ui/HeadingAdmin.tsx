import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { createHeadingDraft, deleteHeading, getAllHeading } from '../api/HeadingThunk';
import { selectAllHeading, selectHeadingFields, selectHeadingLoading } from '../model/HeadingSlice';
import { Link } from 'react-router-dom';
import HeadingForm from './HeadingForm';

export const HeadingAdmin = () => {
  const headings = useAppSelector(selectAllHeading);
  const headingFields = useAppSelector(selectHeadingFields);
  const dispatch = useAppDispatch();
  // const [change, setChange] = useState(false);
  const loading = useAppSelector(selectHeadingLoading);

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

  if (loading && headingFields) {
    return null;
  }

  const obj = {
    title: {
      element: 'Title',
      typeField: 'text'
    },
    image: {
      typeField: 'file'
    }
  };

  // console.log(Object.values(headingFields.title));

  return (
    <div>
      {
        headings.map((heading) => (
          <div key={heading._id}>
            <Link to={heading.location}>
              <h2>{heading.title.element}</h2>
            </Link>
            <button onClick={() => deleteHandle(heading._id)}>delete</button>
          </div>
        ))
      }
      <button onClick={createHeadingDraftHandle}>add</button>
      {
        Object.entries(headingFields || '{}').map(([key, value]) => {
          if(value.typeField) {
            return (
              <div key={key}>
                <input type={value.typeField}/>
              </div>
            );
          }
          return null;
        })
      }
      {/*{*/}
      {/*  change ?*/}
      {/*    <HeadingForm/>*/}
      {/*    :*/}
      {/*    null*/}
      {/*}*/}
    </div>
  );
};
