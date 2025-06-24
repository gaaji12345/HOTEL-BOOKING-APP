
import './App.css'
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import Layout from "./layout/Layout.tsx";
import Register from "./pages/Register.tsx";

function App() {
  // const [count, setCount] = useState(0)

  return (

    <Router>
        <Routes>
            <Route path="/" element={<Layout>
                <p>Home page</p>
            </Layout>} />
            <Route path="/search" element={<Layout>
                <p>Search page</p>
            </Layout>}/>
            <Route path="*" element={<Navigate to="/"/>}/>

            <Route path="/register" element={<Layout>
                <Register/>
            </Layout>}/>



        </Routes>

    </Router>

  )
}

export default App
