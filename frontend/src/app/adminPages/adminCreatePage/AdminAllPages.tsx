import {Button, Typography} from '@mui/material';
import {NavLink} from "react-router-dom";

const AdminAllPages = () => {
    // const allPages = useAppSelector(selectAdminPagesList);

    return (
        <div>
            <Typography>Страницы еще не созданы</Typography>
            <Button component={NavLink} to='new-page'>Create Page</Button>
        </div>
    );
};

export default AdminAllPages;



