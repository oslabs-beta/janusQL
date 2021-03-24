
export default {

  bytes: function(obj: any) {
    const list: any[] = [];
    const stack: any[] = [obj];
    let bytes = 0;

  while ( stack.length ) {
      const value = stack.pop();
      if ( typeof value === 'boolean' ) {
          bytes += 8;
      }
      else if ( typeof value === 'string' ) {
          bytes += value.length * 2;
      }
      else if ( typeof value === 'number' ) {
          bytes += 8;
      }
      else if
      (
          typeof value === 'object'
          && list.indexOf( value ) === -1
      )
      {
          list.push(value);

          for( const key in value ) {
              stack.push(value[key]);
          }
      }
  }

  return bytes;

  },

  makeFetchJSONRequest: function(url: string, queryString: string, method: string): any  {
      const myHeaders = { 'Content-Type': 'application/json' };
      const myRequest = {
        url: `${url}`,
        method: `${method}`,
        headers: myHeaders,
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify({ query: queryString })
      };
    return myRequest;

  },

}