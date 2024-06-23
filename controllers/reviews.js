const { Review } = require('../models/Index')

//create one review
const createReview = async (req, res) => {
  try {
    const review = new Review(req.body)
    await review.save()
    res.send(review)
  } catch (err) {
    console.error(err)
  }
}


//get all review for a specific room 
const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ room: req.params.roomid }).populate(
      'user'
    )

    if (!reviews) {
      return res.status(404).send('No reviews found')
    }

    res.send(reviews)
  } catch (error) {
    console.log(error)
    res.status(500).send('Error fetching reviews')
  }
}

module.exports = {
  getAllReviews,
  createReview
}
