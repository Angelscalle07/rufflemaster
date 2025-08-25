import { ethers } from "ethers";

export async function connectWallet() {
  if (typeof window.ethereum === "undefined") {
    alert("⚠️ Metamask no está instalado");
    return null;
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    return accounts[0];
  } catch (error) {
    console.error("Error conectando la wallet:", error);
    return null;
  }
}

