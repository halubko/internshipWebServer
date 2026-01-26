export const formatArrayResponse = <T>(
   dataName: string,
   data: T[],
   skip: number = 0,
   limit: number = 0
) => {
   if (isNaN(skip) || skip < 0) skip = 0;
   if (isNaN(limit) || limit < 0) limit = 0;
   return {
      dataName: data,
      total: data.length,
      skip,
      limit,
   };
};
