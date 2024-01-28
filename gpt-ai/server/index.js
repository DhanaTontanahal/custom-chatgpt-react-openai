const OpenAI = require("openai");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const openai = new OpenAI({
  apiKey: "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",
});

const app = express();
const port = 3080;

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get("/test", async (req, res) => {
  res.json({ data: "Response success" });
});

app.post("/", async (req, res) => {
  console.log("==========================================");
  const { message } = req.body;
  console.log(message);
  const completion = await openai.chat.completions.create({
    messages: message,
    model: "gpt-3.5-turbo-1106",
    response_format: { type: "json_object" },
  });

  res.json({
    data: completion.choices[0].message.content,
  });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
