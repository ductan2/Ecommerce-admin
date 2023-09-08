export function formatDate(dateString: string) {
   const date = new Date(dateString);

   // Lấy ngày, tháng và năm
   const year = date.getFullYear();
   const month = date.getMonth() + 1; // Tháng bắt đầu từ 0, nên cần +1
   const day = date.getDate();
   return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
}