import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { deleteComponent, editPage, fetchOnePage } from '../api/adminPageThunks';
import { selectOnePage, selectPageFetchingOne } from '../model/adminPageSlice';
import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import ComponentAdder from '../../../widgets/adminPageCreateForm/ComponentAdder';
import { Fields, IChooseComponent, IPage } from '../model/types';
import ModalComponents from '../../../widgets/ModalComponents/ModalComponents';
import ComponentList from '../../../widgets/adminPageCreateForm/ComponentList';
import { components } from '../../../../app/constants/components';

const EditPage = () => {
  const { id } = useParams() as { id: string };

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [chooseComponentName, setChooseComponentName] = useState<IChooseComponent[]>([]);

  const [state, setState] = useState({
    name: '',
    url: '',
  });
  const [componentsField, setComponentsField] = useState<Fields[]>([]);
  const [page, setPages] = useState<IPage[]>([]);

  const dispatch = useAppDispatch();

  const onePage = useAppSelector(selectOnePage);
  const onePageFetching = useAppSelector(selectPageFetchingOne);

  useEffect(() => {
    dispatch(fetchOnePage(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (onePage) {
      setState({ name: onePage.name, url: onePage.url });

      setPages([]);
      setChooseComponentName([]);
      setComponentsField([]);

      onePage.componentType.map((componentName, componentIndex) => {
        const findIndex = components.findIndex((value) => value.name === componentName);

        const component = components[findIndex];

        setChooseComponentName((prevState) => [...prevState, { name: component.name, url: component.link }]);
        setComponentsField((prevState) => [...prevState, component.fields]);

        setPages((prevState) => [
          ...prevState,
          {
            nameComponent: componentName,
            content: onePage.components[componentIndex],
          },
        ]);
        setIsOpenModal(false);
      });
    }
  }, [onePage]);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onEditPage = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = { name: state.name, url: state.url, blocks: page };
    console.log(result);

    await dispatch(editPage({ id, data: result }));
    await dispatch(fetchOnePage(id));
  };

  const onDeleteComponent = async (index: number, componentId?: string, link?: string) => {
    console.log(
      `Delete first component by this id in api ${componentId} link=${link} Than delete from state by this ${index}}`,
    );

    if (componentId && link) {
      await dispatch(deleteComponent({ componentId, link, pageId: id, index }));
      await dispatch(fetchOnePage(id));
    }
  };

  const onChangeComponentsInput = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = e.target;
    setPages((prevState) =>
      prevState.map((pageItem, pageIndex) =>
        pageIndex === index ? { ...pageItem, content: { ...pageItem.content, [name]: value } } : pageItem,
      ),
    );
  };

  const imageInputChange = (location: string, index: number) => {
    setPages((prevState) =>
      prevState.map((pageItem, pageIndex) =>
        pageIndex === index ? { ...pageItem, content: { ...pageItem.content, image: location } } : pageItem,
      ),
    );
  };

  return (
    <>
      {onePageFetching ? (
        <CircularProgress />
      ) : (
        onePage && (
          <>
            <Typography variant={'h4'} sx={{ fontWeight: 'bold', margin: '10px 0' }}>
              Edit page
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <ComponentAdder
                name={state.name}
                url={state.url}
                onInputChange={onInputChange}
                setOpenModal={setIsOpenModal}
              />
            </Box>
            <Box component={'form'} sx={{ mt: 2 }} onSubmit={onEditPage}>
              <Grid container spacing={2} direction="column">
                {componentsField.map((component, index) => (
                  <ComponentList
                    key={`${index}-component`}
                    page={page}
                    index={index}
                    block={component}
                    chooseComponentName={chooseComponentName}
                    onDeleteComponent={onDeleteComponent}
                    imageInputChange={imageInputChange}
                    onChangeComponentsInput={onChangeComponentsInput}
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
              onChangeComponentDisplayName={(data) => setChooseComponentName((prevState) => [...prevState, data])}
              onChangeComponentField={(fields) => setComponentsField((prevState) => [...prevState, fields])}
            />
          </>
        )
      )}
    </>
  );
};
export default EditPage;
