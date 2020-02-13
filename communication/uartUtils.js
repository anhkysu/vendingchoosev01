function isJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

export const isValidUartData = function(inputObject) {
  var topic = inputObject.topic || 'none';
  var type = inputObject.type || 'none';
  var content = inputObject.content || 'none';
  if (topic == 'none' || content == 'none' || type == 'none') {
    return false;
  }
  return true;
};

export const serializeUartData = function({currString, prevString, notStrict}) {
  if (!isJson(currString)) {
    return false;
  }
  const sendObject = JSON.parse(currString);
  if (typeof sendObject !== 'object') {
    return false;
  }
  if (currString === prevString) {
    sendObject.refresh = true;
  }
  return {sendObject, notStrict};
};
