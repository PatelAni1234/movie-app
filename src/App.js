import Header from "./components/Header/Header";
import SimpleBottomNavigation from "./components/MainNav";
import { BrowserRouter, Route ,Routes } from "react-router-dom";
import "./App.css";
import { Container  } from "@material-ui/core";
import Trending from "./pages/Trending/Trending";
import Movies from "./pages/Movies/Movies";
import Series from "./pages/Series/Series";
import Search from "./pages/Search/Search";


function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="app">
        
        <Container>
          <Routes>
           <Route path="/" Component={Trending} exact/>
           <Route path="/Movies" Component={Movies}/>
           <Route path="/Series" Component={Series}/>
           <Route path="/Search" Component={Search}/>
          </Routes>
        </Container>
      </div>
      <SimpleBottomNavigation/>
    </BrowserRouter>
  );
}

export default App;
