import styles from '../../pages.module.css'
import { render } from '../../../core/render'
import GroupsPage from '../GroupsPage'
import { createGroup } from '../../../api/groups'
import { ui } from '../../../utils/dom'

export default function CreateGroupForm() {
  const onSubmit = async (e) => {
    const formData = new FormData(e.target)
    const data = {
      name: formData.get('name'),
      abbreviation: formData.get('abbreviation'),
      yearOfAdmission: formData.get('yearOfAdmission'),
      color: formData.get('color'),
    }
    const result = await createGroup(data)
    ui.closeModal()
    ui.showFlashMessage(result)
    render('#main', <GroupsPage />)
  }

  // Вешаем обработчик после того как DOM смонтируется
  setTimeout(() => {
    const input = document.getElementById('createColorInput')
    const swatch = document.getElementById('createColorSwatch')
    const hex = document.getElementById('createColorHex')
    if (input) {
      input.addEventListener('input', (e) => {
        if (swatch) swatch.style.backgroundColor = e.target.value
        if (hex) hex.textContent = e.target.value
      })
    }
  }, 0)

  return (
    <form class={styles.form} onSubmit={onSubmit}>
      <h3>Добавить группу</h3>
      <input type="text" name="name" placeholder="Название группы" required />
      <input type="text" name="yearOfAdmission" placeholder="Год поступления" required />
      <input type="text" name="abbreviation" placeholder="Сокращение" />
      <label class={styles.colorPickerWrapper} onClick={() => document.getElementById('createColorInput').click()}>
        <span id="createColorSwatch" class={styles.colorPickerSwatch} style="background-color: #3b82f6"></span>
        <span class={styles.colorPickerLabel}>Цвет группы</span>
        <span id="createColorHex" class={styles.colorPickerValue}>#3b82f6</span>
        <input
          id="createColorInput"
          class={styles.colorPickerNative}
          type="color"
          name="color"
          value="#3b82f6"
        />
      </label>
      <button type="submit">Добавить</button>
    </form>
  )
}
