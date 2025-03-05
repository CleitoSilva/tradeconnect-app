const Professional = require("../models/Professional");

const uploadDocuments = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ message: "User ID is required" });

    const professional = await Professional.findOne({ user: userId });
    if (!professional) return res.status(404).json({ message: "Professional not found" });

    // Ensure files were uploaded
    if (!req.files || !req.files.idProof || !req.files.certificate) {
      return res.status(400).json({ message: "Both ID Proof and Certification files are required." });
    }

    // Save file paths in the database
    professional.documents = [
      { type: "ID Proof", path: req.files.idProof[0].path },
      { type: "Certificate", path: req.files.certificate[0].path },
    ];
    professional.isApproved = false; // Mark for admin approval
    await professional.save();

    res.status(200).json({ message: "Documents uploaded successfully, awaiting approval." });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { uploadDocuments };
