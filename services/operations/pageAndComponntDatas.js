import { toast } from "react-hot-toast"
import { apiConnector } from '../apiConnector'; // Adjust the path accordingly
import { catalogData } from '../apis'; // Adjust the path accordingly

export const getCatalogPageData = async (categoryId) => {
  const toastId = toast.loading("Loading...");
  let result = [];

  try {
    // Send a POST request to fetch the catalog page data
    const response = await apiConnector("POST", catalogData.CATALOGPAGEDATA_API, {
      categoryId: categoryId, // Include the categoryId in the request body
    });

    // console.log("Category Page Response:", response);

    // Check if the API response was successful
    if (!response?.data?.success) {
      throw new Error("Could not fetch category page data");
    }

    // Store the result from the response
    result = response?.data?.data;
    // console.log("Result:", result);

  } catch (error) {
    console.error("Catalog Page Data API Error:", error);

    // Show an error toast notification
    toast.error(error.message || "Something went wrong while fetching catalog page data");

    // Capture the error response data
    result = error.response?.data;
  } finally {
    // Dismiss the loading toast
    toast.dismiss(toastId);
  }

  return result;
};
