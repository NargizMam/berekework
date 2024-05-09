import React from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import InputItem from './InputItem';
import { Fields, IChooseComponent, IPage } from '../../page/adminPages/model/types';

interface Props {
  block: Fields;
  index: number;
  onDeleteComponent: (index: number, componentId?: string, link?: string) => void;
  page: IPage[];
  chooseComponentName: IChooseComponent[];
  setPagesData: (data: IPage[]) => void;
  imageInputChange: (location: string, index: number) => void;
}

const ComponentList: React.FC<Props> = ({
  block,
  index,
  onDeleteComponent,
  page,
  chooseComponentName,
  setPagesData,
  imageInputChange,
}) => {
  const onChangeComponentsInput = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = e.target;
    const data = [...page];
    data[index].content[name] = value;
    setPagesData(data);
  };

  return (
    <>
      <Box sx={{ border: '1px solid black', borderRadius: '14px', padding: 1, margin: '10px 0' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-around', margin: '10px 0' }}>
          <Typography variant="h6">{chooseComponentName[index].name}</Typography>
          <Button
            variant="contained"
            color={'error'}
            onClick={() =>
              onDeleteComponent(index, page[index].content['_id'] as string, chooseComponentName[index].url)
            }
          >
            Delete
          </Button>
        </Box>
        {Object.keys(block).map((key: keyof Fields) => {
          const input = block[key];
          const value = page[index].content[key];
          return (
            <Grid item sx={{ mb: 1 }} key={`${index}-${key}`}>
              <InputItem
                field={input}
                index={index}
                value={value}
                onChange={onChangeComponentsInput}
                imageInputChange={imageInputChange}
              />
            </Grid>
          );
        })}
      </Box>
    </>
  );
};

export default ComponentList;
