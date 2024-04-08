import { Box, Typography } from '@mui/material';
import { LinkButtonWithArrow } from '../../../shared/linkButtonWithArrow/index';

import TitleBlockStyle from './TitleBlock-style';
import './TitleBlock.css';


export interface TitleBlockApiData {
  title: string;
  button?: {
    url: string;
    text: string;
  };
  image?: string;
  description?: string;
  location: string;
}

interface Props {
  data: TitleBlockApiData
}

export const TitleBlock: React.FC<Props> = ({data}) => {
  const description = data.description ? (
    <Typography sx={data.image ? TitleBlockStyle.description : TitleBlockStyle.descriptionWithoutImage}>
      {data.description}
    </Typography>
  ) : null;
  const image = data.image ? (
    <Box sx={TitleBlockStyle.imageWrapper}>
      <img src={data.image} alt={data.title} className="TitleBlock__image" />
    </Box>
  ) : null;
  const button = data.button ? (
    <Box sx={TitleBlockStyle.button}>
      <LinkButtonWithArrow url={data.button?.url} text={data.button?.text} />
    </Box>
  ) : null;

  return (
    <>
      <Box sx={TitleBlockStyle.block}>
        <Box sx={data.image ? TitleBlockStyle.infoBlock : {}}>
          <Typography variant="h1" sx={data.image ? TitleBlockStyle.title : TitleBlockStyle.titleWithoutImage}>
            {data.title}
          </Typography>
          {description}
        </Box>
        {image}
      </Box>
      {button}
    </>
  );
};