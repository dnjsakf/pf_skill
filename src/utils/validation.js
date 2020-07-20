/* Patterns */
export const mapValidTypeToPattern = {
  "name": (r="*", s=-1, e=-1)=>({
    pattern: new RegExp(`^[a-zA-Z가-힣_-]${ s >= 0 ? `{${s},${e}}` : r }$`, "g"),
    message: `only string. ${ s >= 0 ? `${s}~${e}` : '' }`
  }),
  "path": (r="*", s=-1, e=-1)=>({
    pattern: new RegExp(`^(?:[a-zA-Z가-힣_-]|\/)${ s >= 0 ? `{${s},${e}}` : r }$`, "g"),
    message: `only string and '/'. ${ s >= 0 ? `${s}~${e}` : '' }`
  }),
}

/* Checkers */
export const checkValidation = ( value, validation ) => {
  const { 
    type, 
    args,
    required,
    maxLength
  } = validation;

  const mapped = mapValidTypeToPattern[type];

  if ( mapped ){
    let mappedArgs = args;
    if( !args && required ){
      mappedArgs = [ "+" ]
      if( maxLength > 0 ){
        mappedArgs = [ null, 1, maxLength ]
      }
    }

    const { pattern, message } = mapped.apply(null, mappedArgs);

    if( value ){
      const isError = pattern && !value.match( pattern );
  
      return { flag: isError, message: isError ? message : "" }
    }

    return { flag: false, message: "" }
  }
}

export default {
  mapValidTypeToPattern,
  checkValidation,
}