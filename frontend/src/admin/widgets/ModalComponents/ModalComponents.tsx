import React from 'react';
import { Box, Divider, List, ListItem, ListItemText, Modal, Typography } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { components } from '../../../app/constants/components';
import { Fields, IPage } from '../../page/adminPages/model/types';

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onChangePages: (page: IPage) => void;
  onChangeComponentDisplayName: (displayName: string) => void;
  onChangeComponentField: (field: Fields) => void;
}

const ModalComponents: React.FC<Props> = ({
  isOpen,
  setIsOpen,
  onChangeComponentDisplayName,
  onChangePages,
  onChangeComponentField,
}) => {
  const onSelectComponent = (index: number) => {
    const selectComponent = components[index];
    onChangeComponentDisplayName(selectComponent.displayName);

    onChangeComponentField(selectComponent.fields);
    const oneFieldObject = [];

    for (const key in selectComponent.fields) {
      const value = selectComponent.fields[key as keyof typeof selectComponent.fields];
      const item = { [key]: value.value };
      oneFieldObject.push(item);
    }

    const combinedObject = Object.assign({}, ...oneFieldObject);
    onChangePages({ nameComponent: selectComponent.name, content: combinedObject });
    setIsOpen(false);
  };

  return (
    <>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
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

export default ModalComponents;
