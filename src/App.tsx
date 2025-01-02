import { Outlet } from 'react-router';
import Header from './components/Header';

function App() {
  return (
    <>
      <Header />
      <Outlet />
      {/* <Footer /> */}
    </>
  );
}

export default App;
