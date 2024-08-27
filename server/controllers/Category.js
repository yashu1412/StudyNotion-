const Category = require("../models/Category")
const Course = require("../models/Course")

//create category
exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body
    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" })
    }
    const CategorysDetails = await Category.create({
      name: name,
      description: description,
    })
    console.log(CategorysDetails)
    return res.status(200).json({
      success: true,
      message: "Categorys Created Successfully",
    })
  } catch (error) {
    return res.status(500).json({
      success: true,
      message: error.message,
    })
  }
}

//show all category
exports.showAllCategories = async (req, res) => {
  try {
    // Fetch all categories and populate their courses with full details
    const allCategories = await Category.find().populate({
      path: 'courses',
      model: 'Course'
    });

    res.status(200).json({
      success: true,
      data: allCategories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//category page
exports.categoryPageDetails = async (req, res) => {
  try {
    // Fetch all categories
    const allcategories = await Category.find();
    console.log("all category" , allcategories)

    // Check if any categories exist
    if (allcategories.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No categories found",
      });
    }

    // Extract the ID of the category
    const categoryId = allcategories[0]._id;

    // Fetch the selected category by ID
    const selectedCategory = await Category.findById(categoryId);

    console.log("SELECTED CATEGORY:", selectedCategory);

    // Handle the case when the selected category is not found
    if (!selectedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Handle the case when the selected category has no courses
    if (selectedCategory.courses.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No courses found for the selected category.",
      });
    }

    // Get a random different category excluding the selected one
    const categoriesExceptSelected = await Category.find({
      _id: { $ne: categoryId },
    });

    let differentCategory = null;
    if (categoriesExceptSelected.length > 0) {
      const randomIndex = Math.floor(Math.random() * categoriesExceptSelected.length);
      differentCategory = await Category.findById(categoriesExceptSelected[randomIndex]._id);
    }

    console.log("Different CATEGORY:", differentCategory);

    // Fetch course details for selected category
    const selectedCategoryCourses = await Course.find({
      _id: { $in: selectedCategory.courses }
    });

    // Fetch course details for the different category (if exists)
    let differentCategoryCourses = [];
    if (differentCategory) {
      differentCategoryCourses = await Course.find({
        _id: { $in: differentCategory.courses }
      });
    }

    // Fetch top-selling courses across all categories
    const allCategories = await Category.find();
    const allCourses = allCategories.flatMap((category) => category.courses);
    const mostSellingCourses = await Course.find({
      _id: { $in: allCourses }
    })
      .sort({ sold: -1 })
      .limit(10);

    console.log("Most Selling Courses:", mostSellingCourses);

    // Return the response with selected category details, a different category, and top-selling courses
    res.status(200).json({
      success: true,
      data: {
        selectedCategory: {
          ...selectedCategory.toObject(),
          courses: selectedCategoryCourses,
        },
        differentCategory: differentCategory ? {
          ...differentCategory.toObject(),
          courses: differentCategoryCourses,
        } : null,
        mostSellingCourses,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};


