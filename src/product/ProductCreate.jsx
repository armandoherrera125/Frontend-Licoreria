import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { TextField } from '@mui/material';
import { Box } from '@mui/system';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { addProduct } from '../slices/dispatcherRequest';

export const ProductCreate = () => {
    const dispatch = useDispatch();

    const [inputTask, setinputTask] = useState({
        name: "",
        price: 0,
        bodega: 0,
        estante: 0
    });
    const { name, price, bodega, estante } = inputTask;
    
    const handleInputChange = ({ target }) => {
        setinputTask({
            ...inputTask,
            [target.name]: target.value
        });
    }
    const formAction = async (e) => {
        //e.preventDefault();
        
        const creatingProduct = await fetch('http://localhost:8000/api/products', {
            method: 'POST',
            body: JSON.stringify({
                name,
                price,
                bodega,
                estante
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        setinputTask({
            name: "",
            price: 0,
            bodega: 0,
            estante: 0,
        });
        dispatch(addProduct());
        setOpen(false);
        Swal.fire(
            'Buen trabajo!',
            'Producto creado. Agregado a la lista!',
            'success'
        )
    };
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div>
            <Tooltip title="Agregar Producto">
                <IconButton onClick={handleClickOpen}>
                    Producto<AddIcon />
                </IconButton>
            </Tooltip>
            {/* <Button onClick={handleClickOpen} startIcon={<AddIcon />}>
        Agregar
      </Button> */}
            <form onSubmit={formAction} method="POST">
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"

                >
                    <DialogTitle id="alert-dialog-title">
                        {"Agregando un nuevo producto"}
                    </DialogTitle>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        align: 'center',
                        flexWrap: 'wrap',
                        '& > :not(style)': {
                            m: 1,
                            width: 200,
                            minHeight: 70,
                        },


                    }}>

                        <TextField name='name' value={name} onChange={handleInputChange} id="outlined-basic" label="Nombre" variant="outlined" />
                        <TextField name='price' type="number" value={price} onChange={handleInputChange} id="outlined-basic" label="Precio" variant="outlined" />
                        <TextField name='bodega' type="number" value={bodega} onChange={handleInputChange} id="outlined-basic" label="Bodega" variant="outlined" />
                        <TextField name='estante' type="number" value={estante} onChange={handleInputChange} id="outlined-basic" label="Estante" variant="outlined" />

                    </Box>

                    <DialogActions>
                        <Button variant='outlined' color='error' onClick={handleClose}>Cancelar</Button>
                        <Button disabled={!name || !price || !bodega || !estante} type="submit" variant='outlined' autoFocus onClick={formAction}>
                            Agregar
                        </Button>
                    </DialogActions>
                </Dialog>
            </form>
        </div>

    );
}