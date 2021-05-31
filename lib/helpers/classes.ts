const classes = (...names: (string | undefined)[]) => {
  return names.filter(Boolean).join(' ');
}

const scopedClassMarker=(prefix:string)=>{
 return  function(name?:string){
    return [prefix,name].filter(Boolean).join('-');
  }
};

export  {classes,scopedClassMarker};