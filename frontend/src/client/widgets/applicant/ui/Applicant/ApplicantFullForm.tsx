import React, { useEffect, useState } from 'react';
import { Applicant, ApplicantMutation, WorkExperience } from '../../types';
import './ApplicantForm.css';
import WorkExperienceField from '../WorkExperience/WorkExperienceField';
import Form from './Form';
import { Grid } from '@mui/material';
import FileInput from '../FileInput/FileInput';


interface Props {
  applicantForm: Applicant | null;
  onSubmit: (mutation: ApplicantMutation) => void;
  loading: boolean;
}

const ApplicantFullForm: React.FC<Props> = ({applicantForm, onSubmit, loading}) => {
  const [fields, setFields] = useState<React.ReactNode[]>([]);
  const [state, setState] = useState<ApplicantMutation>({
    firstName: '',
    surname: '',
    secondName: '',
    photo: null,
    sex: '',
    dateOfBirth: '',
    country: '',
    city: '',
    education: '',
    aboutApplicant: '',
    workExperience: [],
    wantedJob: '',
    wantedJobCity: '',
  });

  useEffect(() => {
    if (applicantForm) {
      setFields(
        state.workExperience.map(work => (
          <WorkExperienceField
            key={work.id}
            id={work.id}
            job={work.job}
            deleteField={deleteField}
            addField={addFieldToFormState}
          />
        ))
      );
    }
  }, [applicantForm]);

  const submitFormHandler = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(state);
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const {name, value} = e.target;

    setState(prevState => {
      return {...prevState, [name]: value};
    });
  };

  const addFieldToFormState = (newField: WorkExperience) => {
    const existingFieldId = state.workExperience.findIndex(field => field.id === newField.id);

    if (existingFieldId !== -1) {
      setState(prevState => ({
        ...prevState,
        workExperience: prevState.workExperience.map((field, index) =>
          index === existingFieldId ? newField : field
        )
      }));
    } else {
      setState(prevState => ({
        ...prevState,
        workExperience: [...prevState.workExperience, newField]
      }));
    }
  };

  const deleteField = (id: string) => {
    setState(prevState => ({
      ...prevState,
      workExperience: prevState.workExperience.filter((field) => field.id !== id)
    }));
    setFields(prevState => prevState.filter(form => {
      if (React.isValidElement(form)) {
        return form.key !== id;
      }
      return true;
    }));
  };

  const addField = () => {
    const fieldId = crypto.randomUUID();
    setFields(prevState => ([
      ...prevState,
      <WorkExperienceField
        key={fieldId}
        job={null}
        id={fieldId}
        addField={addFieldToFormState}
        deleteField={deleteField}
      />
    ]));
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;
    if (files) {
      setState(prevState => ({
        ...prevState, [name]: files[0]
      }));
    }
  };

  return (
    <>
      <div style={{marginTop: '70px'}}>
        <div className="whiteBackground"></div>
        <div className="applicantContainer">
          {/*btn place */}
          <FileInput
            onChange={fileInputChangeHandler}
          />
          <h3 className="applicantSettingsHeader">Настройки профиля</h3>
          <Grid sx={{maxWidth: '850px'}}>
            <Form
              state={state}
              submitFormHandler={submitFormHandler}
              inputChangeHandler={inputChangeHandler}
              addField={addField}
              fields={fields}
              loading={loading}
            />
          </Grid>
        </div>
      </div>
    </>
  );
};

export default ApplicantFullForm;