export default function Group(group) {
  return `<a href="${`${group.publicBase}/groups/${group.id}/lessons`}"><h5>${group.name}</h5></a>`;
}
