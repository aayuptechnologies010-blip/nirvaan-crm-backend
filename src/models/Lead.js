const mongoose = require('mongoose');

// Clinical Care Stages for Anxiety Therapy CRM
const LEAD_STAGES = [
  'New Intake',
  'Assessment & GAD-7',
  'Therapist Assigned',
  'Initial Consultation',
  'Care Plan Agreed',
  'Session 1 (Psychoeducation)',
  'Session 2-4 (CBT Core)',
  'Exposure & Mindfulness',
  'Mid-Care Assessment',
  'Session 5-8 (Behavioral Experiments)',
  'Relapse Prevention',
  'Completed / Discharged',
  // Alternate / Drop-off statuses
  'Client Drop-off',
  'On-Hold / Paused',
  // Backward-compatibility
  'New Lead', 'Contacted', 'Won', 'Lost', 'New', 'Interested'
];

const leadSchema = new mongoose.Schema({
  name:         { type: String, required: true, trim: true, index: true },
  email:        { type: String, trim: true, lowercase: true, index: true },
  phone:        { type: String, trim: true, default: '', index: true },
  company:      { type: String, trim: true, default: '' },
  value:        { type: String, default: '4000' },
  source:       { type: String, enum: ['Website', 'Referral', 'LinkedIn', 'Cold Call', 'Email Campaign', 'Doctor Referral', 'Social Media', 'Other'], default: 'Website' },
  
  // Care Journey Status & Priority
  status:       { type: String, enum: LEAD_STAGES, default: 'New Intake', index: true },
  priority:     { type: String, enum: ['Low', 'Medium', 'High', 'Urgent'], default: 'Medium' },
  branch:       { type: String, default: '', index: true },
  branchId:     { type: mongoose.Schema.Types.ObjectId, ref: 'Branch' },

  leadType:     { type: String, default: 'Individual Therapy' },
  
  // Anxiety & Psychological Clinical Fields
  chiefComplaint:    { type: String, default: 'Generalized Anxiety (GAD)', index: true },
  severityLevel:     { type: String, enum: ['Mild', 'Moderate', 'Severe'], default: 'Moderate' },
  gad7Score:         { type: Number, min: 0, max: 21, default: 10 },
  consultationMode:  { type: String, enum: ['Online (Video)', 'In-Clinic (Offline)', 'Phone Consultation'], default: 'Online (Video)' },
  emergencyContact:  { type: String, default: '' },
  emergencyPhone:    { type: String, default: '' },
  sessionPackage:    { type: String, default: '4 Sessions Starter' },
  meetingLink:       { type: String, default: '' }, // Google Meet / Zoom link
  
  // Confidential Clinical SOAP Notes
  clinicalNotes: [{
    date:            { type: Date, default: Date.now },
    therapist:       { type: String },
    therapistId:     { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    subjective:      { type: String, default: '' }, // Client's feeling & mood
    objective:       { type: String, default: '' }, // Anxiety rating / observation
    assessment:      { type: String, default: '' }, // Diagnostic evaluation / GAD score
    plan:            { type: String, default: '' }, // Homework / Breathing exercise
    isConfidential:  { type: Boolean, default: true }
  }],

  // Assignment & Ownership
  assignedTo:     { type: String, default: '' }, // user name
  assignedToUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  assignedAt:     { type: Date },

  // Next actions & Follow-ups
  nextAction:       { type: String, default: '' },
  nextFollowUpDate: { type: Date },
  followUpDate:     { type: String, default: '' }, // legacy string
  
  // Quotations and Documents attachments metadata
  quotations: [{
    quotationNumber: { type: String },
    amount:          { type: Number },
    status:          { type: String, enum: ['Draft', 'Sent', 'Accepted', 'Rejected', 'Negotiation'], default: 'Draft' },
    fileUrl:         { type: String },
    fileName:        { type: String },
    sentDate:        { type: Date },
    createdBy:       { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt:       { type: Date, default: Date.now }
  }],

  documents: [{
    title:      { type: String },
    documentType:{ type: String, enum: ['KYC', 'Agreement', 'Proposal', 'Requirement', 'Invoice', 'Other'], default: 'Other' },
    fileUrl:    { type: String },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    uploadedAt: { type: Date, default: Date.now }
  }],

  payments: [{
    amount:        { type: Number, required: true },
    type:          { type: String, enum: ['Advance', 'Part Payment', 'Final Settlement'], default: 'Advance' },
    paymentMode:   { type: String, enum: ['Bank Transfer', 'UPI', 'Cheque', 'Cash', 'Credit Card'], default: 'UPI' },
    transactionId: { type: String, default: '' },
    paymentDate:   { type: Date, default: Date.now },
    recordedBy:    { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    notes:         { type: String, default: '' }
  }],

  notes:        [{ text: String, time: String, user: String }],
  createdBy:    { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

// Indexes for fast searching & role scoping
leadSchema.index({ createdAt: -1 });
leadSchema.index({ assignedTo: 1, createdAt: -1 });
leadSchema.index({ branch: 1, createdAt: -1 });
leadSchema.index({ status: 1, createdAt: -1 });
leadSchema.index({ name: 'text', company: 'text', email: 'text' });

// Explicit collection name in MongoDB -> 'clients'
module.exports = mongoose.model('Lead', leadSchema, 'clients');
module.exports.LEAD_STAGES = LEAD_STAGES;
