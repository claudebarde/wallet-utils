export default {
  rpcUrl: "https://ghostnet.ecadinfra.com",
  outputPayload: (payload: Array<string>) => {
    if (payload[0] === "Tezos Signed Message:") {
      return payload.join(" ");
    } else {
      return "Wrong payload to output";
    }
  }
};
