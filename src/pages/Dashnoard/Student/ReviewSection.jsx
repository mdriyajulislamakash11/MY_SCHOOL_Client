import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../../hook/useAxiosPublic";
import useAuth from "../../../hook/useAuth";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const ReviewSection = ({ sessionId }) => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);

  // Fetch reviews
  useEffect(() => {
    axiosPublic.get(`/reviews/${sessionId}`).then((res) => {
      setReviews(res.data);
    });
  }, [sessionId, axiosPublic]);

  // Star rendering
  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) =>
      i < rating ? (
        <AiFillStar key={i} className="text-yellow-400 inline" />
      ) : (
        <AiOutlineStar key={i} className="text-gray-300 inline" />
      )
    );

  // Submit review
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!reviewText || !rating) {
      alert("Please write a review and give a rating!");
      return;
    }

    const reviewData = {
      studentName: user?.displayName || "Anonymous",
      studentEmail: user?.email || "unknown",
      studentPhoto: user?.photoURL || "",
      sessionId,
      review: reviewText,
      rating: Number(rating),
      date: new Date(),
    };

    axiosPublic.post("/reviews", reviewData).then((res) => {
      if (res.data.insertedId) {
        alert("Review submitted successfully!");
        setReviewText("");
        setRating(5);
        setReviews([...reviews, reviewData]);
      }
    });
  };

  return (
    <div className="bg-gray-50 p-4 rounded-xl mt-6">
      <h2 className="font-bold text-lg mb-3">Write a Review</h2>

      {/* Review Form */}
      <form onSubmit={handleSubmit} className="space-y-2">
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Write your review..."
          className="w-full border p-2 rounded-lg"
          required
        ></textarea>

        <input
          type="number"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          placeholder="Rating (1-5)"
          className="w-full border p-2 rounded-lg"
          min="1"
          max="5"
          required
        />

        <button type="submit" className="btn btn-primary w-full">
          Submit Review
        </button>
      </form>

      {/* Review List */}
      <div className="mt-5">
        <h3 className="font-semibold mb-3">All Reviews</h3>
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((r, index) => (
              <div key={index} className="bg-white p-4 rounded-2xl shadow-md flex gap-4">
                {/* Student Photo */}
                {r.studentPhoto && (
                  <img
                    src={r.studentPhoto}
                    alt={r.studentName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                )}

                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <div>
                      <p className="font-semibold">{r.studentName}</p>
                      <p className="text-sm text-gray-500">{r.studentEmail}</p>
                    </div>
                    <div>{renderStars(r.rating)}</div>
                  </div>
                  <p className="text-gray-700">{r.review}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(r.date).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewSection;
