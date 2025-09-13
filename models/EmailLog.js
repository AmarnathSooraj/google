import mongoose from "mongoose";

const EmailLogSchema = new mongoose.Schema({
  email: { type: String, required: true },
  subject: { type: String, required: true },
  opened: { type: Boolean, default: false },
  sentAt: { type: Date, default: Date.now },
});

export default mongoose.models.EmailLog || mongoose.model("EmailLog", EmailLogSchema);
