"use client";

import React, { useEffect, useState } from "react";
import { useConnect } from "@stacks/connect-react";
import { StacksTestnet, StacksDevnet } from "@stacks/network";
import {
  AnchorMode,
  PostConditionMode,
  stringAsciiCV,
  uintCV,
  principalCV,
} from "@stacks/transactions";
import { userSession } from "./ConnectWallet";

const ContractCallVote = () => {
  const { doContractCall } = useConnect();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  function buildAddTraitsURL(url, { userHash, topic, title, length }) {
    const baseUrl = new URL(url);
    baseUrl.searchParams.append("user_hash", userHash);
    baseUrl.searchParams.append("topic", topic);
    baseUrl.searchParams.append("title", title);
    baseUrl.searchParams.append("length", length);

    return baseUrl.href;
  }

  function mint({ songName, topic, length }) {
    doContractCall({
      network: new StacksDevnet(),
      anchorMode: AnchorMode.Any,
      contractAddress: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
      contractName: "non-fungible-token",
      functionName: "mint",
      functionArgs: [
        // TODO: read this from user session of the connected wallet user
        principalCV("STZ5MHA69PWEB7ZK1RTGFE5YFETFX78ZF9JN1FV6"),
      ],
      postConditionMode: PostConditionMode.Deny,
      postConditions: [],
      onFinish: (data) => {
        console.log("onFinish:", data);
        // We're using the wallet address as the user ID
        // If more time, probably should check whether we're in mainnet or testnet, so we grab
        // the correct wallet ID accordingly depending on the environment we're in
        const userHash = userSession.loadUserData().profile.stxAddress.testnet;
        const addTraitUrl = buildAddTraitsURL(
          "http://localhost:5000/nft/addTrait",
          {
            userHash,
            title: "Bohemian Rhapsody",
            length: 236,
            topic: "rocknroll",
          }
        );
        fetch(addTraitUrl);

        window
          .open(
            `http://localhost:8000/txid/${data.txId}?chain=testnet`,
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
    <div className="Container">
      <h3>Register ownership of your song by minting it into an NFT</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const songFile = formData.get("song");

          mint({ songName: songFile.name, topic: "rocknroll", length: 323 });
        }}
      >
        <input type="file" name="song" id="song" />
        <button className="Vote" type="submit">
          Mint
        </button>
      </form>
    </div>
  );
};

export default ContractCallVote;
