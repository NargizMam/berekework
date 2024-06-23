import React, { useState } from 'react';
import { Grid, IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import { WorkExperience } from '../../page/Profile/model/types';

interface Props {
  id: string;
  job: string;
  duration: string;
  deleteField: (id: string) => void;
  addField: (newField: WorkExperience) => void;
  isExisting: boolean;
}

const WorkExperienceField: React.FC<Props> = ({id, job, duration, deleteField, addField, isExisting}) => {
  const [state, setState] = useState<WorkExperience>({
    _id: id,
    fieldOfWork: job || '',
    duration: duration || '0 лет',
  });
  const [isAdded, setIsAdded] = useState(isExisting);
  const fieldChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDeleteField = (id: string) => {
    deleteField(id);
  };

  const addFieldToFormState = () => {
    addField({...state});
    setIsAdded(true);
  };

  return (
    <div className="workExpWrapper">
      <Grid item xs={6}>
        <input
          style={{marginLeft: '8px'}}
          className="workExpWrapperField"
          id="job"
          value={state.fieldOfWork}
          onChange={fieldChangeHandler}
          name="fieldOfWork"
        />
      </Grid>
      <Grid item xs={6}>
        <input
          style={{marginLeft: '8px', width: '205px'}}
          className="workExpWrapperField workExpYearField"
          id="duration"
          value={state.duration}
          onChange={fieldChangeHandler}
          name="duration"
        />
      </Grid>
      <Grid>
        {!isAdded ? (
          <Tooltip title={'Сохранить опыт'}>
            <IconButton onClick={addFieldToFormState} aria-label="delete" color="primary">
              <CheckIcon/>
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title={'Удалить'}>
            <IconButton onClick={() => handleDeleteField(id)} aria-label="delete" color="primary">
              <DeleteIcon/>
            </IconButton>
          </Tooltip>
        )}
      </Grid>
    </div>
  );
};

export default WorkExperienceField;
