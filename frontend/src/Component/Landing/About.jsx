import React from "react";
import { AboutPNG } from "../index";

export default function About() {
  return (
    <div className="py-16 bg-violet-100 dark:bg-gray-900 dark:text-white">
      <div className="container m-auto px-6 text-gray-600 dark:text-gray-300 md:px-12 xl:px-6">
        <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
          <div className="md:5/12 lg:w-5/12">
            <img src={AboutPNG} alt="about" className="dark:brightness-90" />
          </div>
          <div className="md:7/12 lg:w-6/12">
            <h2 className="text-2xl text-gray-900 dark:text-white font-bold md:text-4xl">
              Explore, Borrow, and Manage – Your Digital Library Hub
            </h2>
            <p className="mt-6 text-gray-600 dark:text-gray-300">
              Our digital library is a one-stop platform for book lovers and
              students, offering access to a vast collection of over 1,000 books
              across various genres and subjects. Users can easily browse,
              search, and discover books that match their interests.
            </p>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              Additionally, the platform allows readers to connect with the
              librarian for assistance, view all their issued books, and keep
              track of due dates to ensure timely resubmission. With a
              user-friendly interface and seamless navigation, our digital
              library is designed to make reading and book management more
              convenient than ever.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
