import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'

import { RoutePath } from './enums'

import { MainPage } from './pages/main-page'
import { InfoPage } from './pages/info-page'
import { GeneralLayout } from './components/general-layout'
import { useContext, useEffect } from 'react'
import { PortfolioContext } from './context'

export const App = () => {
    const context = useContext(PortfolioContext)
    useEffect(() => {
        context.init()
    }, [])

    return (
        <HashRouter>
            <Routes>
                <Route element={<GeneralLayout />}>
                    <Route path={RoutePath.main} element={<MainPage />} />
                    <Route path={RoutePath.coinInfo} element={<InfoPage />} />
                    <Route
                        path={RoutePath.fallback}
                        element={<Navigate to={RoutePath.main} />}
                    />
                </Route>
            </Routes>
        </HashRouter>
    )
}
