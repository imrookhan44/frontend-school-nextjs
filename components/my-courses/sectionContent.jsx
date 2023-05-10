import React from 'react'

const SectionContent = ({ section }) => {
  const allSectionContent = [
    ...section.videos,
    ...section.excercises,
    ...section.quizzes,
  ]

  const sortedContent = allSectionContent.sort((a, b) =>
    a.order > b.order ? 1 : -1,
  )
  console.log(sortedContent)
  return sortedContent.map((item, index) => (
    <div key={item.id}>
      {/* <Link
        legacyBehavior
        key={item.id}
        href="/my-courses/[videos]/[id]"
        as={`/my-courses/${section.course.id}/${item.id}`}
      >
        <a>
          <img src={section.course.profilePhoto} alt={section.course.title} />
          <h4>VIDEP: {item.name}</h4>
        </a>
      </Link> */}
      {index + 1}. {item.name}
    </div>
  ))
}

export default SectionContent
