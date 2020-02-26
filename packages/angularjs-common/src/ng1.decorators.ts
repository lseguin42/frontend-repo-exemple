export function Bind() {
  return (target: any, propName: string) => {
    target.constructor.__bindings = target.constructor.__bindings || [];
    target.constructor.__bindings.push(propName);
  }
}

export function Attach() {
  return (target: any, propName: string) => {
    target.constructor.__attached = target.constructor.__attached || [];
    target.constructor.__attached.push(propName);
  }
}