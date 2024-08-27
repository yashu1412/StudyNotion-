import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import GetAvgRating from "../../../utils/avgRating";
import RatingStars from "../../Common/RatingStars";

function CourseCard({ course, Height }) {
  const [avgReviewCount, setAvgReviewCount] = useState(0);

  useEffect(() => {
    const count = GetAvgRating(course.ratingAndReviews);
    setAvgReviewCount(count);
  }, [course]);

  return (
    <Link to={`/courses/${course._id}`}>
      <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
        <img
          src={course?.thumbnail}
          alt={`${course?.courseName} thumbnail`}
          className={`${Height} w-full object-cover`}
        />
        <div className="flex flex-col gap-2 p-3">
          <p className="text-base md:text-lg lg:text-xl text-richblack-5 font-semibold">
            {course?.courseName}
          </p>
          <p className="text-xs md:text-sm lg:text-base text-richblack-50">
            {course?.instructor?.firstName} {course?.instructor?.lastName}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-yellow-500 text-xs md:text-sm lg:text-base">
              {avgReviewCount.toFixed(1) || 0}
            </span>
            <RatingStars Review_Count={avgReviewCount} />
            <span className="text-xs md:text-sm lg:text-base text-richblack-400">
              {course?.ratingAndReviews?.length} Ratings
            </span>
          </div>
          <p className="text-base md:text-lg lg:text-xl text-richblack-5 font-semibold">
            Rs. {course?.price}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default CourseCard;
