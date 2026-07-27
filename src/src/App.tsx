import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import Layout from './components/Layout';
import Home from './pages/Home';
import Vote from './pages/Vote';
import Results from './pages/Results';
import CreateSession from './pages/CreateSession';
import { WalletProvider } from './hooks/useWallet';

function App() {
  return (
    <WalletProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="vote" element={<Vote />} />
            <Route path="results" element={<Results />} />
            <Route path="create" element={<CreateSession />} />
          </Route>
        </Routes>
        <Toaster position="top-right" richColors />
      </BrowserRouter>
    </WalletProvider>
  );
}

export default App;
