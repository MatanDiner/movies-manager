import React from 'react';

const modalContext = React.createContext({
    showInfoModal:()=>{},
    showEditModal:()=>{},
    showDeleteModal:()=>{},
    showAddModal:()=>{},
});


export default modalContext;