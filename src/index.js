import React from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';
import { clientId } from './defaults';
import './index.css';

createRoot(document.getElementById('root')).render(
    <GoogleOAuthProvider clientId={clientId}>
        <App />
    </GoogleOAuthProvider>
);