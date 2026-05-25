/**
 * Response schedule for api/lessons/fetchLessons.
 *
 * @typedef {object} LessonScheduleDTO
 * @property {number} id
 * @property {string} name
 * @property {number} lessonsInDay
 * @property {number[]} weekdays
 */

/**
 * Response lesson item for api/lessons/fetchLessons.
 *
 * @typedef {object} LessonDTO
 * @property {number} id
 * @property {number} scheduleId
 * @property {number} weekday
 * @property {number} lessonNumber
 * @property {string|null} classroom
 * @property {number} groupId
 * @property {string} groupName
 * @property {string|null} groupAbbr
 * @property {number} teacherId
 * @property {string} teacherName
 * @property {number} subjectId
 * @property {string} subjectName
 * @property {string|null} subjectAbbr
 */

/**
 * Response group item for api/lessons/fetchLessons.
 *
 * @typedef {object} LessonGroupDTO
 * @property {number} id
 * @property {string} name
 * @property {string|null} abbreviation
 */

/**
 * Response subject item for api/lessons/fetchLessons.
 *
 * @typedef {object} LessonSubjectDTO
 * @property {number} id
 * @property {string} name
 * @property {string|null} abbreviation
 */

/**
 * Response teacher item for api/lessons/fetchLessons.
 *
 * @typedef {object} LessonTeacherDTO
 * @property {number} id
 * @property {string|null} fio
 * @property {string|null} position
 * @property {string|null} color
 */

/**
 * Response workload item for api/lessons/fetchLessons.
 *
 * @typedef {object} LessonWorkloadDTO
 * @property {number} id
 * @property {number} scheduleId
 * @property {number} groupId
 * @property {string} groupName
 * @property {string|null} groupAbbr
 * @property {number} teacherId
 * @property {string|null} teacherName
 * @property {number} subjectId
 * @property {string} subjectName
 * @property {string|null} subjectAbbr
 * @property {number} lessonsPerWeek
 */

/**
 * Return value for api/lessons/fetchLessons.
 *
 * @typedef {object} LessonsByScheduleResult
 * @property {LessonScheduleDTO} schedule
 * @property {LessonDTO[]} lessons
 * @property {LessonGroupDTO[]} groups
 * @property {LessonSubjectDTO[]} subjects
 * @property {LessonTeacherDTO[]} teachers
 * @property {LessonWorkloadDTO[]} workloads
 */

/**
 * Request body for api/lessons/setLesson.
 *
 * @typedef {object} SetLessonBody
 * @property {number|string} scheduleId
 * @property {number} weekday
 * @property {number} lessonNumber
 * @property {number} groupId
 * @property {number} workloadId
 * @property {string|null} [classroom]
 */

/**
 * Return value for api/lessons/deleteLesson and api/lessons/setLesson.
 *
 * @typedef {object} LessonActionResult
 * @property {'success'|'error'} type
 * @property {string} message
 * @property {number} [id]
 */

export {};
