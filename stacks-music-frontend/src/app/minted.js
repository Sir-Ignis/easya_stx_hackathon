"use client";

import React, { Component, useEffect, useState } from "react";
import { useConnect } from "@stacks/connect-react";
import { StacksDevnet } from "@stacks/network";
import {
  AnchorMode,
  PostConditionMode,
  stringAsciiCV,
  uintCV,
  principalCV
} from "@stacks/transactions";
import { userSession } from "../components/ConnectWallet"

//fix me
/*
const Minted = () => {
  const { doContractCall } = useConnect();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  function getMetaData() {
    doContractCall({
      network: new StacksDevnet(),
      anchorMode: AnchorMode.Any,
      contractAddress: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
      contractName: "non-fungible-token",
      functionName: "mint",
      functionArgs: [principalCV("STZ5MHA69PWEB7ZK1RTGFE5YFETFX78ZF9JN1FV6"),stringAsciiCV("Hackathon"),stringAsciiCV("EasyA"),uintCV(120)],
      postConditionMode: PostConditionMode.Deny,
      postConditions: [],
      onFinish: (data) => {
        console.log("onFinish:", data);
        window
          .open(
            `http://localhost:3000/minted`, //`http://localhost:8000/txid/${data.txId}?chain=testnet`,
            "_blank" 
          )
          .focus();
      },
      onCancel: () => {
        console.log("onCancel:", "Transaction was canceled");
      },
    });
  }

  if (!mounted || !userSession.isUserSignedIn()) {
    return null;
  }

  return (
	<main className={styles.main}>
	<div className="container">
		<h1 className="greenText">Your NFT Has been minted with stacks</h1>
		<button className="Connect" onClick={() => getMetaData()}>Get Metadata</button>
		<h1 className="NFTID"></h1>
	</div>
	</main>
  );
};

export default Minted;
*/

const Minted = () => {
	<main className={styles.main}>
	<div className="container">
		<h1 className="greenText">Your NFT Has been minted with stacks</h1>
	</div>
	</main>
};

export default Minted;
