import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';

export function Traffic() {
  return (
    <Card sx={{ marginBottom: '30px' }}>
      <CardHeader title="Traffic source" />
      <CardContent>какая-то статистика</CardContent>
    </Card>
  );
}
