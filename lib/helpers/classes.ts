const classes = (...names: (string | undefined)[]) => {
  return names.filter(Boolean).join(' ');
}

interface Options {
  extra?: string|undefined
}

interface ClassToggles {
  [k: string]: boolean
};
const scopedClassMarker = (prefix: string) =>
  (name: string | ClassToggles, options?: Options) =>
    Object
      .entries(name instanceof Object ? name : {[name]: name})
      .filter(kv => kv[1] !== false)
      .map(kv => kv[0])
      .map(name => [prefix, name]
        .filter(Boolean)
        .join('-'))
      .concat(options && options.extra || [])
      .join(' ');
export {classes, scopedClassMarker};