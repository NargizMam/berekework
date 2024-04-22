import React from 'react';
import { createHeadingDraft } from '../../HeadingAdmin/api/HeadingThunk';
import { useAppDispatch } from '../../../app/store/hooks';

const TariffAdmin = () => {
  const dispatch = useAppDispatch();

  const createTariffDraftHandle = async () => {
    await dispatch(createHeadingDraft());
  };

  return (
    <div>
      <button onClick={createTariffDraftHandle}>add</button>
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
    </div>
  );
};

export default TariffAdmin;