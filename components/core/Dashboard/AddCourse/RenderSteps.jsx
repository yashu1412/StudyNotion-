import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";

import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm";
import CourseInformationForm from "./CourseInformation/CourseInformationForm";
import PublishCourse from "./PublishCourse";

export default function RenderSteps() {
  const { step } = useSelector((state) => state.course);

  const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Publish",
    },
  ];

  return (
    <>
      {/* Stepper */}
      <div className="flex flex-col items-center justify-center mb-12 md:flex-row">
        {steps.map((item, index) => (
          <div key={item.id} className="flex items-center mb-4 md:mb-0 md:mr-6 last:mr-0">
            {/* Step Circle */}
            <div
              className={`flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full border-2 ${
                step === item.id
                  ? "border-yellow-500 bg-yellow-500 text-black"
                  : step > item.id
                  ? "border-green-500 bg-green-500 text-white"
                  : "border-gray-300 bg-white text-gray-500"
              }`}
            >
              {step > item.id ? <FaCheck className="text-xs md:text-base" /> : item.id}
            </div>

            {/* Connector */}
            {index !== steps.length - 1 && (
              <div
                className={`hidden md:flex flex-1 h-0.5 mx-4 ${
                  step > item.id ? "bg-green-500" : "bg-gray-300"
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>

      {/* Step Titles */}
      <div className="flex flex-col items-center text-center mb-6 px-4 md:px-8">
        {steps.map((item) => (
          <div key={item.id} className="mb-2 md:mb-0">
            <p
              className={`text-xs md:text-sm font-medium ${
                step === item.id
                  ? "text-yellow-500"
                  : step > item.id
                  ? "text-green-500"
                  : "text-gray-500"
              }`}
            >
              {item.title}
            </p>
          </div>
        ))}
      </div>

      {/* Render specific component based on current step */}
      {step === 1 && <CourseInformationForm />}
      {step === 2 && <CourseBuilderForm />}
      {step === 3 && <PublishCourse />}
    </>
  );
}
