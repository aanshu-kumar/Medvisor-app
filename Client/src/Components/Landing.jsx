import { Link } from "react-router-dom";
import { ReactTyped } from "react-typed";
const Landing = () => {
    return (
        <>
          <div className=" w-full">
            <div className="max-w-[1240px] mx-auto text-center my-[80px]">
              <div className="text-[30px] text-[#e8d3a2]"> The greatest wealth is health.</div>
              <div className=" text-[60px] md:text-[80px] p-[20px] font-bold text-[#4F6F52]">
                Get Fit with us.
              </div>
              <div className="text-[40px] md:text-[50px] p-[24px]font-bold text-gray-700">
                Your{" "}
                <ReactTyped
                  className="p-2 font-bold"
                  strings={[
                    "Personal Health Assistent.",
                    "Gym Partner.",
                    "Yoga Instructor.",
                    "Nutrinist.",
                  ]}
                  typeSpeed={60}
                  loop={true}
                />
              </div>
              <div className="w-full flex justify-center pt-10">
                <Link to="/chat">
                  <div className="border-2 border-blue-500 rounded-lg text-white flex justify-center items-center px-4 py-1 animate-pulse hover:animate-none">
                    <p className="font-bold text-xl">Try Now</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </>
      );
}

export default Landing
