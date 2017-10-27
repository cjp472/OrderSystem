export function setLocalData(key, value) {
  let localData = {};
  const reactLocalData = localStorage.getItem('react_localData');
  if (reactLocalData) {
    localData = JSON.parse(reactLocalData);
  }
  // 赋值
  localData[key] = value;
  localStorage.setItem('react_localData', JSON.stringify(localData));
}

export function getLocalData(page, key) {
  const reactLocalData = JSON.parse(localStorage.getItem('react_localData'));
  if (reactLocalData && reactLocalData[page] && reactLocalData[page][key]) {
    return reactLocalData[page][key];
  }
  return null;
}
