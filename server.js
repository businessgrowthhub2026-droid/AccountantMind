const http = require("http");
const fs = require("fs");
const path = require("path");

const {
  loadModel,
  completion,
  unloadModel,
  LLAMA_3_2_1B_INST_Q4_0
} = require("@qvac/sdk");

const PORT = 3000;
const PUBLIC_DIR = path.join(__dirname, "public");

let modelId = null;

async function startAI() {
  console.log("Loading QVAC Accounting Tutor model...");

  modelId = await loadModel({
    modelSrc: LLAMA_3_2_1B_INST_Q4_0,
    modelType: "llm",
    modelConfig: {
      ctx_size: 4096
    },
    onProgress: (p) => {
      console.log(`Downloading model: ${p.percentage.toFixed(0)}%`);
    }
  });

  console.log("QVAC model loaded:", modelId);
}

async function answerQuestion(notes, question) {
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

  return await result.text;
}

const server = http.createServer(async (req, res) => {
  if (req.method === "POST" && req.url === "/api/ask") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", async () => {
      try {
        const data = JSON.parse(body);

        const notes = data.notes || "";
        const question = data.question || "";

        if (!notes.trim() || !question.trim()) {
          res.writeHead(400, {
            "Content-Type": "application/json"
          });

          res.end(JSON.stringify({
            error: "Notes and question are required."
          }));

          return;
        }

        console.log("Student question:", question);

        const answer = await answerQuestion(notes, question);

        res.writeHead(200, {
          "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
          answer
        }));

      } catch (error) {
        console.error("AI ERROR:", error);

        res.writeHead(500, {
          "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
          error: error.message
        }));
      }
    });

    return;
  }

  let filePath = req.url === "/"
    ? path.join(PUBLIC_DIR, "index.html")
    : path.join(PUBLIC_DIR, req.url);

  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }

    const ext = path.extname(filePath);

    const contentTypes = {
      ".html": "text/html",
      ".css": "text/css",
      ".js": "application/javascript"
    };

    res.writeHead(200, {
      "Content-Type": contentTypes[ext] || "text/plain"
    });

    res.end(data);
  });
});

async function main() {
  try {
    await startAI();

    server.listen(PORT, () => {
      console.log("");
      console.log(`Accounting Tutor running at http://localhost:${PORT}`);
      console.log("AI inference is running locally on this computer.");
    });

  } catch (error) {
    console.error("Failed to start QVAC:");
    console.error(error);
  }
}

process.on("SIGINT", async () => {
  console.log("\nShutting down...");

  if (modelId) {
    await unloadModel({
      modelId,
      clearStorage: false
    });
  }

  process.exit(0);
});

main();