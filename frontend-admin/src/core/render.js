export default async function (parentSelector, content) {
  console.log('render')
  const innerHTML = await content
  document.querySelector(parentSelector).innerHTML = innerHTML
}
