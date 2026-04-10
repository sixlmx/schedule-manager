import CallsPage from '../pages/calls/CallsPage.jsx'
import ClassesPage from '../pages/classes/ClassesPage.jsx'
import GroupsPage from '../pages/groups/GroupsPage.jsx'
import SubjectsPage from '../pages/subjects/SubjectsPage.jsx'
import TeachersPage from '../pages/teachers/TeachersPage.jsx'

export default {
  routes: {
    Звонки: CallsPage,
    Группы: ClassesPage,
    Предметы: GroupsPage,
    Преподаватели: SubjectsPage,
    Аудитории: TeachersPage,
  },

  async getRoute(route) {
    if (this.routes[route]) {
      const content = await this.routes[route]()
      return content
    }
    return null
  },
}
