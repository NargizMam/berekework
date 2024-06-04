import React, { useCallback, useEffect, useState } from 'react';
import { UserMutation, WorkExperience } from '../../page/Profile/model/types';
import './ApplicantForm.css';
import WorkExperienceField from '../WorkExperience/WorkExperienceField';
import Form from './Form';
import { Grid } from '@mui/material';
import FileInput from '../FileInput/FileInput';
import { User } from '../../../app/types';

interface Props {
  applicant: User | null;
  onSubmit: (mutation: UserMutation) => void;
  loading: boolean;
}

const ApplicantFullForm: React.FC<Props> = ({ applicant, onSubmit, loading }) => {
  const [fields, setFields] = useState<React.ReactNode[]>([]);
  const [state, setState] = useState<UserMutation>({
    contacts: {},
    documents: [],
    email: '',
    patronymic: '',
    role: '',
    name: '',
    surname: '',
    avatar: null,
    gender: '',
    dateOfBirth: '',
    country: '',
    city: '',
    education: '',
    aboutMe: '',
    workExperience: [],
    preferredJob: '',
    preferredCity: '',
  });

  useEffect(() => {
    if (applicant) {
      setFields(
        state.workExperience.map((work, index) => (
          <WorkExperienceField
            key={index}
            id={work._id}
            job={work.fieldOfWork}
            duration={work.duration}
            deleteField={deleteField}
            addField={addFieldToFormState}
          />
        )),
      );
    }
  }, [applicant, state.workExperience]);

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      ...applicant,
    }));
  }, [applicant]);

  const submitFormHandler = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(state);
  };

  const inputChangeHandler = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const addFieldToFormState = (newField: WorkExperience) => {
    const existingFieldId = state.workExperience.findIndex((field) => field.id === newField.id);

    if (existingFieldId !== -1) {
      setState((prevState) => ({
        ...prevState,
        workExperience: prevState.workExperience.map((field, index) => (index === existingFieldId ? newField : field)),
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        workExperience: [...prevState.workExperience, newField],
      }));
    }
  };

  const deleteField = (id: string) => {
    setState((prevState) => ({
      ...prevState,
      workExperience: prevState.workExperience.filter((field) => field._id !== id),
    }));
    setFields((prevState) =>
      prevState.filter((form) => {
        if (React.isValidElement(form)) {
          return form.key !== id;
        }
        return true;
      }),
    );
  };

  const addField = () => {
    const fieldId = crypto.randomUUID();
    setFields((prevState) => [
      ...prevState,
      <WorkExperienceField
        key={fieldId}
        job=""
        duration=""
        id={fieldId}
        addField={addFieldToFormState}
        deleteField={deleteField}
      />,
    ]);
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    } else if (state.avatar) {
      setState((prevState) => ({
        ...prevState,
        [name]: applicant?.avatar,
      }));
    }
  };

  return (
    <>
      <div
        style={{
          marginTop: '70px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <FileInput photo={applicant?.avatar || ''} onChange={fileInputChangeHandler} />
        <div className="applicantContainer">
          <p className="profileTitle">Настройки профиля</p>
          <Grid sx={{ maxWidth: '850px' }}>
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