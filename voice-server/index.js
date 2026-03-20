const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const app = express();
const PORT = 9091;

app.use(cors());
app.use(bodyParser.json());

app.post('/speak', (req, res) => {
  const { text, voice = 'slt' } = req.body;
  if (!text) return res.status(400).send('No text provided');

  const tempFile = path.join(os.tmpdir(), `lotus_voice_${Date.now()}.wav`);
  
  // Clean text for shell safety
  const safeText = text.replace(/["']/g, '');
  
  console.log(`[Lotus Voice] Synthesizing: "${safeText.substring(0, 30)}..."`);

  // flite -voice SLT -t "text" -o output.wav
  const command = `flite -voice ${voice} -t "${safeText}" -o ${tempFile}`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`[Lotus Voice] Error: ${stderr}`);
      return res.status(500).send('Synthesis failed');
    }

    // Send the file back to the browser
    res.sendFile(tempFile, () => {
      // Cleanup after sending
      fs.unlink(tempFile, (err) => {
        if (err) console.error(`[Lotus Voice] Cleanup error: ${err}`);
      });
    });
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[Lotus Voice Server] Ready at http://0.0.0.0:${PORT}`);
});
