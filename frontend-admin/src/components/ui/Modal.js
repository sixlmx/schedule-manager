export default function Modal(classname, form) {
  return `
    <div class="modal-overlay hidden ${classname}">
      <div class="modal">
        ${form}
      </div>
    </div>
  `
}
