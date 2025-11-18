import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/dashboard";
import TaskDetail from "./components/widgets/taskdetails";
import Login from "./pages/login";
import ProtectedRouter from "./components/ProtectedRouter";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
         path="/" 
         element={
           <ProtectedRouter>
           <Layout />
           </ProtectedRouter>
           }>
          <Route index element={<Dashboard />} />
          {/* <Route path="/dashboard/task/:id" element={<TaskDetail />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}
