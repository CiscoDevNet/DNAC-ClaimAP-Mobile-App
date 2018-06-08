export const handleFetchResponse = (response) => {
  if (response.headers) {
    const contentType = response.headers.get("content-type");
    const formattedContentType = (contentType.includes(";")) ? contentType.substring(0, contentType.indexOf(";")) : contentType;
    
    switch(formattedContentType){
      case 'text/plain':
        return Promise.all([response.ok, response.text()]);
      case 'application/pdf':
        return Promise.all([response.ok, response.blob()]);
      case 'application/json':
        default:
        return Promise.all([response.ok, response.json()]);
    }
  }
}