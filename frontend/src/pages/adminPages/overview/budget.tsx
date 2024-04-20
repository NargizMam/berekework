import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';


export function Budget(): React.JSX.Element {

  return (
    <Card >
      <CardContent>
        <Stack spacing={3}>
          <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={3}>
            <Stack spacing={1}>
              <Typography color="text.secondary" variant="overline">
                Budget
              </Typography>
              <Typography variant="h4">Какая-то инфа</Typography>
            </Stack>
          </Stack>

        </Stack>
      </CardContent>
    </Card>
  );
}
