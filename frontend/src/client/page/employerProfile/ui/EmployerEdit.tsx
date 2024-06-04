import { useParams } from 'react-router-dom';
import { EmployerFormPage } from '../../../../admin/page/employerPanel';

const EmployerEdit = () => {
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;

  return (
    <>
    {id &&
    <EmployerFormPage
      // id={id}
      // isEditing={isEditing}
    />}
    </>

  );
};

export default EmployerEdit;