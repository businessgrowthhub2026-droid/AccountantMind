const {
  loadModel,
  completion,
  unloadModel,
  LLAMA_3_2_1B_INST_Q4_0
} = require("@qvac/sdk");

async function main() {
  console.log("Loading QVAC model...");

  const modelId = await loadModel({
    modelSrc: LLAMA_3_2_1B_INST_Q4_0,
    modelType: "llm",
    modelConfig: {
      ctx_size: 4096
    },
    onProgress: (p) => {
      console.log(`Downloading model: ${p.percentage.toFixed(0)}%`);
    }
  });

  console.log("\nModel loaded:", modelId);
  console.log("Asking accounting question...\n");

  const result = await completion({
    modelId,
    history: [
      {
        role: "user",
        content: "In one short sentence, what is an asset in accounting?"
      }
    ],
    generationParams: {
      temp: 0.2,
      predict: 100
    }
  });

  const answer = await result.text;

  console.log("QVAC ANSWER:");
  console.log(answer);

  await unloadModel({
    modelId,
    clearStorage: false
  });
}

main().catch((error) => {
  console.error("\nQVAC ERROR:");
  console.error(error);
});