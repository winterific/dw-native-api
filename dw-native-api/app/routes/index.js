const router = require('express').Router()
const { spawn } = require('child_process')
module.exports = router

router.route('/evaluate')
.post((req, res, next) => {
  try {
    const model = req.body
    if (!model || !model.input || !model.inputmimetype || !model.transform || !model.outputmimetype) {
      res.status(400).send('Invalid or missing parameters.')
      return
    }
    // Invoke dw native command to get the output
    const dw = spawn('dw', [`"${model.transform}"`])
    let output = ''
    dw.stdout.on('data', data => {
      output += data
    });
    dw.on('close', code => {
      res.setHeader('Content-Type', model.outputmimetype)
      res.send(output)
    });
    dw.stdin.write(model.input)
    dw.stdin.end()
  }
  catch (err) {
    res.status(500).json(err)
  }
})