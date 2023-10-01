declare module 'solc' {
  export function compile(input: string | object, callback?: (error: any, output: any) => void): any;
}
