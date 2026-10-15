const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhZDBhMzQxMDU4ZDI1MjdiZWU3MTI2OSIsImlhdCI6MTc5MjA1OTAzMiwiZXhwIjoxNzkyNjYzODMyfQ.RdvQQFMstHm0fuAtf965LYifLioFdbbOR5xEbvJLbVc";
const baseUrl = "http://localhost:5009/api";

const headers = {
  "Content-Type": "application/json",
  "Authorization": `Bearer ${token}`
};

async function seedData() {
  console.log("Seeding anxiety & therapy data via API...");

  // 1. Therapists / Staff
  const therapists = [
    { name: "Dr. Sneha Verma", email: "sneha.verma@nirvaan.com", password: "Password@123", role: "Sales Executive", phone: "9876543211", branch: "Main Clinic" },
    { name: "Dr. Rohan Kapoor", email: "rohan.kapoor@nirvaan.com", password: "Password@123", role: "Sales Executive", phone: "9876543212", branch: "Mind Wellness Center" }
  ];

  for (const t of therapists) {
    try {
      const res = await fetch(`${baseUrl}/users`, { method: "POST", headers, body: JSON.stringify(t) });
      const data = await res.json();
      console.log("Therapist created/checked:", data.name || data.message || "ok");
    } catch (e) {
      console.log("User create info:", e.message);
    }
  }

  // 2. Anxiety Therapy Clients (stored in 'clients' collection)
  const clients = [
    {
      name: "Aarav Sharma",
      email: "aarav.sharma@example.com",
      phone: "9811223344",
      chiefComplaint: "Generalized Anxiety (GAD)",
      severityLevel: "Severe",
      gad7Score: 16,
      consultationMode: "Online (Video)",
      assignedTo: "Dr. Sneha Verma",
      status: "CBT Therapy Active",
      sessionPackage: "8 Sessions CBT Intensive",
      value: "8000",
      emergencyContact: "Sunita Sharma (Mother)",
      emergencyPhone: "9811223300",
      followUpDate: "2026-10-18"
    },
    {
      name: "Pooja Mehta",
      email: "pooja.mehta@example.com",
      phone: "9822334455",
      chiefComplaint: "Panic Attacks",
      severityLevel: "Moderate",
      gad7Score: 12,
      consultationMode: "In-Clinic (Offline)",
      assignedTo: "Dr. Rohan Kapoor",
      status: "Assessment & GAD-7",
      sessionPackage: "4 Sessions Starter",
      value: "4000",
      emergencyContact: "Rajesh Mehta (Spouse)",
      emergencyPhone: "9822334400",
      followUpDate: "2026-10-16"
    },
    {
      name: "Rohan Khanna",
      email: "rohan.khanna@example.com",
      phone: "9833445566",
      chiefComplaint: "Social Anxiety",
      severityLevel: "Moderate",
      gad7Score: 11,
      consultationMode: "Online (Video)",
      assignedTo: "Dr. Sneha Verma",
      status: "Exposure & Homework",
      sessionPackage: "8 Sessions CBT Intensive",
      value: "8000",
      emergencyContact: "Ankit Khanna (Brother)",
      emergencyPhone: "9833445500",
      followUpDate: "2026-10-17"
    },
    {
      name: "Ishita Roy",
      email: "ishita.roy@example.com",
      phone: "9844556677",
      chiefComplaint: "OCD & Intrusive Thoughts",
      severityLevel: "Severe",
      gad7Score: 18,
      consultationMode: "Online (Video)",
      assignedTo: "Dr. Sneha Verma",
      status: "New Intake",
      sessionPackage: "12 Sessions Comprehensive",
      value: "12000",
      emergencyContact: "Kavita Roy (Sister)",
      emergencyPhone: "9844556600",
      followUpDate: "2026-10-19"
    },
    {
      name: "Vikram Malhotra",
      email: "vikram.m@example.com",
      phone: "9855667788",
      chiefComplaint: "Sleep & Severe Stress",
      severityLevel: "Mild",
      gad7Score: 7,
      consultationMode: "In-Clinic (Offline)",
      assignedTo: "Dr. Rohan Kapoor",
      status: "Discharged / Recovered",
      sessionPackage: "4 Sessions Starter",
      value: "4000",
      emergencyContact: "Priya Malhotra (Wife)",
      emergencyPhone: "9855667700",
      followUpDate: ""
    }
  ];

  for (const client of clients) {
    const res = await fetch(`${baseUrl}/leads`, { method: "POST", headers, body: JSON.stringify(client) });
    const cData = await res.json();
    console.log("Client created in 'clients' collection:", cData.name, "Status:", cData.status);
  }

  // 3. Therapy Appointments / Sessions (stored in 'appointments' collection)
  const appointments = [
    {
      lead: "Aarav Sharma - Session 3 (CBT Cognitive Restructuring)",
      date: new Date().toISOString().slice(0, 10),
      time: "11:00 AM",
      assignedTo: "Dr. Sneha Verma",
      priority: "High",
      status: "Pending"
    },
    {
      lead: "Pooja Mehta - Initial Anxiety Evaluation",
      date: new Date().toISOString().slice(0, 10),
      time: "03:30 PM",
      assignedTo: "Dr. Rohan Kapoor",
      priority: "Medium",
      status: "Pending"
    },
    {
      lead: "Rohan Khanna - Exposure Exercise Review",
      date: "2026-10-17",
      time: "05:00 PM",
      assignedTo: "Dr. Sneha Verma",
      priority: "Medium",
      status: "Pending"
    }
  ];

  for (const appt of appointments) {
    const res = await fetch(`${baseUrl}/followups`, { method: "POST", headers, body: JSON.stringify(appt) });
    const aData = await res.json();
    console.log("Appointment created in 'appointments' collection:", aData.lead);
  }

  // 4. Therapy Invoices / Billing (stored in 'therapy_invoices' collection)
  const invoices = [
    {
      client: "Aarav Sharma",
      contact: "9811223344",
      amount: 8000,
      status: "Paid",
      issueDate: new Date().toISOString().slice(0, 10),
      dueDate: new Date().toISOString().slice(0, 10)
    },
    {
      client: "Pooja Mehta",
      contact: "9822334455",
      amount: 4000,
      status: "Paid",
      issueDate: new Date().toISOString().slice(0, 10),
      dueDate: new Date().toISOString().slice(0, 10)
    },
    {
      client: "Ishita Roy",
      contact: "9844556677",
      amount: 12000,
      status: "Pending",
      issueDate: new Date().toISOString().slice(0, 10),
      dueDate: "2026-10-25"
    }
  ];

  for (const inv of invoices) {
    const res = await fetch(`${baseUrl}/invoices`, { method: "POST", headers, body: JSON.stringify(inv) });
    const iData = await res.json();
    console.log("Invoice created in 'therapy_invoices' collection:", iData.invoiceNumber || iData.client);
  }

  console.log("ALL COLLECTIONS SEEDED VIA API SUCCESSFULLY!");
  process.exit(0);
}

seedData().catch(e => {
  console.error("Seed error:", e);
  process.exit(1);
});
