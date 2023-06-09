import React from 'react'
import { parseCookies } from 'nookies'
import axios from 'axios'
import baseUrl from '@/utils/baseUrl'
import CourseCard from '@/components/Courses/CourseCard'
import PageBanner from '@/components/Common/PageBanner'
import SideBar from '../SideBar'

const index = ({ courses }) => {
  // console.log(courses)
  return (
    <React.Fragment>
      <PageBanner
        pageTitle="Teacher Courses"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Teacher Courses"
      />

      <div className="courses-area courses-section pt-100 pb-70">
        <div className="container">
          <div className="row">
            <div className="col-md-4 col-lg-4">
              <SideBar />
            </div>

            <div className="col-md-8 col-lg-8">
              <div className="row">
                {courses.length ? (
                  courses.map((course) => (
                    <CourseCard {...course} key={course.id} />
                  ))
                ) : (
                  <div className="col-lg-12">
                    <h3 className="empty-content">Empty</h3>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

index.getInitialProps = async (ctx) => {
  const { token } = parseCookies(ctx)
  if (!token) {
    return { courses: [] }
  }

  const payload = {
    headers: { Authorization: token },
  }

  const url = `${baseUrl}/api/v1/courses/my-courses`
  const response = await axios.get(url, payload)
  // console.log(response.data)
  return response.data
}

export default index
