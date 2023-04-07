export function setLocalStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    throw new Error(error.message);
  }
}

export function getLocalStorage(key, defaultValue) {
  try {
    const data = localStorage.getItem(key);
    return data === null ? defaultValue : JSON.parse(data);
  } catch (error) {
    throw new Error(error.message);
  }
}
