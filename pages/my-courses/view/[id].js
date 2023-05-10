import React from 'react'
import PageBanner from '@/components/Common/PageBanner'
// import Link from 'next/link'
import { parseCookies } from 'nookies'
import axios from 'axios'
import baseUrl from '@/utils/baseUrl'
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion'
import SectionContent from '@/components/my-courses/sectionContent'

const SingleCourses = ({ sections }) => {
  const [videoId, setVideoId] = React.useState(
    sections[0].videos.length ? sections[0].videos[0].video_url : '',
  )
  console.log(setVideoId)

  return (
    <React.Fragment>
      <PageBanner
        pageTitle={sections.length ? sections[0].course.title : 'No Videos'}
        homePageUrl="/my-courses"
        homePageText="My Courses"
        activePageText={
          sections.length ? sections[0].course.title : 'No Videos'
        }
      />

      <div className="ptb-100">
        <div className="row">
          <div className="col-lg-9">
            <div className="course-video-iframe">
              <video key={videoId} controls>
                <source src={videoId} type="video/mp4" />
                <source src="/images/courses/courses5.jpg" type="video/ogg" />
              </video>
            </div>
          </div>

          <div className="col-lg-3">
            <div className="course-video-list">
              <h5>Course Content</h5>
              {sections.length ? (
                sections.map((section) => (
                  <Accordion
                    key={section.id}
                    allowZeroExpanded
                    allowMultipleExpanded
                  >
                    <AccordionItem>
                      <AccordionItemHeading>
                        <AccordionItemButton>
                          {section.name}
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel style={{ padding: 0 }}>
                        <SectionContent section={section} />
                      </AccordionItemPanel>
                    </AccordionItem>
                  </Accordion>
                ))
              ) : (
                <h3>No Sections</h3>
              )}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

SingleCourses.getInitialProps = async (ctx) => {
  const { token } = parseCookies(ctx)
  if (!token) {
    return { videos: [] }
  }

  const { id } = ctx.query

  const payload = {
    headers: { Authorization: token },
  }

  const url = `${baseUrl}/api/v1/courses/my-sections?courseid=${id}`
  const sections = await axios.get(url, payload)
  const orderedSections = sections.data.sections.sort((a, b) =>
    a.order > b.order ? 1 : -1,
  )

  return { sections: orderedSections }
}

export default SingleCourses
