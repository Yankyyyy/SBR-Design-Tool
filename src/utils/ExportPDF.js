import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const ExportPDF = async (elementId) => {
  const input = document.getElementById(elementId);

  // Convert the HTML element to a canvas
  const canvas = await html2canvas(input, {
    scale: 2, // Improves quality
    useCORS: true, // Handles images from different origins
  });

  const imgData = canvas.toDataURL('image/png');

  // Create jsPDF instance, A4 size in pt (210mm x 297mm)
  const pdf = new jsPDF('p', 'pt', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  // Set margins
  const margin = 20; // 20pt margin
  const imgWidth = pageWidth - 2 * margin;

  // Calculate height of the image proportionally to the width
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  let heightLeft = imgHeight;
  let position = margin; // Start position on first page

  // Draw the border (Rectangle around the page content)
  const borderWidth = 2; // Define border thickness
  pdf.setLineWidth(borderWidth); // Set border thickness
  pdf.rect(margin / 2, margin / 2, pageWidth - margin, pageHeight - margin, 'S'); // Draw rectangle

  // Add first part of the image
  pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);

  // Calculate the remaining height that fits within a single page (minus margins)
  heightLeft -= pageHeight - 2 * margin;

  // Continue to add pages with remaining content
  while (heightLeft > 0) {
    pdf.addPage();
    position = margin; // Reset position for new page
    // Draw border on new page
    pdf.rect(margin, margin, pageWidth - 2 * margin, pageHeight - 2 * margin, 'S'); // Draw border


    // Continue to add the rest of the image
    pdf.addImage(
      imgData, 
      'PNG', 
      margin, 
      position - (imgHeight - heightLeft), // Offset by the height of what’s left
      imgWidth, 
      imgHeight
    );

    heightLeft -= pageHeight - 2 * margin; // Subtract for the next page
  }

  // Download the PDF
  pdf.save('download_fixed.pdf');
};

export default ExportPDF;