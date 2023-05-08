import React from 'react'
import { parseCookies } from 'nookies'
import axios from 'axios'
import baseUrl from '@/utils/baseUrl'
import PageBanner from '@/components/Common/PageBanner'
import Link from '@/utils/ActiveLink'
import SideBar from '../SideBar'

const courseEdit = ({ courses }) => {
  return (
    <React.Fragment>
      <PageBanner
        pageTitle="Course Edit"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Course Edit"
      />

      <div className="ptb-100">
        <div className="container">
          <div className="row">
            <div className="col-md-4 col-lg-4">
              <SideBar />
            </div>

            <div className="col-md-8 col-lg-8">
              <div className="table-responsive">
                <table className="table vertical-align-top">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Courses</th>
                      <th scope="col" className="text-right">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {courses.length ? (
                      courses.map((course) => (
                        <tr key={course.id}>
                          <th scope="row">1</th>
                          <td>{course.title}</td>
                          <td className="text-right">
                            <Link
                              legacyBehavior
                              href="/teacher/course/[id]"
                              as={`/teacher/course/${course.id}`}
                            >
                              <a className="btn btn-success">
                                <i className="bx bxs-edit"></i> Edit
                              </a>
                            </Link>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr className="text-center">
                        <td colSpan="3">Empty</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

courseEdit.getInitialProps = async (ctx) => {
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

export default courseEdit
