const sendEmail = require('../lib/sendEmail');
const saveToGoogleSheets = require('../lib/googleSheets');
const generatePDF = require('../lib/pdfGenerator');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { clientName, linkedin, reviewResponse, aiAgent } = req.body;

    await saveToGoogleSheets({ clientName, linkedin, reviewResponse, aiAgent });
    const pdfBuffer = await generatePDF({ clientName, linkedin, reviewResponse, aiAgent });

    await sendEmail({
      to: process.env.INTERNAL_NOTIFY_TO || process.env.SENDER_EMAIL,
      subject: `New CX Snapshot – ${clientName}`,
      text: `Business: ${clientName}\nLinkedIn: ${linkedin}\nReview Response: ${reviewResponse}\nAI Agents: ${aiAgent}`,
      attachments: [{ filename: 'CX-Snapshot.pdf', content: pdfBuffer }]
    });

    return res.status(200).json({ message: 'Snapshot processed successfully.' });
  } catch (error) {
    console.error('Error processing snapshot:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};