import React from 'react'
import Checkbox from '@mui/material/Checkbox'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'

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
  return (
    <List component="nav" aria-label="mailbox folders">
      {sortedContent.map((content, index) => (
        <ListItem button key={content.id}>
          <ListItemIcon style={{ minWidth: 0 }}>
            <Checkbox
              edge="start"
              checked={content.completed}
              tabIndex={-1}
              disabled
            />
          </ListItemIcon>

          <ListItemText
            primary={`${index + 1}. ${content.name}`}
            secondary={content.description}
          />
        </ListItem>
      ))}
    </List>
  )
}

export default SectionContent
