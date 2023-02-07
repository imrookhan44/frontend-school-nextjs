import React from "react";
import PageBanner from "@/components/Common/PageBanner";

import { parseCookies } from "nookies";

const SingleExercise = ({ excercise, token }) => {
  return (
    <React.Fragment>
      <PageBanner
        pageTitle={"Coding Excercise"}
        homePageUrl=" /my-courses"
        homePageText="My Courses"
        activePageText={"Coding Excercise"}
      />
      <iframe
        width="100%"
        height="700"
        src={`http://localhost:3001?excerciseId=${excercise}&token=${token}`}
      />
    </React.Fragment>
  );
};

SingleExercise.getInitialProps = async (ctx) => {
  const { token } = parseCookies(ctx);

  const { id } = ctx.query;

  return { excercise: id, token: token };
};

export default SingleExercise;
