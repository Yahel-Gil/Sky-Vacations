// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Layout } from './Components/LayoutArea/Layout/Layout'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './Redux/Store'
import { interceptor } from './Utils/Interceptor'

interceptor.create();

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Provider store={store}>
            <Layout />
        </Provider>
    </BrowserRouter>
)
