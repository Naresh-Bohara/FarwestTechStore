import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import productSvc from "../../pages/product/product.service";
import { FaStar } from "react-icons/fa";
import { Button } from "flowbite-react";

// Validation schema
const reviewSchema = Yup.object({
  rating: Yup.number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating cannot exceed 5")
    .required("Rating is required"),
  reviewText: Yup.string()
    .max(500, "Review cannot exceed 500 characters")
    .optional(),
});

const ReviewForm = ({ productId }) => {
  const { auth: { loggedInUser } } = useContext(AuthContext);
  const [submitting, setSubmitting] = useState(false);
  const [userReviewCount, setUserReviewCount] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(reviewSchema),
    defaultValues: { rating: 0, reviewText: "" },
  });

  const rating = watch("rating");

  // Load user review count for this product
  const loadUserReviews = async () => {
    try {
      const count = await productSvc.getUserReviewCount(productId);
      setUserReviewCount(count);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadUserReviews();
  }, [productId]);

  const submitReview = async (data) => {
    if (userReviewCount >= 3) {
      toast.error("You can only add up to 3 reviews per product.");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        rating: data.rating,
        reviewText: data.reviewText,
      };
      await productSvc.addReview(productId, payload);
      toast.success("Review added successfully!");
      window.location.reload();
    } catch (exception) {
      console.log(exception);
      toast.error(
        exception?.data?.message || "Failed to add review. Try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mt-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        Add Your Review
      </h3>

      {userReviewCount >= 3 ? (
        <p className="text-red-500 font-medium">
          You have already added 3 reviews for this product.
        </p>
      ) : (
        <form onSubmit={handleSubmit(submitReview)} className="space-y-4">
          {/* Rating Stars */}
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                size={28}
                className={`cursor-pointer transition-colors ${
                  (hoverRating || rating) >= star
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setValue("rating", star)}
              />
            ))}
          </div>
          {errors.rating && (
            <p className="text-red-500 text-sm">{errors.rating.message}</p>
          )}

          {/* Review Text */}
          <textarea
            {...register("reviewText")}
            placeholder="Write your review here..."
            className="w-full p-3 border rounded-md border-gray-300 focus:ring-2 focus:ring-teal-400 dark:bg-gray-700 dark:text-white"
            rows={4}
          />
          {errors.reviewText && (
            <p className="text-red-500 text-sm">{errors.reviewText.message}</p>
          )}

          <Button
            type="submit"
            className="bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg px-5 py-2.5 shadow"
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit Review"}
          </Button>
        </form>
      )}
    </div>
  );
};

export default ReviewForm;
