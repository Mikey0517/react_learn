import pubsub from 'pubsub-js';
import fetchConfig from "../config/fetch.config";
import musicConfig from "../config/music.config";

const $fetch = ( url, method, body, callback, callbackType ) => {
  fetch( url, {
    ...fetchConfig(),
    method: method,
    body: body ? JSON.stringify( body ) : null
  } )
    .then( resp => {
      if ( resp.ok ) {
        switch ( callbackType ) {
          case 'json':
            return resp.json();
          case 'text':
            return resp.text();
          case 'blob':
            return resp.blob();
          default:
            return resp.json();
        }
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
      if ( data.status !== -2 ) {
        callback( data );
      } else {
        loginOut();
      }
    } );
};

const $musicFetch = ( url, method, body, callback ) => {
  fetch( url, {
    method: method,
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: method === 'POST'
      ? parseParam( Object.assign( {}, musicConfig, body ) )
      : null,
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
};

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

const isEqual = ( a, b ) => {
  // Of course, we can do it use for in
  // Create arrays of property names
  let aProps = Object.getOwnPropertyNames(a);
  let bProps = Object.getOwnPropertyNames(b);

  // If number of properties is different,
  // objects are not equivalent
  if ( aProps.length !== bProps.length ) {
      return false;
  }

  for ( let i = 0; i < aProps.length; i++ ) {
      let propName = aProps[ i ];

      // If values of same property are not equal,
      // objects are not equivalent
      if ( a[ propName ] !== b[ propName ] ) {
          return false;
      }
  }

  // If we made it this far, objects
  // are considered equivalent
  return true;
};

const sendEvent = ( key, param ) => {
  pubsub.publish( key, param )
};

const eventListener = ( key, callback ) => {
  pubsub.subscribe( key, callback )
};

const uuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace( /[xy]/g, ( c ) => {
    let r = Math.random() * 16 | 0, v = c === 'x' ? r : ( r&0x3|0x8 );
    return v.toString( 16 );
  });
};

const loginOut = () => {
  window.localStorage.removeItem( "token" );
  window.open( '/login', '_self' )
};

export { $fetch, $musicFetch, isEqual, sendEvent, eventListener, uuid, loginOut };