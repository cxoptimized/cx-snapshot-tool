const PDFDocument = require('pdfkit');
const getStream = require('get-stream');

module.exports = async ({ clientName, linkedin, reviewResponse, aiAgent }) => {
  const doc = new PDFDocument({ size: 'A4', margin: 40 });

  doc.fontSize(20).fillColor('#005c99').text('CX Snapshot Report', { align: 'center' });
  doc.moveDown();
  doc.fontSize(12).fillColor('black');
  doc.text(`Business Name: ${clientName}`);
  doc.text(`LinkedIn URL: ${linkedin || 'N/A'}`);
  doc.text(`Responding to Reviews: ${reviewResponse}`);
  doc.text(`AI Agents in Use: ${aiAgent}`);
  doc.moveDown().text('Thank you for trusting CX Optimized for your CX insights.');

  doc.end();
  return await getStream.buffer(doc);
};