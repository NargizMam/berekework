import React, { useState } from 'react';
import { Grid, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import { WorkExperience } from '../../../types';

interface Props {
  id: string;
  job: string | null,
  deleteField: (id: string) => void,
  addField: (newField: WorkExperience) => void;
}


const WorkExperienceField: React.FC<Props> = ({
  id,
  job,
  deleteField,
  addField,
}) => {
  const [state, setState] = useState<WorkExperience>({
    id: id,
    job: job || '',
  });
  const [isAdded, setIsAdded] = useState(false);

  const fieldChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setState(prevState => ({
      ...prevState,
      [name]: value
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
    <div className='workExpWrapper'>
      <Grid item xs={6}>
        <input
          style={{marginLeft: '8px'}}
          className="field"
          id="job"
          value={state.job}
          onChange={fieldChangeHandler}
          name="job"
        />
      </Grid>
      <Grid>
        {!isAdded ?
          <IconButton onClick={addFieldToFormState} aria-label="delete" color="primary">
            <CheckIcon/>
          </IconButton>
          :
          <IconButton onClick={() => handleDeleteField(state.id)} aria-label="delete" color="primary">
            <DeleteIcon/>
          </IconButton>
        }
      </Grid>
    </div>
  );
};

export default WorkExperienceField;