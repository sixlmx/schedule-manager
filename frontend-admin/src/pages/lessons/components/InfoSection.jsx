export default function InfoSection({ workload, lesson }) {
  if (workload) {
    return (
      <div>
        <div>{workload.groupName}</div>
        <div>{workload.subjectName}</div>
        <div>{workload.teacherName}</div>
      </div>
    )
  }

  if (lesson) {
    return (
      <div>
        <div>{lesson.groupName}</div>
        <div>{lesson.subjectName}</div>
        <div>{lesson.teacherName}</div>
      </div>
    )
  }

  return <div></div>
}
