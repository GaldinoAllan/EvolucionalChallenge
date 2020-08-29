export default function getClassById(classId, classes) {
  const classeName = classes.map(classe => {
    const name = Number(classId) === classe.id ? classe.name : '';
    return name
  });

  const classe = classeName.filter(name => {
    let nameOfClass = ''

    if (name !== '') {
      nameOfClass = name
    }

    return nameOfClass
  })

  return classe[0];
}
