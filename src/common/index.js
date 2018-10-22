const defaultBody = {
  inCharset: 'utf-8',
  outCharset: 'utf-8',
  format: 'json',
  uin: 0,
  platform: 'h5'
};

const $fetch = ( url, method, body, callback ) => {
  fetch( url, {
    method: method,
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: method === 'POST'
      ? parseParam( Object.assign( {}, defaultBody, body ) )
      : null
  } )
  .then( resp => {
    if ( resp.ok ) {
      return resp.json();
    } else {
      if ( resp.status === 404 ) {
        throw new Error( 'Page not found:' + resp.url );
      }
      if ( resp.status === 500 ) {
        throw new Error( resp.status + ' ' + resp.url );
      }
    }
  } )
  .then( data => {
    callback( data );
  } );
}

const parseParam = ( param, key ) => {  
  let paramStr = "";  
  let type = Object.prototype.toString.call( param )
  if ( type === '[object String]' || type === '[object Number]' || type === '[object Boolean]' ) {  
    paramStr += "&" + key + "=" + encodeURIComponent( param );  
  } else {  
    for ( let i in param ) {
      let k = typeof key === 'undefined' ? i : key + ( type === '[object Array]' ? "[" + i + "]" : "." + i );  
      paramStr += '&' + parseParam( param[ i ], k );  
    }
  }  
  return paramStr.substr( 1 );  
};  

export { $fetch };