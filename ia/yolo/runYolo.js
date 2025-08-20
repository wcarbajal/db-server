const { spawn } = require('child_process');

function runYolo(imagePath) {
  return new Promise((resolve, reject) => {
    const process = spawn('python', ['yolo_detect.py', imagePath], { cwd: __dirname });

    let data = '';
    process.stdout.on('data', chunk => data += chunk);
    process.stderr.on('data', err => console.error('YOLO error:', err.toString()));

    process.on('close', code => {
      if (code !== 0) return reject(new Error('YOLO process failed'));
      try {
        resolve(JSON.parse(data));
      } catch (e) {
        reject(e);
      }
    });
  });
}

module.exports = { runYolo };


/* para el font-end */

/* 

const { runYolo } = require('../yolo-utils');

router.post('/analizar-diagrama', async (req, res) => {
  const { path } = req.file;
  try {
    const elementos = await runYolo(path);
    // ...analiza elementos y responde...
    res.json({ elementos });
  } catch (e) {
    res.status(500).json({ error: 'Error ejecutando YOLO' });
  }
});

*/