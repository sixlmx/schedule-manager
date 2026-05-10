export default function InfoSection({ lesson }) {
  if (!lesson) {
    return <div></div>
  } else
    return (
      <div>
        <div>{lesson.groupName}</div>
        <div>{lesson.subjectName}</div>
        <div>{lesson.teacherName}</div>
      </div>
    )
}
