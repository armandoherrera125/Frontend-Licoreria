import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/system';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProductCreate } from '../product/ProductCreate';
import { Button, Dialog, DialogActions, DialogTitle, TextField, Typography } from '@mui/material';
import { addProduct } from '../slices/dispatcherRequest';
import Swal from 'sweetalert2';
import { setID } from '../slices/IDsetter';

const TAX_RATE = 0.07;

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

// function createRow(desc, qty, unit) {
//   const price = priceRow(qty, unit);
//   return { desc, qty, unit, price };
// }
function createRow(bodega, estante, total, name, price) {
  return {
    bodega, estante, total, name, price
  };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [
  createRow(10, 5, 15, 'Papel Aluminio Diapack 25', 1.25),
  createRow(9, 5, 14, 'Papel Encanto 1000 Hojas', 5.50),
  createRow(5, 5, 10, 'Margarina Mirasol', 1.50),
  createRow(5, 5, 10, 'Papel Rosa Verde', 1.50),
  createRow(5, 5, 10, 'Papel 1000 Hojas sin Marca', 1.50)
];



const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

export const TableProducts = () => {

  const requestAgain = useSelector((state) => state.requestAgain);
  const [listOfProducts, setlistOfProducts] = useState([]);
  const [rowSelected, setrowSelected] = useState({});
  useEffect(() => {
    const getProducts = async () => {

      //const productos = await fetch('https://backend-charro-production.up.railway.app/api/products');
      const productos = await fetch('http://localhost:8000/api/products');
      const { products } = await productos.json();
      //console.log(products);
      setlistOfProducts(products);
      //setvalores(listOfProducts);
    };
    getProducts();

  }, [requestAgain])

  //console.log(listOfProducts);


  const totalSum = () => {
    let sumaTotal = 0;
    listOfProducts.map(({ total, price }) => {
      sumaTotal = sumaTotal + (total * price);
      //console.log(sumaTotal);
    })
    return sumaTotal;
  }
  const finalValue = totalSum();
  //console.log(finalValue);



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

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const id = useSelector((state) => state.IdEdit);

  const formAction = async (e) => {
    //e.preventDefault();

    const creatingProduct = await fetch(`http://localhost:8000/api/products/${id}`, {
      method: 'PUT',
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
      'Producto editado!',
      'success'
    )
  };










  const editProduct = (product) => {
    handleClickOpen();
    dispatch(setID(product.id));
    setinputTask({
      name: product.name,
      price: product.price,
      bodega: product.bodega,
      estante: product.estante,
    });

  }
  console.log(inputTask);



  return (
    <div id='imprimir'>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        align: 'center',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          maxWidth: 900,
          maxHeight: 100,
        },
      }}>
        <Typography variant="h2" gutterBottom>
      {`Inventario de Despensa Jades 1`}
        </Typography>
      </Box>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        align: 'center',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          maxWidth: 900,
          maxHeight: 100,
        },
      }}>
        <Typography variant="h2" gutterBottom>
      {`${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()}`}
        </Typography>
      </Box>


      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          align: 'center',
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 1,
            maxWidth: 900,
            maxHeight: 100,
          },
        }}
      >
        <Paper elevation={3}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 800 }} aria-label="spanning table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" colSpan={5}>
                    Detalles de los productos
                  </TableCell>
                  <TableCell align="right">Total</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Bodega</TableCell>
                  <TableCell align="right">Estante</TableCell>
                  <TableCell align="right">Total productos</TableCell>
                  <TableCell align="center">Descripcion</TableCell>
                  <TableCell align="right">Precio unitario</TableCell>
                  <TableCell align="right">Suma</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listOfProducts.map((row) => (
                  <TableRow onClick={() => editProduct(row)} key={row.id} hover>
                    <TableCell>{row.bodega}</TableCell>
                    <TableCell align="right">{row.estante}</TableCell>
                    <TableCell align="right">{row.total}</TableCell>
                    <TableCell align="right">{row.name}</TableCell>
                    <TableCell align="right">{row.price}</TableCell>
                    <TableCell align="right">$ {ccyFormat(row.price * row.total)}</TableCell>
                  </TableRow>
                ))}

                <TableRow>
                  <TableCell rowSpan={3} />
                  <TableCell align='center' colSpan={4}>Subtotal</TableCell>
                  <TableCell align="right">$ {ccyFormat(finalValue)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align='center' colSpan={4}>Total</TableCell>
                  <TableCell align="right">$ {ccyFormat(finalValue)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>









      <form onSubmit={formAction} method="PUT">
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