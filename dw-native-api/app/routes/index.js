const router = require('express').Router()
module.exports = router

router.route('/evaluate')
.post((req, res, next) => {
  try{
    const model = req.body
    if (!model || !model.input || !model.inputmimetype || !model.transform || !model.outputmimetype) {
      res.status(400).send('Invalid or missing parameters.')
      return
    }

    // TODO: invoke dw native command to get the output
    res.setHeader('Content-Type', model.inputmimetype)
    res.send(model.input)
  }
  catch (err) {
    res.status(500).json(err)
  }
})