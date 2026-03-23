import { getMondayDate } from './helpers/dateHelpers'

export async function fetchTeachers() {
  try {
    const response = await fetch('/apiv1/teachers')
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return data
  }
  catch (error) {
    throw new Error('cannot connect to server', { cause: error })
  }
}

export async function fetchGroups() {
  try {
    const response = await fetch('/apiv1/groups')
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return data
  }
  catch (error) {
    throw new Error('cannot connect to server', { cause: error })
  }
}

export async function fetchLessons() {
  const teacherId = new URL(window.location.href).pathname.split('/')[3]
  const date = getMondayDate()
  try {
    const response = await fetch(`/apiv1/teachers/lessons?teacher=${teacherId}&date=${date}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return data
  }
  catch (error) {
    console.error('Fetch error:', error)
  }
}
