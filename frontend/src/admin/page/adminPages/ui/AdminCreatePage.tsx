import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Grid } from '@mui/material';
import { useAppDispatch } from '../../../../app/store/hooks';
import { createPage, fetchAllPages } from '../api/adminPageThunks';
import ComponentAdder from '../../../widgets/adminPageCreateForm/ComponentAdder';
import ComponentList from '../../../widgets/adminPageCreateForm/ComponentList';
import ModalComponents from '../../../widgets/ModalComponents/ModalComponents';
import { Fields, IPage } from '../model/types';

export const AdminCreatePage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [componentsField, setComponentsField] = useState<Fields[]>([]);
  const [page, setPages] = useState<IPage[]>([]);
  const [initialPageValues, setInitialPageValues] = useState({
    name: '',
    url: '',
  });
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [chooseComponentName, setChooseComponentName] = useState<string[]>([]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = { name: initialPageValues.name, url: initialPageValues.url, blocks: page };
    dispatch(createPage(result));
    dispatch(fetchAllPages());
    navigate('/admin/pages');
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInitialPageValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const deleteBlock = (index: number) => {
    setComponentsField((prevBlocks) => prevBlocks.filter((_, i) => i !== index));
    setPages((prevPages) => prevPages.filter((_, i) => i !== index));
    setChooseComponentName((prevNames) => prevNames.filter((_, i) => i !== index));
  };

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <ComponentAdder
          name={initialPageValues.name}
          url={initialPageValues.url}
          onInputChange={onInputChange}
          setOpenModal={setIsOpenModal}
        />
      </Box>
      <Box component={'form'} sx={{ mt: 2 }} onSubmit={onSubmit}>
        <Grid container spacing={2} direction="column">
          {componentsField.map((component, index) => (
            <ComponentList
              key={`${index}-component`}
              page={page}
              index={index}
              block={component}
              chooseComponentName={chooseComponentName}
              setPagesData={setPages}
              onDeleteComponent={deleteBlock}
            />
          ))}
        </Grid>
        <Grid item>
          <Button variant={'contained'} type={'submit'} sx={{ margin: '10px 0' }}>
            Save
          </Button>
        </Grid>
      </Box>
      <ModalComponents
        isOpen={isOpenModal}
        setIsOpen={setIsOpenModal}
        onChangePages={(page) => setPages((prevState) => [...prevState, page])}
        onChangeComponentDisplayName={(displayName) =>
          setChooseComponentName((prevState) => [...prevState, displayName])
        }
        onChangeComponentField={(fields) => setComponentsField((prevState) => [...prevState, fields])}
      />
    </>
  );
};
