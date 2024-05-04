import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Divider, Grid, List, ListItem, ListItemText, Modal, Typography } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { useAppDispatch } from '../../../../app/store/hooks';
import { components } from '../../../../app/constants/components';
import { createPage, fetchAllPages } from '../api/adminPageThunks';
import ComponentAdder from '../../../widgets/adminPageCreateForm/ComponentAdder';
import ComponentList from '../../../widgets/adminPageCreateForm/ComponentList';
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
  const [openModal, setOpenModal] = useState(false);
  const [chooseComponentName, setChooseComponentName] = useState<string[]>([]);

  const onSelectComponent = (index: number) => {
    const selectComponent = components[index];
    setChooseComponentName((prevState) => [...prevState, selectComponent.displayName]);
    setComponentsField((prevState) => [...prevState, selectComponent.fields]);
    const oneFieldObject = [];

    for (const key in selectComponent.fields) {
      const value = selectComponent.fields[key as keyof typeof selectComponent.fields];
      const item = { [key]: value.value };
      oneFieldObject.push(item);
    }

    const combinedObject = Object.assign({}, ...oneFieldObject);
    setPages((prevState) => [...prevState, { nameComponent: selectComponent.name, content: combinedObject }]);
    setOpenModal(false);
  };

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
          setOpenModal={setOpenModal}
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
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            backgroundColor: '#fff',
            border: '2px solid #000',
            p: 2,
          }}
        >
          <Tooltip title="Search">
            <IconButton>
              <SearchIcon />
            </IconButton>
          </Tooltip>
          <InputBase placeholder="Search..." sx={{ border: '1px solid #000', borderRadius: '4px', px: 1 }} />
          <Typography variant="h6" component="h2" gutterBottom>
            Select a Component
          </Typography>
          <Divider />
          <List>
            {components.map((component, index) => (
              <ListItem
                key={component.id}
                onClick={() => {
                  onSelectComponent(index);
                }}
              >
                <ListItemText primary={component.displayName} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Modal>
    </>
  );
};
