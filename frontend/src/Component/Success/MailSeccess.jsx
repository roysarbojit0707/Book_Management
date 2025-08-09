import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function MailSuccess() {
  const navigate = useNavigate();
  useEffect(() => {
    const isContactMailSend = sessionStorage.getItem("isContactMailSend");
    if (isContactMailSend == "true") {
      const timer = setTimeout(() => {
        navigate("/Main/MainHome");
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      navigate("/Main/Contact");
    }
  }, []);

  return (
    <div className="flex items-center justify-center bg-violet-100">
      <div className="container mx-auto p-6 bg-violet-100 shadow-lg rounded-lg max-w-md text-center">
        <h1 className="text-green-500 text-2xl font-semibold">
          Mail Successfully Sent!
        </h1>
        <p className="text-gray-700 text-base break-words">
          Your valuable message has been sent to our server. Thank you for your
          time.
        </p>
        <Link
          to="/home"
          className="mt-6 inline-block text-white bg-green-500 py-2 px-6 rounded-lg hover:bg-green-600 transition-colors"
        >
          Go to Home Page
        </Link>
      </div>
    </div>
  );
}

export default MailSuccess;
