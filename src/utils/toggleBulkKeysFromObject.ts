function toggleBulkKeysFromObject(object: Record<string, boolean>, keys: string[]) {
  const newObject = { ...object };
  const selectedValues = keys.filter(key => newObject[key]);

  if (selectedValues.length === keys.length) {

    keys.forEach(value => {
      delete newObject[value];
    })

    return newObject;
  }

  keys.forEach(key => {
    newObject[key] = true;
  });

  return newObject;
}

export default toggleBulkKeysFromObject;
