import { Routes, Route } from 'react-router-dom'
import './App.css'
import NotFound from './modules/notFound/NotFound'
import Header from './Shared/components/Header'
import Home from './modules/home/Home'
import Footer from './Shared/components/Footer'
import SignUp from './auth/components/SignUp'
import LogIn from './auth/components/LogIn'
import { ProtectedRoutes } from './routes/ProtectedRoutes'
import { PublicRoutes } from './routes/PublicRoutes'
function App() {

  return (
    <>


        <Header />
          <Routes>
            <Route element={<PublicRoutes />}>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<LogIn />} />
            </Route>

            <Route element={<ProtectedRoutes />}>
              <Route path="/" element={<Home />} />
              
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
    

        <Footer />

   



    </>

  )
}

export default App
