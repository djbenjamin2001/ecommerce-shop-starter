import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Creating the context
const ProductContext = createContext();

// Define the initial state of the context
const initialState = {
    products: [],
    loading: false,
    error: null
};


// Define a reducer for updating the state based on dispatched actions
function productReducer(state, action) {
    switch (action.type) {
        case 'FETCH_PRODUCTS_START':
            return { ...state, loading: true, error: null };
        case 'FETCH_PRODUCTS_SUCCESS':
            return { ...state, loading: false, products: action.payload };
        case 'FETCH_PRODUCTS_ERROR':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}

// Create the provider component
export const ProductProvider = ({ children }) => {
    const [state, dispatch] = useReducer(productReducer, initialState);

    // Function to load products from the Fake Store API
    const loadProducts = async () => {
        dispatch({ type: 'FETCH_PRODUCTS_START' });
        try {
            // Use the Fake Store API URL to fetch products
            const response = await fetch('http://localhost:3000/products');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            dispatch({ type: 'FETCH_PRODUCTS_SUCCESS', payload: data });
        } catch (error) {
            dispatch({ type: 'FETCH_PRODUCTS_ERROR', payload: error.toString() });
        }
    };

    // Load products when the provider is mounted
    useEffect(() => {
        loadProducts();
    }, []);

    // The value that will be passed to the context
    const value = {
        products: state.products,
        loading: state.loading,
        error: state.error,
        reloadProducts: loadProducts
    };

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    );
};

// Custom hook for using the context
export const useProducts = () => useContext(ProductContext);
