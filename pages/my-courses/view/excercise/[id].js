import React from "react";
import PageBanner from "@/components/Common/PageBanner";

import { parseCookies } from "nookies";
import axios from "axios";
import baseUrl from "@/utils/baseUrl";

const SingleCourses = ({ sections }) => {
  const [videoId, setVideoId] = React.useState(
    sections[0].videos.length ? sections[0].videos[0].video_url : ""
  );
  console.log(sections);
  return (
    <React.Fragment>
      <PageBanner
        pageTitle={sections.length ? sections[0].course.title : "No Videos"}
        homePageUrl=" /my-courses"
        homePageText="My Courses"
        activePageText={
          sections.length ? sections[0].course.title : "No Videos"
        }
      />
      <iframe width="100%" height="700" src={"http://localhost:3001/"} />
    </React.Fragment>
  );
};

SingleCourses.getInitialProps = async (ctx) => {
  const { token } = parseCookies(ctx);
  if (!token) {
    return { videos: [] };
  }

  const { id } = ctx.query;

  const payload = {
    headers: { Authorization: token },
  };

  const url = `${baseUrl}/api/v1/courses/my-sections?courseid=${id}`;
  const sections = await axios.get(url, payload);

  return { sections: sections.data.sections };
};

export default SingleCourses;
