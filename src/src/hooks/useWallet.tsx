import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

interface WalletState {
  isConnected: boolean;
  address: string | null;
  balance: string | null;
  isConnecting: boolean;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
}

const WalletContext = createContext<WalletState | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    // Check if wallet is already connected
    const checkConnection = async () => {
      try {
        // Check for Lace wallet or other Midnight-compatible wallets
        if ((window as any).midnight) {
          const accounts = await (window as any).midnight.request({ method: 'eth_accounts' });
          if (accounts && accounts.length > 0) {
            setIsConnected(true);
            setAddress(accounts[0]);
            // Get balance
            const bal = await (window as any).midnight.request({ 
              method: 'eth_getBalance', 
              params: [accounts[0], 'latest'] 
            });
            setBalance(bal);
          }
        }
      } catch (error) {
        console.error('Error checking wallet connection:', error);
      }
    };

    checkConnection();
  }, []);

  const connect = async () => {
    setIsConnecting(true);
    try {
      // Request wallet connection
      if ((window as any).midnight) {
        const accounts = await (window as any).midnight.request({ 
          method: 'eth_requestAccounts' 
        });
        
        if (accounts && accounts.length > 0) {
          setIsConnected(true);
          setAddress(accounts[0]);
          
          const bal = await (window as any).midnight.request({ 
            method: 'eth_getBalance', 
            params: [accounts[0], 'latest'] 
          });
          setBalance(bal);
          
          toast.success('Wallet connected successfully!');
        }
      } else {
        toast.error('No Midnight wallet found. Please install Lace wallet.');
        // Redirect to wallet installation
        window.open('https://chromewebstore.google.com/detail/lace-midnight-preview/hgeekaiplokcnmakghbdfbgnlfheichg', '_blank');
      }
    } catch (error: any) {
      console.error('Error connecting wallet:', error);
      toast.error(error.message || 'Failed to connect wallet');
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = async () => {
    try {
      setIsConnected(false);
      setAddress(null);
      setBalance(null);
      toast.info('Wallet disconnected');
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
      toast.error('Failed to disconnect wallet');
    }
  };

  const value: WalletState = {
    isConnected,
    address,
    balance,
    isConnecting,
    connect,
    disconnect,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}
