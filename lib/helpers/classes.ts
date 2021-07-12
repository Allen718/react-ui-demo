const classes = (...names: (string | undefined)[]) => {
  return names.filter(Boolean).join(' ');
}

interface Group {
  [k: string]: string | undefined
}

interface Options {
  extra?: string | undefined
}

interface ClassToggles {
  [k: string]: boolean | undefined
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

const classGroup = (prefix: string) => {
  return (group: Group) => Object
    .entries(group).filter(i => i[1] !== undefined)
    .map(i => i[1])
    .map(i => `${prefix}-${i}`).join(' ')
}
export {classes, scopedClassMarker, classGroup};