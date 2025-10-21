const data: any = {};

export const readFile = async (path: string) => {
  return data[path] || [];
};

export const writeFile = async (path: string, content: any) => {
  data[path] = content;
};