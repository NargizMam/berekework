import { Box, Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { AddCircle } from '@mui/icons-material';
import { useAppDispatch } from '../../../../app/store/hooks';
import { HeaderMutation } from '../../../../shared/types';
import { createHeader } from '../api/headerThunks';
import FileInput from '../../../../shared/fileInput/FileInput';


export const HeaderAdmin = () => {
  const dispatch = useAppDispatch();
  //const headerData = useAppSelector(selectHeader);
  const [header, setHeader] = useState<HeaderMutation>({
    logo: null,
    name: 'BerekeWork',
    url: '/',
    navbarItems: [],
  });
/*
  useEffect(() => {
    dispatch(fetchHeader());
  }, [dispatch]);

  useEffect(() => {
    if (headerData) {
      setHeader({
        url: headerData.url,
        name: headerData.name,
        navbarItems: headerData.navbarItems,
        logo: headerData.logo,
      });
    }
  }, [headerData]);*/

  const onHeaderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createHeader(header));
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      setHeader((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  const addNavItem = () => {
    if (header.navbarItems.length >= 6) {
      alert('Navbar items can not be more than 6');
      return;
    }

    setHeader((prevHeader) => ({
      ...prevHeader,
      navbarItems: [
        ...prevHeader.navbarItems,
        {
          nameNav: '',
          link: '',
          isDrop: false,
          nestedMenu: [],
        },
      ],
    }));
  };

  const addNestedNavItem = (index: number) => {
    const updatedNavbarItems = [...header.navbarItems];
    const newNestedItem = {
      nestedNameNav: '',
      nestedLink: '',
    };
    updatedNavbarItems[index].nestedMenu.push(newNestedItem);
    updatedNavbarItems[index].isDrop = true;
    updatedNavbarItems[index].link = '';

    setHeader((prevHeader) => ({
      ...prevHeader,
      navbarItems: updatedNavbarItems,
    }));
  };

  const handleNameNavChange = (index: number, value: string) => {
    setHeader((prevHeader) => {
      const updatedNavbarItems = [...prevHeader.navbarItems];
      updatedNavbarItems[index] = {
        ...updatedNavbarItems[index],
        nameNav: value,
      };
      return {
        ...prevHeader,
        navbarItems: updatedNavbarItems,
      };
    });
  };

  const handleNestedNavChange = (
    index: number,
    nestedIndex: number,
    value: string,
  ) => {
    setHeader((prevHeader) => {
      const updatedNavbarItems = [...prevHeader.navbarItems];
      updatedNavbarItems[index].nestedMenu[nestedIndex] = {
        ...updatedNavbarItems[index].nestedMenu[nestedIndex],
        nestedNameNav: value,
      };
      return {
        ...prevHeader,
        navbarItems: updatedNavbarItems,
      };
    });
  };

  const handleLinkChange = (index: number, value: string) => {
    setHeader((prevHeader) => {
      const updatedNavbarItems = [...prevHeader.navbarItems];
      updatedNavbarItems[index] = {
        ...updatedNavbarItems[index],
        link: value,
      };
      return {
        ...prevHeader,
        navbarItems: updatedNavbarItems,
      };
    });
  };

  const handleNestedLinkChange = (
    index: number,
    nestedIndex: number,
    value: string,
  ) => {
    setHeader((prevHeader) => {
      const updatedNavbarItems = [...prevHeader.navbarItems];
      updatedNavbarItems[index].nestedMenu[nestedIndex] = {
        ...updatedNavbarItems[index].nestedMenu[nestedIndex],
        nestedLink: value,
      };
      return {
        ...prevHeader,
        navbarItems: updatedNavbarItems,
      };
    });
  };

  return (
    <>
      <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
        # Header
      </Typography>
      <form autoComplete="off" onSubmit={onHeaderSubmit}>
        <Box
          sx={{
            mt: 1,
            maxWidth: { xs: '100%', sm: '500px', md: '600px' },
          }}
        >
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <TextField
                id="name"
                label="Name"
                name="name"
                value={header.name}
                onChange={(e) => setHeader({ ...header, name: e.target.value })}
                required
              />
            </Grid>
            <Grid item>
              <TextField
                id="url"
                label="URL"
                name="url"
                value={header.url}
                onChange={(e) => setHeader({ ...header, url: e.target.value })}
                required
              />
            </Grid>
            <Grid item>
              <FileInput
                label="Logo"
                name="logo"
                onChange={fileInputChangeHandler}
              />
            </Grid>
          </Grid>
          <Box
            sx={{
              margin: '10px 0',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Typography variant={'h5'}>Nav Links</Typography>
            <Button
              variant={'contained'}
              sx={{ marginLeft: 2 }}
              onClick={addNavItem}
            >
              Add navItem
            </Button>
          </Box>
          {header.navbarItems.map((navbarItem, index) => (
            <Grid
              key={index}
              container
              spacing={2}
              direction={'column'}
              sx={{ border: '1px solid black', p: 2, margin: '15px 0' }}
            >
              <Grid item>
                <TextField
                  id={`nameNav-${index}`}
                  label="Navlink name"
                  name="nameNav"
                  value={navbarItem.nameNav}
                  variant="standard"
                  required
                  onChange={(e) => handleNameNavChange(index, e.target.value)}
                />
              </Grid>
              <Grid item>
                {navbarItem.isDrop ? (
                  navbarItem.nestedMenu.map((nestedItem, indexNest) => (
                    <Box key={indexNest + 10} sx={{ margin: '10px 0' }}>
                      <TextField
                        id={`nestedNav-${indexNest}`}
                        label="Nested Name Nav"
                        name="nestedNameNav"
                        value={nestedItem.nestedNameNav}
                        onChange={(e) =>
                          handleNestedNavChange(
                            index,
                            indexNest,
                            e.target.value,
                          )
                        }
                      />
                      <TextField
                        id={`nestedLink-${indexNest}`}
                        label="Nested Link"
                        name="nestedLink"
                        value={nestedItem.nestedLink}
                        onChange={(e) =>
                          handleNestedLinkChange(
                            index,
                            indexNest,
                            e.target.value,
                          )
                        }
                      />
                    </Box>
                  ))
                ) : (
                  <TextField
                    id={`link-${index}`}
                    label="Nav link"
                    name="link"
                    value={navbarItem.link}
                    variant="standard"
                    onChange={(e) => handleLinkChange(index, e.target.value)}
                  />
                )}
                <IconButton onClick={() => addNestedNavItem(index)}>
                  <AddCircle />
                </IconButton>
              </Grid>
            </Grid>
          ))}
          <Button type={'submit'}>Submit</Button>
        </Box>
      </form>
    </>
  );
};

