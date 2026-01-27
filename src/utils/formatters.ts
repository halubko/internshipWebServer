export const formatArrayResponse = <T>(
   dataName: string,
   data: T[],
   skip: number = 0,
   limit: number = 0
) => {
   return {
      [dataName]: data,
      total: data.length,
      skip: skip || 0,
      limit: limit || 0,
   };
};
