import ReactDOM from 'react-dom/client'
import { App } from './App'
import './index.scss'
import { PortfolioContextProvider } from './context'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <PortfolioContextProvider>
        <App />
    </PortfolioContextProvider>
)
