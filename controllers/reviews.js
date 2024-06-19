const { Review } = require('../models/Index')



const createReview = async(req, res) => {
    try {
      const review = new Review(req.body);
      await review.save();
      res.send(review)
        } catch (err) {
          console.error(err)
        }
  }


const getAllReviews = async (req, res) => {
  try {
    const { roomid } = req.params;
    const reviews = await Review.find({ room: roomid }).populate('user')
      
    res.send(reviews)
  } catch (error) {
    console.log(error)
    res.status(500).send('Error fetching reviews')
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
  deleteReview,
  createReview
}


