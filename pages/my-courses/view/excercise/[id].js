import React from "react";
import PageBanner from "@/components/Common/PageBanner";
import Link from "next/link";
import { parseCookies } from "nookies";
import axios from "axios";
import baseUrl from "@/utils/baseUrl";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

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

      <div className="ptb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="course-video-list">
                {sections.length ? (
                  sections.map((section) => (
                    <Accordion key={section.id}>
                      <AccordionItem>
                        <AccordionItemHeading>
                          <AccordionItemButton>
                            {section.name}
                          </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                          {section.videos.length ? (
                            section.videos.map((video) => (
                              <div key={video.id}>
                                <Link
                                  legacyBehavior
                                  key={video.id}
                                  href="/my-courses/[videos]/[id]"
                                  as={`/my-courses/${section.course.id}/${video.id}`}
                                >
                                  <a
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setVideoId(video.video_url);
                                    }}
                                  >
                                    <img
                                      src={section.course.profilePhoto}
                                      alt={section.course.title}
                                    />
                                    <h4>{video.name}</h4>
                                  </a>
                                </Link>
                              </div>
                            ))
                          ) : (
                            <h3>No Videos</h3>
                          )}
                          <div style={{ marginTop: "100px" }}></div>
                          {section.quizzes.length &&
                            section.quizzes.map((quiz) => (
                              <div key={quiz.id}>
                                <Link
                                  legacyBehavior
                                  key={quiz.id}
                                  href="/my-courses/[quizzes]/[id]"
                                  as={`/my-courses/quiz/${quiz.id}`}
                                >
                                  <a href={`/my-courses/quiz/${quiz.id}`}>
                                    <h4>{quiz.name}</h4>
                                  </a>
                                </Link>
                              </div>
                            ))}
                        </AccordionItemPanel>
                      </AccordionItem>
                    </Accordion>
                  ))
                ) : (
                  <h3>No Sections</h3>
                )}
              </div>
            </div>

            <div className="col-lg-9">
              <div className="course-video-iframe">
                <video key={videoId} controls>
                  <source src={videoId} type="video/mp4" />
                  <source src="/images/courses/courses5.jpg" type="video/ogg" />
                </video>
              </div>
            </div>
          </div>
        </div>
      </div>
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
