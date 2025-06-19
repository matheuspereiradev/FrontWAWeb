import dayjs from "dayjs";

export function formatDate(data:string | Date): string {
  return dayjs(data).format('DD/MM/YYYY')
}