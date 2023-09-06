function walletDisconnect() {
  showMsg("Disconnected from wallet", true);
  localStorage.removeItem("wallet");
}

// Set Up wallet
export async function setupWallet(wallet = "nautilus") {
  if (typeof ergo_request_read_access === "undefined") {
    showMsg("You must install Nautilus Wallet to be able to connect.", true);
  } else {
    window.removeEventListener("ergo_wallet_disconnected", walletDisconnect);
    window.addEventListener("ergo_wallet_disconnected", walletDisconnect);

    if (!ergoConnector[wallet]) {
      return "denied";
    }

    let hasAccess = await ergoConnector[wallet].isConnected();
    if (!hasAccess) {
      let granted = await ergoConnector[wallet].connect();
      if (!granted) {
        localStorage.removeItem("wallet");
      } else {
        console.log("connected");
        return true;
      }
    } else return true;
  }
  return false;
}

export async function getWalletAddresses() {
  let res = await setupWallet("nautilus");

  if (res && res !== "denied") {
    const addresses = (await ergo.get_used_addresses()).concat(
      await ergo.get_unused_addresses()
    );
    try {
      return addresses;
    } catch {
      console.log("error");
      return "error";
    }
  }
  return null;
}

export async function signTx(transaction_to_sign) {
  let tx;
  try {
    tx = await ergo.sign_tx(transaction_to_sign);
  } catch (e) {
    return;
  }
  const txId = await ergo.submit_tx(tx);

  if (true) {
    if (txId !== undefined && txId.length > 0) console.log("complete");
    else console.log("Error while sending funds!");
  }
  return txId;
}

export function friendlyAddress(addr, tot = 13) {
  if (addr === undefined || addr.slice === undefined) return "";
  return addr.slice(0, tot) + "..." + addr.slice(-tot);
}
