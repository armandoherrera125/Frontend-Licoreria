import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const TAX_RATE = 0.07;

function ccyFormat(num) {
    //console.log(num);
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, qty, unit) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [
  createRow('Paperclips (Box)', 100, 1.15),
  createRow('Paper (Case)', 10, 45.99),
  createRow('Waste Basket', 2, 17.99),
];

const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

export const TableRevenue = ({totalEntradas,totalSalidas,caja,finalValue}) =>{
    let mesActual = new Intl.DateTimeFormat('es-ES', { month: 'long'}).format(new Date());
    const totalSumaSalidas = Number(totalSalidas) + Number(caja) + Number(finalValue);
    const saldo = Number(caja) + Number(finalValue);
    let suma3 = Number(totalEntradas) + Number(caja) + Number(finalValue);
    suma3 = ccyFormat(suma3);
    const entradaMensual = Number(suma3) - Number(totalSalidas);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3}>
              {`Informacion economica de ${mesActual}`} 
            </TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Movimientos</TableCell>
            <TableCell colSpan={3} align="right">Sum</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        <TableRow>
            <TableCell>Total entradas de mercaderia:</TableCell>
            <TableCell colSpan={3} align="right">${totalEntradas}</TableCell>
        </TableRow>
        <TableRow>
            <TableCell>Total salidas de mercaderia:</TableCell>
            <TableCell colSpan={3} align="right">${totalSalidas}</TableCell>
        </TableRow>
        <TableRow>
            <TableCell>Dinero en caja:</TableCell>
            <TableCell colSpan={3} align="right">${caja}</TableCell>
        </TableRow>
        <TableRow>
            <TableCell>Total existencia en mercaderia:</TableCell>
            <TableCell colSpan={3} align="right">${ccyFormat(finalValue)}</TableCell>
        </TableRow>

          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>Total salidas y existencia</TableCell>
            <TableCell align="right">${ccyFormat(totalSumaSalidas)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Saldo actual:</TableCell>
            <TableCell align="right">${ccyFormat(saldo)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Entrada mensual:</TableCell>
            <TableCell align="right">${ccyFormat(entradaMensual)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}