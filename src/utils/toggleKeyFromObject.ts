function toggleKeyFromObject(object: Record<string, boolean>, key: string) {
  if (object[key]) {
    const { [key]: _, ...newObj } = object;
    return newObj
  }

  return {
    ...object,
    [key]: true
  }
}

export default toggleKeyFromObject;
