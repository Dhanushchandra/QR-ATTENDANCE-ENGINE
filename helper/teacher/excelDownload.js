import * as XLSX from "xlsx";

export const handleDownloadExcel = (data) => {
  // create workbook
  const workbook = XLSX.utils.book_new();
  // create sheet

  const worksheet = XLSX.utils.json_to_sheet(data);
  // add sheet to workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  // convert workbook to binary string
  const excelFile = XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
  // create download link
  const element = document.createElement("a");
  element.href = URL.createObjectURL(
    new Blob([s2ab(excelFile)], { type: "application/octet-stream" })
  );
  element.download = "myExcelFile.xlsx";
  // simulate click on download link to trigger download
  element.click();
};

// utility function to convert string to array buffer
const s2ab = (s) => {
  const buf = new ArrayBuffer(s.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
  return buf;
};
