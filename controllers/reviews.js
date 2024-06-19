const { Review } = require('../models/Index')

const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
    res.send(reviews)
  } catch (error) {
    console.log(error)
    res.status(500).send('Internal Server Error')
  }
}



const deleteReview = async (req, res) => {
  try {
    await Review.deleteOne({ _id: req.params.id })
    res.send({
      msg: 'Review Deleted',
      payload: req.params.id,
      status: 'Ok'
    })
  } catch (error) {
    console.log(error)
    res.status(500).send('Internal Server Error')
  }
}

module.exports = {
  getAllReviews,
  deleteReview
}


router.post('/reviews/:roomid', reservCtrl.createReview)

