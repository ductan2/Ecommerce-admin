import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import "../public/assets/css/main.css"
import './index.css'
import 'sweetalert2/src/sweetalert2.scss'

import { store } from "./store/store.ts"
import { Provider } from "react-redux"
import Modal from 'react-modal';
import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();

Modal.setAppElement('#root')
ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <App />
    </Provider>
  </QueryClientProvider>
)
