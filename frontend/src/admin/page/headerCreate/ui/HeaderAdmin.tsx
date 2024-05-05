import { Box, Button, Grid, IconButton, MenuItem, TextField, Typography } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { AddCircle } from '@mui/icons-material';
import HeaderLogoForm from './HeaderLogoForm';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { HeaderMutation } from '../model/types';
import { createHeader, fetchHeader } from '../api/headerThunks';
import { selectHeader } from '../model/headerSlice';

export const HeaderAdmin = () => {
  const dispatch = useAppDispatch();
  const usersRoles = ['find_job', 'find_employee'];
  const headerData = useAppSelector(selectHeader);
  const [existingImage, setExistingImage] = useState<string | null>(null);
  const [header, setHeader] = useState<HeaderMutation>({
    logo: null,
    name: 'BerekeWork',
    url: '/',
    navbarItems: [],
  });

  useEffect(() => {
    dispatch(fetchHeader());
  }, [dispatch]);

  useEffect(() => {
    if (headerData) {
      setExistingImage(headerData.logo);

      const mutation: HeaderMutation = {
        logo: headerData.logo,
        name: headerData.name,
        url: headerData.url,
        navbarItems: headerData.navbarItems.map((item) => {
          return {
            access: item.access,
            link: item.link,
            nameNav: item.nameNav,
            isDrop: item.isDrop,
            nestedMenu: item.nestedMenu.map((item) => {
              return {
                nestedNameNav: item.nestedNameNav,
                nestedLink: item.nestedLink,
              };
            }),
          };
        }),
      };

      setHeader(mutation);
    }
  }, [headerData]);

  const selectedFilename = useMemo(() => {
    if (header.logo instanceof File) {
      return header.logo.name;
    } else if (header.logo === 'delete') {
      return undefined;
    } else if (existingImage) {
      return existingImage;
    }
  }, [header.logo, existingImage]);

  const onHeaderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(header);
    dispatch(createHeader(header));
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setHeader((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
          access: '',
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
    updatedNavbarItems[index].link = null;

    setHeader((prevHeader) => ({
      ...prevHeader,
      navbarItems: updatedNavbarItems,
    }));
  };

  const handleNameOrLinkNavChange = (index: number, value: string, isNameNav: boolean, access?: boolean) => {
    setHeader((prevHeader) => {
      const updatedNavbarItems = [...prevHeader.navbarItems];
      if (isNameNav) {
        updatedNavbarItems[index] = {
          ...updatedNavbarItems[index],
          nameNav: value,
        };
      } else if (!isNameNav && !access) {
        updatedNavbarItems[index] = {
          ...updatedNavbarItems[index],
          link: value,
        };
      }

      if (access) {
        updatedNavbarItems[index] = {
          ...updatedNavbarItems[index],
          access: value,
        };
      }
return {
  ...prevHeader,
  navbarItems: updatedNavbarItems,
};
});
};

const handleNestedNavOrLinkChange = (index: number, nestedIndex: number, value: string, isNestedNav: boolean) => {
  setHeader((prevHeader) => {
    const updatedNavbarItems = [...prevHeader.navbarItems];

    if (isNestedNav) {
      updatedNavbarItems[index].nestedMenu[nestedIndex] = {
        ...updatedNavbarItems[index].nestedMenu[nestedIndex],
        nestedNameNav: value,
      };
    } else {
      updatedNavbarItems[index].nestedMenu[nestedIndex] = {
        ...updatedNavbarItems[index].nestedMenu[nestedIndex],
        nestedLink: value,
      };
    }

    return {
      ...prevHeader,
      navbarItems: updatedNavbarItems,
    };
  });
};

return (
  <>
    <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
      Header
    </Typography>
    <form autoComplete="off" onSubmit={onHeaderSubmit}>
      <Box
        sx={{
          mt: 1,
          maxWidth: { xs: '100%', sm: '500px', md: '600px' },
        }}
      >
        <HeaderLogoForm
          logoName={header.name}
          logoUrl={header.url}
          fileName={selectedFilename}
          onInputChange={onInputChange}
          onFileInputChange={fileInputChangeHandler}
        />
        <Typography variant={'h5'} sx={{ fontWeight: 'bold', mt: 1 }}>
          Nav Links
        </Typography>
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
                onChange={(e) => handleNameOrLinkNavChange(index, e.target.value, true)}
              />
            </Grid>
            <Grid item>
              <TextField
                select
                id={`access-${index}`}
                label="Access"
                value={navbarItem.access}
                onChange={(e) => handleNameOrLinkNavChange(index, e.target.value, false, true)}
                name="access"
                required
              >
                <MenuItem value="" disabled>
                  Please select a access
                </MenuItem>
                {usersRoles.map((role, index) => (
                  <MenuItem key={index} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </TextField>
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
                      onChange={(e) => handleNestedNavOrLinkChange(index, indexNest, e.target.value, true)}
                    />
                    <TextField
                      id={`nestedLink-${indexNest}`}
                      label="Nested Link"
                      name="nestedLink"
                      value={nestedItem.nestedLink}
                      onChange={(e) => handleNestedNavOrLinkChange(index, indexNest, e.target.value, false)}
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
                  onChange={(e) => handleNameOrLinkNavChange(index, e.target.value, false)}
                />
              )}
              <IconButton onClick={() => addNestedNavItem(index)}>
                <AddCircle />
              </IconButton>
            </Grid>
          </Grid>
        ))}
        <Grid container justifyContent={'space-between'}>
          <Grid item>
            <Button variant={'contained'} onClick={addNavItem}>
              Add navItem
            </Button>
          </Grid>
          <Grid item>
            <Button variant={'contained'} type={'submit'}>
              Save
            </Button>
          </Grid>
        </Grid>
      </Box>
    </form>
  </>
);
};