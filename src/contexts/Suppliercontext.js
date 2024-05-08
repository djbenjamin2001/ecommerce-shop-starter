import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Creating the context
const SupplierContext = createContext();

// Define the initial state of the context
const initialState = {
    orders: [],
    loading: false,
    error: null
};

// Define a reducer for updating the state based on dispatched actions
function supplierReducer(state, action) {
    switch (action.type) {
        case 'FETCH_ORDERS_START':
            return { ...state, loading: true, error: null };
        case 'FETCH_ORDERS_SUCCESS':
            return { ...state, loading: false, orders: action.payload };
        case 'FETCH_ORDERS_ERROR':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}

// Create the provider component
export const SupplierProvider = ({ children }) => {
    const [state, dispatch] = useReducer(supplierReducer, initialState);

    // Function to load orders from a local JSON server
    const loadOrders = async () => {
        dispatch({ type: 'FETCH_ORDERS_START' });
        try {
            const response = await fetch('http://localhost:3000/orders');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            dispatch({ type: 'FETCH_ORDERS_SUCCESS', payload: data });
        } catch (error) {
            dispatch({ type: 'FETCH_ORDERS_ERROR', payload: error.toString() });
        }
    };

    // Load orders when the provider is mounted
    useEffect(() => {
        loadOrders();
    }, []);

    // The value that will be passed to the context
    const value = {
        orders: state.orders,
        loading: state.loading,
        error: state.error,
        reloadOrders: loadOrders
    };

    return (
        <SupplierContext.Provider value={value}>
            {children}
        </SupplierContext.Provider>
    );
};

// Custom hook for using the context
export const useSuppliers = () => useContext(SupplierContext);
