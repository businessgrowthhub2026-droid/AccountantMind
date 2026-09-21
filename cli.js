const readline = require("readline");

const {
  loadModel,
  completion,
  unloadModel,
  LLAMA_3_2_1B_INST_Q4_0
} = require("@qvac/sdk");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function main() {
  console.log("");
  console.log("=================================");
  console.log("   AccountWise CLI");
  console.log("   QVAC Local AI Accounting Tutor");
  console.log("=================================");
  console.log("");

  console.log("Loading QVAC model...");

  const modelId = await loadModel({
    modelSrc: LLAMA_3_2_1B_INST_Q4_0,
    modelType: "llm",
    modelConfig: {
      ctx_size: 4096
    },
    onProgress: (p) => {
      process.stdout.write(
        `\rDownloading model: ${p.percentage.toFixed(0)}%`
      );
    }
  });

  console.log("");
  console.log("QVAC model loaded.");
  console.log("");

  const notes = await ask("Paste your accounting notes:\n> ");

  if (!notes.trim()) {
    console.log("No notes entered.");
    await unloadModel({ modelId, clearStorage: false });
    rl.close();
    return;
  }

  const question = await ask("\nAsk your accounting question:\n> ");

  if (!question.trim()) {
    console.log("No question entered.");
    await unloadModel({ modelId, clearStorage: false });
    rl.close();
    return;
  }

  console.log("\nQVAC is thinking...\n");

  const prompt = `
You are an accounting tutor.

Use the student's notes as your main source.

Answer the student's question clearly and simply.

Keep the answer concise:
- Give the direct answer first.
- Explain the concept briefly.
- Use a simple example only when helpful.
- Do not repeat the question.
- Do not add unnecessary information.

If the notes do not contain enough information, say so.

STUDENT'S ACCOUNTING NOTES:
${notes}

STUDENT'S QUESTION:
${question}

Give the accounting tutor answer now.
`;

  const result = await completion({
    modelId,
    history: [
      {
        role: "user",
        content: prompt
      }
    ],
    generationParams: {
      temp: 0.2,
      predict: 500
    }
  });

  const answer = await result.text;

  console.log("=================================");
  console.log("QVAC ACCOUNTING TUTOR");
  console.log("=================================");
  console.log(answer);
  console.log("=================================");

  await unloadModel({
    modelId,
    clearStorage: false
  });

  rl.close();
}

main().catch((error) => {
  console.error("\nQVAC ERROR:");
  console.error(error);
  rl.close();
});