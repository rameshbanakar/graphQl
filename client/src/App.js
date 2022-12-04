
import './App.css';
import CreateQuote from './component/CreateQuote';
import Home from './component/Home';
import Login from './component/Login';
import Profile from './component/Profile';
import SignUp from './component/SignUp';
import NavBar from './component/NavBar';
import OtherUserProfile from './component/OtherUserProfile';
import{BrowserRouter,Route,Routes} from "react-router-dom"
import NotFound from './component/NotFound';
function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signin" element={<SignUp />} />
        <Route path="/create" element={<CreateQuote />} />
        <Route path="/profile/:userid" element={<OtherUserProfile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
