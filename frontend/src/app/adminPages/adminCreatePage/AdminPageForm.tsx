import {useState} from "react";
import {Box, Button, Divider, List, ListItem, ListItemText, Modal, TextField, Typography} from "@mui/material";

const AdminPageForm = () => {
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [openModal, setOpenModal] = useState(false);

    const [components] = useState([
        {_id: '1', img: 'img', title: 'Heading'},
        {_id: '2', img: 'img', title: 'Component1'},
        {_id: '3', img: 'img', title: 'Component2'},
    ]);



    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <TextField
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    variant="outlined"
                />
                <TextField
                    label="URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    variant="outlined"
                />
                <Button onClick={() =>  setOpenModal(true )} variant="contained" sx={{ backgroundColor: '#000', color: '#fff', borderColor: '#000' }}>+</Button>
            </Box>
            <Modal
                open={openModal}
                onClose={() => setOpenModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
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
                    <Typography variant="h6" component="h2" gutterBottom>Select a Component</Typography>
                    <Divider />
                    <List>
                        {components.map((component) => (
                            <ListItem key={component._id} onClick={() => {
                                // Действие при выборе компонента
                                console.log('Selected component:', component);
                            }}>
                                <ListItemText primary={component.title} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Modal>
        </>
    );
};

export default AdminPageForm;
