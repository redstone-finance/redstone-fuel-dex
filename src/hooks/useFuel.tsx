import { useEffect, useState } from "react";
import { Provider, Wallet, WalletLocked, WalletUnlocked } from "fuels";
import { FuelWalletLocked } from "@fuel-wallet/sdk";
import { FUEL_RPC_URL } from "../config/constants";

export const useFuel = () => {
  const [fuel, setFuel] = useState<Window["fuel"]>();
  const [wallet, setWallet] = useState<
    WalletLocked | WalletUnlocked | undefined
  >(undefined);
  const [walletAddress, setWalletAddress] = useState("");
  const [_, setIsConnecting] = useState(false);

  useEffect(() => {
    const onFuelLoaded = () => {
      setFuel(window.fuel);
    };

    if (window.fuel) {
      onFuelLoaded();
    }

    document.addEventListener("FuelLoaded", onFuelLoaded);

    return () => {
      document.removeEventListener("FuelLoaded", onFuelLoaded);
    };
  }, []);

  const usePrivateKey = async (privateKey: string) => {
    const provider = new Provider(FUEL_RPC_URL);
    let newWallet = undefined;

    try {
      newWallet = await Wallet.fromPrivateKey(privateKey, provider);
    } catch (e: any) {
      console.error(e);
    }

    if (newWallet && newWallet.address) {
      setWalletAddress(newWallet.address.toString());
    }

    return setWallet(newWallet);
  };

  const connectWallet = async (): Promise<unknown> => {
    if (wallet) {
      return;
    }

    setIsConnecting(true);
    setWallet(undefined);

    if (!fuel) {
      return;
    }

    const isConnected = await fuel.connect();

    if (!isConnected) {
      return setIsConnecting(false);
    }

    let newWallet: FuelWalletLocked | undefined = undefined;

    try {
      const account = await fuel.currentAccount();
      newWallet = await fuel.getWallet(account);
    } catch (error: any) {
      console.log(error); // Mostly in case when the only one of the accounts is connected.

      await fuel.disconnect();
      return await connectWallet();
    }

    if (!newWallet) {
      return setIsConnecting(false);
    }

    try {
      setWalletAddress(newWallet.address.toString());
      setIsConnecting(false);

      return setWallet(newWallet);
    } catch (error: any) {
    } finally {
      setIsConnecting(false);
    }
  };

  useEffect(() => {
    function reload() {
      window.location.reload();
    }

    fuel?.on(fuel.events.accounts, reload);
    fuel?.on(fuel.events.currentAccount, (account) => {
      if (!wallet || account == wallet?.address.toString()) {
        return;
      }
      reload();
    });
    fuel?.on(fuel.events.network, reload);
  }, [fuel, wallet, walletAddress]);

  return {
    wallet,
    connectWallet,
    walletAddress,
    usePrivateKey,
  };
};
