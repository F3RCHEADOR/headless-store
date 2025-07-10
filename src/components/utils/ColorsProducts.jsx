export function getProductAttributeOptions(attributes, name) {
  if (!attributes || typeof attributes !== 'object') return [];
  const key = Object.keys(attributes).find(
    (attr) => attr.toLowerCase() === name.toLowerCase()
  );
  return key ? attributes[key] : [];
}
