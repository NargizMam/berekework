import { useParams } from 'react-router-dom';

const EditPage = () => {
  const { id } = useParams() as { id: string };
  return <div>EDIT page {id}</div>;
};

export default EditPage;
