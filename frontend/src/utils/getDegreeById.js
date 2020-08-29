export default function getDegreeById(degreeId, degrees) {
  const degreeName = degrees.map(degree => {
    const name = Number(degreeId) === degree.id ? degree.name : '';
    return name
  });

  const degree = degreeName.filter(name => {
    let nameOfDegree = '';

    if (name !== '') {
      nameOfDegree = name;
    }

    return nameOfDegree;
  })

  return degree[0];
}
