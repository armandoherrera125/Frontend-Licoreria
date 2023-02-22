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
import Divider from '@mui/material/Divider';

import { addProduct } from '../slices/dispatcherRequest';
import Swal from 'sweetalert2';
import { setID } from '../slices/IDsetter';
import PrintIcon from '@mui/icons-material/Print';
import { TableRevenue } from './TableRevenue';
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
  const [salidas, setsalidas] = useState({
    totalSalidas: 0,
    caja: 0
  });
  const { totalSalidas, caja } = salidas;

  const handleInputChangeSalidas = ({ target }) => {
    setsalidas({
      ...salidas,
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

  const imprimir = () => {
    var data=document.getElementById('imprimir').innerHTML;
    var nombre_fecha=document.getElementById('nombre_fecha').innerHTML;
    var tableRevenue=document.getElementById('tableentradas').innerHTML;

    var ventana = window.open('', 'PRINT', 'height=400,width=600');
    ventana.document.write('<html><head><title style="text-align:center;align-content:center;">Inventario</title>');
    ventana.document.write('</head><body >');
    ventana.document.write('<div style="text-align: center;align-content: center;">');
    ventana.document.write('<img style="width: 155px;max-width: 155px;" src="/despensajadis.jpeg" alt="Logotipo"/>'); 

    //ventana.document.write('<img style="width: 155px;max-width: 155px;" src="https://yt3.ggpht.com/-3BKTe8YFlbA/AAAAAAAAAAI/AAAAAAAAAAA/ad0jqQ4IkGE/s900-c-k-no-mo-rj-c0xffffff/photo.jpg" alt="Logotipo"/>'); 
    ventana.document.write(nombre_fecha);
    ventana.document.write(data);
    ventana.document.write('<hr />');
    ventana.document.write('<table style="width: 65%;">');
    ventana.document.write('<tbody>');
    ventana.document.write('<tr>');
    ventana.document.write(`<td style="width: 406.453px;"><b>Movimientos</b></td>`);
    ventana.document.write('<td style="width: 200.547px;"><b>Suma</b></td>');
    ventana.document.write('</tr>');
    ventana.document.write('<tr>');
    ventana.document.write('<td style="width: 406.453px;">Total salidas:</td>');
    ventana.document.write(`<td style="width: 200.547px;">${totalSalidas} +</td>`);
    ventana.document.write('</tr>');
    ventana.document.write('<tr>');
    ventana.document.write('<td style="width: 406.453px;">Dinero en caja:</td>');
    ventana.document.write(`<td style="width: 200.547px;">${caja} +</td>`);
    ventana.document.write('</tr>');
    ventana.document.write('<tr>');
    ventana.document.write('<td style="width: 406.453px;">Total existencia en mercaderia:</td>');
    ventana.document.write(`<td style="width: 200.547px;">${finalValue} =</td>`);
    ventana.document.write('</tr>');
    ventana.document.write('<tr>');
    ventana.document.write('<td style="width: 406.453px;">Total salidas y existencia:</td>');
    ventana.document.write(`<td style="width: 200.547px;">${totalSumaSalidas}</td>`);
    ventana.document.write('</tr>');
    ventana.document.write('<tr>');
    ventana.document.write('<td style="width: 406.453px;">Saldo:</td>');
    ventana.document.write(`<td style="width: 200.547px;">${saldo}</td>`);
    ventana.document.write('</tr>');
    ventana.document.write('</tbody>');
    ventana.document.write('</table>');

    //ventana.document.write(tableRevenue);
    ventana.document.write('<hr />');
    ventana.document.write('<p style="text-align: center;align-content: center;">¡GRACIAS POR UTILIZAR EL SISTEMA!</p>');
    ventana.document.write('<p style="text-align: center;align-content: center;">¡Bendiciones!</p>');

    ventana.document.write('</div>');
    ventana.document.write('</body></html>');
    ventana.document.close();
    ventana.focus();
    ventana.onload = function() {
      ventana.print();
      ventana.close();
    };
    Swal.fire(
        'Buen trabajo!',
        'Se imprimira el inventario!',
        'success'
    )
    setsalidas({
      totalSalidas: 0,
      caja: 0
    })
    return true;










  }


let props = {
  totalSalidas,
  caja,
  finalValue
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
  //console.log(inputTask);
  let mesActual = new Intl.DateTimeFormat('es-ES', { month: 'long'}).format(new Date());
  const totalSumaSalidas = Number(totalSalidas) + Number(caja) + Number(finalValue);
  const saldo = Number(caja) + Number(finalValue);


  return (
    <>
      {/* <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        align: 'center',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 400,
          maxHeight: 300,
        },
      }}
      >
        <Paper elevation={3}>
          <Typography variant="h4" gutterBottom>
            {`Formulario Activos de la empresa`}
          </Typography>
          <TextField sx={{ marginBottom: 5 }} name='totalSalidas' type="number" value={totalSalidas} onChange={handleInputChangeSalidas} id="outlined-basic" label="Total salidas" variant="outlined" />
          <TextField name='caja' sx={{ marginBottom: 3 }} type="number" value={caja} onChange={handleInputChangeSalidas} id="outlined-basic" label="Caja" variant="outlined" />
          <Button onClick={imprimir} disabled={!caja || !totalSalidas} variant="contained"><PrintIcon />Imprimir Ticket</Button>
        </Paper>
      </Box>
      <hr /> */}
      <div id='nombre_fecha'>
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
            {`Inventario de Despensa Jadis 1`}
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
            {`${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`}
          </Typography>
        </Box>

        <hr />
        </div>
        {/* <Box sx={{
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
          Hola
        </Box> */}


        <Box sx={{
          display: 'inline-flex',
          alignItems: 'flex-start',
          justifyContent: 'left',
          textAlign: 'center',
          align: 'center',
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 1,
            width: 650,
            maxHeight: 100,
          },
        }}>
          <div id='imprimir'>
          <Paper elevation={3}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="spanning table">
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
          </div>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              align: 'center',
              flexWrap: 'wrap',
              '& > :not(style)': {
                width: 400,
                maxHeight: 500,
              },
            }}
          >
            <Paper elevation={3}>
              <Typography variant="h4" gutterBottom>
                {`Formulario Activos de la empresa`}
              </Typography>



              <TextField fullWidth sx={{ padding:2 }} name='totalSalidas' type="number" value={totalSalidas} onChange={handleInputChangeSalidas} id="outlined-basic" label="Total salidas" variant="outlined" />
              <TextField fullWidth name='caja' sx={{ padding:2 }} type="number" value={caja} onChange={handleInputChangeSalidas} id="outlined-basic" label="Caja" variant="outlined" />
              <Button onClick={imprimir} sx={{ padding:2 }} disabled={!caja || !totalSalidas} variant="contained"><PrintIcon />Imprimir Ticket</Button>
            </Paper>
          </Box>

        </Box>
        {
          totalSalidas && caja ?
          <div id='tableentradas'>
          <Box sx={{
            display: 'flex',
            marginTop: 30,
            marginLeft: 90,
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            align: 'center',
            flexWrap: 'wrap',
            '& > :not(style)': {
              maxWidth: 500,
              maxHeight: 1000,
            },
          }}>
            <TableRevenue {...props}/>
          </Box>
        </div>
          : ''
        }
        

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

      
    </>
  );
}