import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { TableProducts } from '../table/TableProducts'
// import { Buscar } from '../buscar/Buscar'
// import { Orden } from '../ordenes/Orden'
// import { Pagar } from '../pagar/Pagar'
// import { TableProducts } from '../TableProducts'
export const AppRouter = () => {
    return (
        <Routes>
                <Route path='/' element={
                <TableProducts />}/>
            {/* <Route path='ordenes' element={
                    <Orden />
            } />
            <Route path='/' element={
                <TableProducts />
            } />
                        <Route path='/pagar' element={
                <Pagar />
            } />
                        <Route path='/buscar' element={
                <Buscar />
            } /> */}
        </Routes>
    )
}