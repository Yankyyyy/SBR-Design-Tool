import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

// Function to export as PDF
export const exportToPDF = (data, title) => {
  const doc = new jsPDF();

  // Add title
  doc.text(title, 20, 10);

  // Convert data array to format suitable for autoTable
  const tableData = data.map(field => [field.label, field.value]);

  // Create table
  autoTable(doc, {
    head: [['Parameter', 'Value']],
    body: tableData,
  });

  // Save the PDF
  doc.save(`${title}.pdf`);
};

// Function to export as Excel
export const exportToExcel = (data, title) => {
  // Convert data array into sheet-friendly format
  const worksheetData = data.map(field => ({ Parameter: field.label, Value: field.value }));

  // Create a new workbook and worksheet
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(worksheetData);

  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Design Output');

  // Write the file to download
  XLSX.writeFile(workbook, `${title}.xlsx`);
};
