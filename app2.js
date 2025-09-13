import { useState } from "react";
import { ethers } from "ethers";
import { contractAddress, contractABI } from "./contract";

function App() {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState("");
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");

  let provider, signer, contract;

  async function connectWallet() {
    if (window.ethereum) {
      provider = new ethers.BrowserProvider(window.ethereum);
      signer = await provider.getSigner();
      const acc = await signer.getAddress();
      setAccount(acc);
      contract = new ethers.Contract(contractAddress, contractABI, signer);
    } else {
      alert("MetaMask نصب نیست!");
    }
  }

  async function getBalance() {
    provider = new ethers.BrowserProvider(window.ethereum);
    signer = await provider.getSigner();
    contract = new ethers.Contract(contractAddress, contractABI, signer);
    const bal = await contract.balanceOf(account);
    setBalance(ethers.formatUnits(bal, 18));
  }

  async function transferTokens() {
    provider = new ethers.BrowserProvider(window.ethereum);
    signer = await provider.getSigner();
    contract = new ethers.Contract(contractAddress, contractABI, signer);
    const tx = await contract.transfer(to, ethers.parseUnits(amount, 18));
    await tx.wait();
    alert("انتقال موفق بود!");
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>MyToken Dapp</h2>
      <button onClick={connectWallet}>اتصال به کیف پول</button>
      <p>آدرس متصل: {account}</p>

      <button onClick={getBalance}>نمایش موجودی</button>
      <p>موجودی: {balance} MTK</p>

      <h3>انتقال توکن</h3>
      <input placeholder="آدرس گیرنده" onChange={e => setTo(e.target.value)} />
      <input placeholder="مقدار" onChange={e => setAmount(e.target.value)} />
      <button onClick={transferTokens}>ارسال</button>
    </div>
  );
}

export default App;
