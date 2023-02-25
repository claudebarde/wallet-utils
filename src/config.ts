import { bytes2Char } from "@taquito/utils";

export default {
  rpcUrl: "https://ghostnet.ecadinfra.com",
  outputPayload: (payload: Array<string>) => {
    if (payload[0] === "Tezos Signed Message:") {
      return payload.join(" ");
    } else {
      return "Wrong payload to output";
    }
  },
  validatePayload: (payload: string) => {
    const input = bytes2Char(payload);
    const head = input.slice(0, 22);
    if (head === "Tezos Signed Message: ") {
      const tail = input.slice(22);
      const [url, date, ...rest] = tail.split(" ");
      // validates the URL
      const urlRegex = new RegExp(
        "[(http(s)?):\\/\\/(www\\.)?a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)"
      );
      if (urlRegex.test(url)) {
        // validates the date
        const dateRegex = new RegExp(
          "^(?<year>-?(?:[1-9][0-9]*)?[0-9]{4})-(?<month>1[0-2]|0[1-9])-(?<day>3[01]|0[1-9]|[12][0-9])T(?<hour>2[0-3]|[01][0-9]):(?<minute>[0-5][0-9]):(?<second>[0-5][0-9])(?<ms>.[0-9]+)?(?<timezone>Z|[+-](?:2[0-3]|[01][0-9]):[0-5][0-9])?$"
        );
        if (dateRegex.test(date)) {
          return {
            result: true,
            payload: ["Tezos Signed Message:", url, date, rest.join(" ")]
          };
        } else {
          console.log("date is wrong");
          return { result: false, payload: [] };
        }
      } else {
        console.log("url is wrong");
        return { result: false, payload: [] };
      }
    } else {
      console.log("no Tezos Signed Message: ");
      return { result: false, payload: [] };
    }
  }
};
