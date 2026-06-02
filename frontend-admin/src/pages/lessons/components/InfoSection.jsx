export default function InfoSection({ scheduleItem }) {
  if (!scheduleItem) {
    return <div></div>
  }

  return (
    <div>
      <div>{scheduleItem.groupName}</div>
      <div>{scheduleItem.subjectName}</div>
      <div>{scheduleItem.teacherName}</div>
    </div>
  )
}
