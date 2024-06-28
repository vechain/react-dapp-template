import { AppConfig } from ".";
const config: AppConfig = {
  environment: "solo-staging",
  basePath: "https://example.app",
  inboxContractAddress: "",
  nodeUrl: "https://thor-solo.dev.b3tr.vechain.org",
  network: {
    id: "solo-staging",
    name: "solo-staging",
    type: "solo",
    defaultNet: true,
    urls: ["https://thor-solo.dev.b3tr.vechain.org"],
    explorerUrl: "https://insight.dev.b3tr.vechain.org/#/solo",
    blockTime: 10000,
    genesis: {
      number: 0,
      id: "0x00000000c05a20fbca2bf6ae3affba6af4a74b800b585bf7a4988aba7aea69f6",
      size: 170,
      parentID:
        "0xffffffff53616c757465202620526573706563742c20457468657265756d2100",
      timestamp: 1530316800,
      gasLimit: 10000000,
      beneficiary: "0x0000000000000000000000000000000000000000",
      gasUsed: 0,
      totalScore: 0,
      txsRoot:
        "0x45b0cfc220ceec5b7c1c62c4d4193d38e4eba48e8815729ce75f9c0ab0e4c1c0",
      txsFeatures: 0,
      stateRoot:
        "0x93de0ffb1f33bc0af053abc2a87c4af44594f5dcb1cb879dd823686a15d68550",
      receiptsRoot:
        "0x45b0cfc220ceec5b7c1c62c4d4193d38e4eba48e8815729ce75f9c0ab0e4c1c0",
      signer: "0x0000000000000000000000000000000000000000",
      isTrunk: true,
      transactions: [],
    },
  },
};
export default config;
