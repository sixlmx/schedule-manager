import styles from '../../pages.module.css'
import { render } from '../../../core/render'
import GroupsPage from '../GroupsPage'
import { updateGroup } from '../../../api/groups'
import { ui } from '../../../utils/dom'

export default function UpdateGroupForm({ group }) {
  const onSubmit = async (e) => {
    const formData = new FormData(e.target)
    const data = {
      name: formData.get('name'),
      abbreviation: formData.get('abbreviation'),
      yearOfAdmission: formData.get('yearOfAdmission'),
      color: formData.get('color'),
      id: group.id,
    }
    const result = await updateGroup(data)
    ui.closeModal()
    ui.showFlashMessage(result)
    render('#main', <GroupsPage />)
  }

  const currentColor = group.color || '#3b82f6'

  // Вешаем обработчик после того как DOM смонтируется
  setTimeout(() => {
    const input = document.getElementById('updateColorInput')
    const swatch = document.getElementById('updateColorSwatch')
    const hex = document.getElementById('updateColorHex')
    if (input) {
      input.addEventListener('input', (e) => {
        if (swatch) swatch.style.backgroundColor = e.target.value
        if (hex) hex.textContent = e.target.value
      })
    }
  }, 0)

  return (
    <form class={styles.form} onSubmit={onSubmit} id="updateGroupForm">
      <h3>Редактировать группу</h3>
      <input type="text" name="name" placeholder="Название" required value={group.name} />
      <input type="text" name="yearOfAdmission" placeholder="Год поступления" required value={group.yearOfAdmission} />
      <input type="text" name="abbreviation" placeholder="Сокращение" value={group.abbreviation} />
      <label class={styles.colorPickerWrapper} onClick={() => document.getElementById('updateColorInput').click()}>
        <span id="updateColorSwatch" class={styles.colorPickerSwatch} style={`background-color: ${currentColor}`}></span>
        <span class={styles.colorPickerLabel}>Цвет группы</span>
        <span id="updateColorHex" class={styles.colorPickerValue}>{currentColor}</span>
        <input
          id="updateColorInput"
          class={styles.colorPickerNative}
          type="color"
          name="color"
          value={currentColor}
        />
      </label>
      <button type="submit">Редактировать</button>
    </form>
  )
}
