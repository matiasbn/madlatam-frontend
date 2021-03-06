const DOMAIN_TYPE = [
  {
    type: "string",
    name: "name",
  },
  {
    type: "string",
    name: "version",
  },
  {
    type: "uint256",
    name: "chainId",
  },
  {
    type: "address",
    name: "verifyingContract",
  },
];

const EIP721 = {
  createTypeData(domainData, primaryType, message, types) {
    return {
      types: { EIP712Domain: DOMAIN_TYPE, ...types },
      domain: domainData,
      primaryType,
      message,
    };
  },

  async signTypedData(provider, from, data) {
    const msgData = JSON.stringify(data);
    const sig = await provider.send("eth_signTypedData_v4", [from, msgData]);
    const sig0 = sig.substring(2);
    const r = "0x" + sig0.substring(0, 64);
    const s = "0x" + sig0.substring(64, 128);
    const v = parseInt(sig0.substring(128, 130), 16);
    return {
      data,
      sig,
      v,
      r,
      s,
    };
  },
};

export default EIP721;
