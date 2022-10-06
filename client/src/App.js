import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/home/Home';
import List from './pages/list/List';
import Property from './pages/property/Property';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<List />} />
        <Route path="/hotels/:id" element={<Property />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
