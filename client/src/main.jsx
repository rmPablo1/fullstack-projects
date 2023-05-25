import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Provider} from "./context/postContext.jsx"
import {BrowserRouter} from "react-router-dom"
ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <Provider>
        <App />
      </Provider>
    </BrowserRouter>,
)
