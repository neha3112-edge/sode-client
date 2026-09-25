const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('C:/Users/Shivangi_pc/.gemini/antigravity-ide/brain/9540c737-b84a-480c-a1ce-127dd775ff80/.system_generated/logs/transcript.jsonl')
});

rl.on('line', (line) => {
  if (line.includes('"step_index":657')) {
    const obj = JSON.parse(line);
    console.log("Step 657 tool_calls:", JSON.stringify(obj.tool_calls, null, 2));
    console.log("Step 657 thinking preview:", (obj.thinking || "").slice(0, 500));
  }
});
