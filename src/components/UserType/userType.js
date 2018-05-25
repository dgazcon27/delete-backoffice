import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { 
	editUserType,
	blockUserType,
	deleteUserType 
} from '../../actions/userType/actionsCreators'; 
import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	IconButton
} from '@material-ui/core';

import{
	Block,
	Edit,
	Cancel
} from '@material-ui/icons';


const UserType = ({
	editUserType,
	blockUserType,
	deleteUserType 
	}) => (
<div>
	<h3>
	Tipo de Usuario
	</h3>
	<h5>
	Agregar Nuevo 
	</h5>
	<Paper >
      <Table >
        <TableHead>
          <TableRow >
            <TableCell>Nombre</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            
            <TableCell> Opciones</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
	   	  <TableRow>
       	    <TableCell>Nombre</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell>
            <IconButton
            	onClick={editUserType}
            	>
            	<Edit/> 
            </IconButton>
            <IconButton
            	onClick={deleteUserType}
            	>
            	<Cancel/> 
            </IconButton>
            <IconButton
            	onClick={blockUserType}
            	>
            	<Block/>	
            </IconButton>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
</div>

);



const mapStateToProps = state => ({
//estados mapeables
});

const mapDispatchToProps = dispatch => ({
	editUserType: () => dispatch(editUserType()),
	blockUserType: () => dispatch(blockUserType()),
	deleteUserType: () => dispatch(deleteUserType())
});

export default compose(
	connect(mapStateToProps, mapDispatchToProps)
)(UserType);
