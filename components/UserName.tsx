import React from 'react'
import { Text } from 'react-native'
import type { User } from '../api/users'


const UserName = ({ userData }: { userData: User }) => {
  const levelColor = (userData) => {
    const levelString = userData.level_string
    const uname = userData.name
    if (levelString === 'Member') {
      return <Text style={{ color: '#b4c7d9' }}>{uname}</Text>
    } else if (levelString === 'Privileged') {
      return <Text style={{ color: '#b4c7d9' }}>{uname}</Text>
    } else if (levelString === 'Blocked') {
      return <Text style={{ color: '#b4c7d9' }}>{uname}</Text>
    } else if (levelString === 'Former Staff') {
      return <Text style={{ color: '#78dca5' }}>{uname}</Text>
    } else if (levelString === 'Janitor') {
      return <Text style={{ color: '#d82828' }}>{uname}</Text>
    } else if (levelString === 'Moderator') {
      return <Text style={{ color: '#d82828' }}>{uname}</Text>
    } else if (levelString === 'Admin') {
      return <Text style={{ color: '#e69500' }}>{uname}</Text>
    }
  }

  return (
    <Text>
      <Text>{levelColor(userData)}</Text>{'\n'}
      <Text style={{ color: '#bbb', fontStyle: 'italic', fontSize: 12 }}>{userData.level_string}</Text>
    </Text>
  )
}

export default UserName
