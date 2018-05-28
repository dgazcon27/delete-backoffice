import React, { Component } from 'react' 
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Block from '@material-ui/icons/Block';
import Edit from '@material-ui/icons/Edit';
import Cancel from '@material-ui/icons/Cancel';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const UserType = ({data: {loading, user}}) => {
  return (
    <div>
      {!loading && 
        <div>
          <h3>
            Tipo de Usuario 
            <div>{user.name}</div>
          </h3>
          <h5>
            Agregar Nuevo 
          </h5>
          <Paper >
            <Table >
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Opciones</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
              <TableRow>
                  <TableCell> Nombre</TableCell>
                  <TableCell>
                    <Edit/> <Cancel/> <Block/>  
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </div>
      }        
    </div>
  )  
};

const user = gql`
  query {
    user(id: 1) {
      name
      birthDate
      dni
      email
    }
  }
`
export default graphql(user)(UserType);