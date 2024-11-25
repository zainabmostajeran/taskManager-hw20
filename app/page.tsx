"use client";

import React from "react";
import Navbar from "../components/Navbar";
import Link from "next/link";

const HomePage: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#45259A]">
        <div className=" container px-12 mx-auto">
          <div className=" block xl:flex justify-between items-start">
            <div className="w-full flex flex-col gap-12">
              <div>
                <img className="pt-8" src="Group 1.png" alt="" />
              </div>
              <div className="flex flex-col item-center justify-center gap-y-8 pt-6 mt-6 text-white">
                <p className="font-extrabold text-4xl">To-do List Template</p>
                <p className="text-2xl font-bold">
                  Manage your tasks efficiently.
                </p>
                <Link
                  className="bg-[#FFBA5E] text-center w-1/3 text-gray-900 hover:bg-white px-4 py-2 rounded"
                  href="/login"
                >
                  Get Started
                </Link>
              </div>
            </div>
            <div className="w-full">
              <img src="Group 98.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
