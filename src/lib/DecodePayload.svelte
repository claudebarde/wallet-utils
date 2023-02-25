<script lang="ts">
  import store from "../store";
  import config from "../config";

  let input =
    "54657a6f73205369676e6564204d6573736167653a2068747470733a2f2f74657a6f737461717569746f2e696f2f20323032332d30322d32355431303a34383a30302e3030305a2074657374206d657373616765";
  let output: Array<string> = [];
  let isPayloadVerified = false;
  let decoded = false;

  const decode = () => {
    const { result, payload } = config.validatePayload(input);
    if (result === true) {
      output = payload;
      decoded = true;
    } else {
      decoded = false;
    }

    isPayloadVerified = true;
  };
</script>

<style lang="scss">
  .inputs {
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .payload-output {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 90%;

    p {
      width: 100%;
      text-align: left;
    }
  }
</style>

<div class="action-container">
  <h1>Decode a payload</h1>
  <h3>Insert a payload in bytes below</h3>
  <p>This will tell you if the bytes are correctly formatted</p>
  <label for="payload-input">
    <span>Payload:</span>
    <textarea
      id="payload-input"
      bind:value={input}
      on:input={() => (isPayloadVerified = false)}
    />
  </label>
  <button class="primary" on:click={decode}> Decode </button>
  {#if isPayloadVerified && output.length === 4}
    <div class="payload-output">
      {#if decoded}
        <p style="color:green">Payload is valid</p>
        <p>
          {output.join(" ")}
        </p>
      {:else}
        <p style="color:red">Payload is invalid</p>
      {/if}
    </div>
  {/if}
</div>
