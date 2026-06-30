import {
  Heart, Brain, Bone, Baby, Stethoscope, Sparkles,
  Ear, Eye, Smile, Scissors, type LucideIcon,
} from "lucide-react";

export const HOSPITAL = {
  name: "BK Baloch Hospital",
  short: "BKBH",
  tagline: "Compassionate Care, Trusted Excellence.",
  phone: "+92 300 1234567",
  emergency: "1122",
  ambulance: "+92 300 7654321",
  email: "info@bkbalochhospital.com",
  address: "Main Hospital Road, Quetta, Balochistan, Pakistan",
  hours: "24/7 Emergency · OPD 8:00 AM – 10:00 PM",
  mapUrl: "https://maps.google.com/?q=Quetta+Balochistan",
};

export type Department = {
  slug: string;
  name: string;
  icon: LucideIcon;
  short: string;
  description: string;
  treatments: string[];
  services: string[];
  equipment: string[];
  hours: string;
};

export const DEPARTMENTS: Department[] = [
  {
    slug: "cardiology", name: "Cardiology", icon: Heart,
    short: "Advanced heart care, diagnostics & interventional cardiology.",
    description: "Our Cardiology department offers comprehensive care for heart conditions with a multidisciplinary team and state-of-the-art cath lab facilities.",
    treatments: ["Angioplasty", "Pacemaker Implantation", "ECG / Echo", "Stress Testing", "Heart Failure Care"],
    services: ["24/7 Cardiac ICU", "Non-invasive Cardiology", "Preventive Cardiology"],
    equipment: ["Cath Lab", "Echocardiography", "Holter Monitor", "Treadmill ECG"],
    hours: "Mon–Sat · 9:00 AM – 8:00 PM",
  },
  {
    slug: "neurology", name: "Neurology", icon: Brain,
    short: "Brain, spine & nervous system specialists.",
    description: "Comprehensive neurological evaluation, stroke care and epilepsy management by board-certified neurologists.",
    treatments: ["Stroke Care", "Epilepsy Treatment", "Migraine Clinic", "Parkinson's Care"],
    services: ["EEG", "EMG / NCS", "Neuro ICU"],
    equipment: ["MRI 3T", "CT Angiography", "Video EEG"],
    hours: "Mon–Sat · 10:00 AM – 7:00 PM",
  },
  {
    slug: "orthopedics", name: "Orthopedics", icon: Bone,
    short: "Bone, joint & sports injury treatment.",
    description: "From joint replacement to fracture management, our orthopedic surgeons restore mobility and quality of life.",
    treatments: ["Joint Replacement", "Arthroscopy", "Spine Surgery", "Sports Injury"],
    services: ["Physiotherapy", "Pain Management"],
    equipment: ["C-Arm", "Arthroscopy Tower", "Digital X-Ray"],
    hours: "Mon–Sat · 9:00 AM – 6:00 PM",
  },
  {
    slug: "pediatrics", name: "Pediatrics", icon: Baby,
    short: "Child healthcare from birth to adolescence.",
    description: "Gentle, expert care for infants, children and adolescents in a child-friendly environment.",
    treatments: ["Vaccination", "Neonatal Care", "Pediatric Surgery", "Growth Monitoring"],
    services: ["NICU", "Well-baby Clinic"],
    equipment: ["Incubators", "Phototherapy", "Pediatric Ventilators"],
    hours: "Daily · 24 Hours",
  },
  {
    slug: "gynecology", name: "Gynecology", icon: Stethoscope,
    short: "Women's health, maternity & fertility.",
    description: "Confidential, comprehensive women's healthcare including obstetrics, gynecology and minimally invasive surgery.",
    treatments: ["Antenatal Care", "Laparoscopy", "Infertility Treatment", "Menopause Care"],
    services: ["Labor & Delivery Suite", "High-risk Pregnancy"],
    equipment: ["4D Ultrasound", "Colposcope", "Laparoscopy Tower"],
    hours: "Mon–Sat · 10:00 AM – 8:00 PM",
  },
  {
    slug: "dermatology", name: "Dermatology", icon: Sparkles,
    short: "Skin, hair & cosmetic dermatology.",
    description: "Medical and cosmetic dermatology services using the latest evidence-based treatments.",
    treatments: ["Acne & Acne Scars", "Pigmentation", "Hair Loss", "Laser Therapy"],
    services: ["Cosmetic Procedures", "Allergy Testing"],
    equipment: ["Laser Systems", "Dermoscopy", "Cryotherapy"],
    hours: "Mon–Sat · 11:00 AM – 7:00 PM",
  },
  {
    slug: "ent", name: "ENT", icon: Ear,
    short: "Ear, nose & throat specialists.",
    description: "Comprehensive ENT care including audiology, allergy and head & neck surgery.",
    treatments: ["Tonsillectomy", "Sinus Surgery", "Hearing Loss", "Vertigo Clinic"],
    services: ["Audiology", "Speech Therapy"],
    equipment: ["Endoscopy", "Audiometer", "Microscope Suite"],
    hours: "Mon–Sat · 9:00 AM – 6:00 PM",
  },
  {
    slug: "ophthalmology", name: "Ophthalmology", icon: Eye,
    short: "Eye care, LASIK & cataract surgery.",
    description: "Modern eye care with phaco cataract surgery, LASIK and pediatric ophthalmology.",
    treatments: ["Cataract Surgery", "LASIK", "Glaucoma", "Retina Care"],
    services: ["Optical Shop", "Diabetic Eye Clinic"],
    equipment: ["Phaco Machine", "OCT", "Excimer Laser"],
    hours: "Mon–Sat · 9:00 AM – 7:00 PM",
  },
  {
    slug: "dentistry", name: "Dentistry", icon: Smile,
    short: "Complete oral & dental healthcare.",
    description: "From routine cleanings to advanced implants and orthodontics in a comfortable setting.",
    treatments: ["Dental Implants", "Braces", "Root Canal", "Teeth Whitening"],
    services: ["Pediatric Dentistry", "Oral Surgery"],
    equipment: ["Digital OPG", "Intraoral Scanner", "Dental Laser"],
    hours: "Mon–Sat · 10:00 AM – 8:00 PM",
  },
  {
    slug: "general-surgery", name: "General Surgery", icon: Scissors,
    short: "General & laparoscopic surgical care.",
    description: "Experienced surgical team performing routine and advanced laparoscopic procedures.",
    treatments: ["Laparoscopic Cholecystectomy", "Hernia Repair", "Appendectomy", "Thyroid Surgery"],
    services: ["Day-care Surgery", "Trauma Care"],
    equipment: ["Laparoscopy Tower", "Modular OT", "Harmonic Scalpel"],
    hours: "Mon–Sat · 9:00 AM – 6:00 PM",
  },
];

export type Doctor = {
  id: string;
  name: string;
  qualification: string;
  department: string; // slug
  experience: string;
  fee: number;
  availability: string;
  bio: string;
  languages: string[];
  photo: string;
};

const PHOTOS_M = [
  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80",
  "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=600&q=80",
  "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&q=80",
  "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600&q=80",
];
const PHOTOS_F = [
  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80",
  "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&q=80",
  "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=600&q=80",
  "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=600&q=80",
];
const m = (i: number) => PHOTOS_M[i % PHOTOS_M.length];
const f = (i: number) => PHOTOS_F[i % PHOTOS_F.length];

export const DOCTORS: Doctor[] = [
  { id: "D001", name: "Dr. Balach Baloch", qualification: "MBBS, FCPS (Cardiology)", department: "cardiology", experience: "18 years", fee: 3000, availability: "Mon–Sat · 10AM–4PM", bio: "Senior interventional cardiologist with extensive experience in complex angioplasty.", languages: ["English","Urdu","Balochi"], photo: m(0) },
  { id: "D002", name: "Dr. Sarah Ali", qualification: "MBBS, MD (Cardiology)", department: "cardiology", experience: "12 years", fee: 2500, availability: "Mon–Fri · 2PM–8PM", bio: "Specialist in preventive and women's cardiology.", languages: ["English","Urdu"], photo: f(0) },

  { id: "D003", name: "Dr. Muhammad Muzamil", qualification: "MBBS, FCPS (Neurology)", department: "neurology", experience: "15 years", fee: 3000, availability: "Mon–Sat · 11AM–6PM", bio: "Stroke and epilepsy specialist with fellowship in clinical neurophysiology.", languages: ["English","Urdu"], photo: m(1) },
  { id: "D004", name: "Dr. Ayesha Noor", qualification: "MBBS, MD (Neurology)", department: "neurology", experience: "10 years", fee: 2500, availability: "Tue–Sat · 10AM–4PM", bio: "Focus on movement disorders and headache management.", languages: ["English","Urdu"], photo: f(1) },

  { id: "D005", name: "Dr. Saddam", qualification: "MBBS, FCPS (Ortho)", department: "orthopedics", experience: "14 years", fee: 2500, availability: "Mon–Sat · 9AM–3PM", bio: "Joint replacement and arthroscopy surgeon.", languages: ["English","Urdu","Pashto"], photo: m(2) },
  { id: "D006", name: "Dr. Fatima Qureshi", qualification: "MBBS, MS (Ortho)", department: "orthopedics", experience: "9 years", fee: 2000, availability: "Mon–Fri · 1PM–7PM", bio: "Pediatric orthopedics and sports injury specialist.", languages: ["English","Urdu"], photo: f(2) },

  { id: "D007", name: "Dr. Muhammad Imran Zehri", qualification: "MBBS, FCPS (Peds)", department: "pediatrics", experience: "20 years", fee: 2000, availability: "Daily · 10AM–6PM", bio: "Senior consultant pediatrician and neonatologist.", languages: ["English","Urdu","Balochi"], photo: m(3) },
  { id: "D008", name: "Dr. Sana Riaz", qualification: "MBBS, DCH", department: "pediatrics", experience: "8 years", fee: 1800, availability: "Mon–Sat · 4PM–9PM", bio: "Child wellness, vaccination and developmental pediatrics.", languages: ["English","Urdu"], photo: f(3) },

  { id: "D009", name: "Dr. Muhammad Irfan", qualification: "MBBS, FCPS (Gynae)", department: "gynecology", experience: "17 years", fee: 2800, availability: "Mon–Sat · 10AM–5PM", bio: "Laparoscopic gynecology and high-risk pregnancy expert.", languages: ["English","Urdu"], photo: m(0) },
  { id: "D010", name: "Dr. Rabia Siddiqui", qualification: "MBBS, MCPS", department: "gynecology", experience: "11 years", fee: 2500, availability: "Mon–Fri · 2PM–8PM", bio: "Obstetrics and infertility management.", languages: ["English","Urdu"], photo: f(0) },

  { id: "D011", name: "Dr. Usman Tariq", qualification: "MBBS, FCPS (Derma)", department: "dermatology", experience: "13 years", fee: 2500, availability: "Mon–Sat · 11AM–7PM", bio: "Medical and cosmetic dermatology, laser specialist.", languages: ["English","Urdu"], photo: m(1) },
  { id: "D012", name: "Dr. Mahnoor Khan", qualification: "MBBS, MD (Derma)", department: "dermatology", experience: "7 years", fee: 2000, availability: "Tue–Sat · 3PM–8PM", bio: "Aesthetic dermatology and hair restoration.", languages: ["English","Urdu"], photo: f(1) },

  { id: "D013", name: "Dr. Faisal Mirza", qualification: "MBBS, FCPS (ENT)", department: "ent", experience: "16 years", fee: 2200, availability: "Mon–Sat · 9AM–4PM", bio: "Endoscopic sinus and ear microsurgery.", languages: ["English","Urdu"], photo: m(2) },
  { id: "D014", name: "Dr. Adeel Shah", qualification: "MBBS, MS (ENT)", department: "ent", experience: "9 years", fee: 1800, availability: "Mon–Fri · 1PM–6PM", bio: "Pediatric ENT and audiology.", languages: ["English","Urdu"], photo: m(3) },

  { id: "D015", name: "Dr. Asma Bukhari", qualification: "MBBS, FCPS (Ophth)", department: "ophthalmology", experience: "14 years", fee: 2500, availability: "Mon–Sat · 10AM–5PM", bio: "Phaco cataract and refractive surgery.", languages: ["English","Urdu"], photo: f(2) },
  { id: "D016", name: "Dr. Zain Abbas", qualification: "MBBS, MS (Ophth)", department: "ophthalmology", experience: "10 years", fee: 2200, availability: "Mon–Fri · 2PM–7PM", bio: "Vitreo-retinal surgery and diabetic eye care.", languages: ["English","Urdu"], photo: m(0) },

  { id: "D017", name: "Dr. Ali Raza", qualification: "BDS, FCPS (Dental)", department: "dentistry", experience: "12 years", fee: 1500, availability: "Mon–Sat · 11AM–8PM", bio: "Dental implants and aesthetic dentistry.", languages: ["English","Urdu"], photo: m(1) },
  { id: "D018", name: "Dr. Maryam Iqbal", qualification: "BDS, MSc Ortho", department: "dentistry", experience: "8 years", fee: 1500, availability: "Mon–Fri · 12PM–7PM", bio: "Orthodontics and pediatric dentistry.", languages: ["English","Urdu"], photo: f(3) },

  { id: "D019", name: "Dr. Hassan Siddiqui", qualification: "MBBS, FCPS (Surg)", department: "general-surgery", experience: "19 years", fee: 2800, availability: "Mon–Sat · 9AM–3PM", bio: "Senior laparoscopic and general surgeon.", languages: ["English","Urdu"], photo: m(2) },
  { id: "D020", name: "Dr. Nida Rahman", qualification: "MBBS, MS (Surg)", department: "general-surgery", experience: "10 years", fee: 2200, availability: "Mon–Fri · 1PM–6PM", bio: "Breast & endocrine surgery specialist.", languages: ["English","Urdu"], photo: f(0) },
];

export const FACILITIES = [
  { name: "ICU", desc: "24/7 critical care with advanced monitoring." },
  { name: "Operation Theaters", desc: "Modular OTs with HEPA filtration." },
  { name: "Laboratory", desc: "Fully automated diagnostic lab." },
  { name: "Emergency Ward", desc: "Round-the-clock emergency response." },
  { name: "Pharmacy", desc: "In-house 24/7 pharmacy." },
  { name: "Ambulance", desc: "ALS & BLS ambulance fleet." },
  { name: "Blood Bank", desc: "Licensed blood bank with screening." },
  { name: "Private Rooms", desc: "Comfortable patient suites." },
];

export const STATS = [
  { label: "Expert Doctors", value: "20+" },
  { label: "Departments", value: "10" },
  { label: "Beds", value: "120" },
  { label: "Emergency", value: "24/7" },
  { label: "Patients Treated", value: "15,000+" },
];

export const TESTIMONIALS = [
  { name: "Ahmed K.", rating: 5, comment: "Exceptional care from the cardiology team. Highly recommend BKBH." },
  { name: "Fareeha S.", rating: 5, comment: "The maternity ward was clean, calm and the staff was wonderful." },
  { name: "Bilal M.", rating: 4, comment: "Quick emergency response — they truly saved my father's life." },
  { name: "Hina R.", rating: 5, comment: "Dr. Imran is an amazing pediatrician. My kids love coming here!" },
];

export const NEWS = [
  { title: "New 3T MRI Installed", date: "2026-05-12", excerpt: "BKBH upgrades imaging with a state-of-the-art 3T MRI scanner." },
  { title: "Free Cardiac Camp", date: "2026-06-02", excerpt: "Free ECG and consultation for senior citizens this Sunday." },
  { title: "Hospital Wins Excellence Award", date: "2026-04-18", excerpt: "Awarded 'Best Private Hospital — Balochistan 2026'." },
];

export const LAB_TESTS = [
  { name: "Complete Blood Count (CBC)", price: 800, prep: "No fasting required", home: true },
  { name: "Lipid Profile", price: 1800, prep: "12-hour fasting", home: true },
  { name: "HbA1c (Diabetes)", price: 2000, prep: "No fasting", home: true },
  { name: "Thyroid Profile (T3/T4/TSH)", price: 2500, prep: "Morning sample preferred", home: true },
  { name: "Liver Function Test", price: 2200, prep: "8-hour fasting", home: true },
  { name: "Kidney Function Test", price: 2200, prep: "No fasting", home: true },
  { name: "Vitamin D", price: 3500, prep: "No fasting", home: true },
  { name: "COVID-19 PCR", price: 4500, prep: "Nasal swab", home: false },
  { name: "Urine R/E", price: 500, prep: "Mid-stream sample", home: false },
  { name: "ECG", price: 1000, prep: "Onsite only", home: false },
];

export const PACKAGES = [
  { name: "Basic Wellness", price: 4500, includes: ["CBC","Urine R/E","Blood Sugar","Blood Pressure"], benefits: ["Free consultation","Digital report"] },
  { name: "Heart Health", price: 9500, includes: ["ECG","Echo","Lipid Profile","Cardiologist Consult"], benefits: ["Diet plan","Follow-up call"] },
  { name: "Diabetes Care", price: 6500, includes: ["HbA1c","Fasting Sugar","KFT","Endocrinologist Consult"], benefits: ["Diet plan","3-month follow-up"] },
  { name: "Women's Wellness", price: 8500, includes: ["CBC","Thyroid","Pap Smear","Ultrasound"], benefits: ["Gynae consult","Bone density screening"] },
  { name: "Senior Citizen", price: 12500, includes: ["Full Body Profile","ECG","X-Ray","Eye + Dental"], benefits: ["Home sample","Priority OPD"] },
  { name: "Executive Health", price: 18500, includes: ["50+ Tests","Cardiac Screening","Cancer Markers","Specialist Consults"], benefits: ["Personal coordinator","Annual follow-up"] },
];

export const FAQS = [
  { q: "How do I book an appointment?", a: "Use the Book Appointment page, fill the form and you'll receive a confirmation email with a PDF slip and QR code." },
  { q: "Is emergency service available 24/7?", a: "Yes. Our emergency ward and ambulance service operate 24/7." },
  { q: "Can I download my lab reports online?", a: "Yes. Visit the Patient Portal and search by CNIC or Appointment ID." },
  { q: "Do you accept insurance?", a: "We work with most major insurance providers in Pakistan. Please contact the front desk for details." },
  { q: "What are your visiting hours?", a: "General visiting hours are 4:00 PM to 8:00 PM daily." },
  { q: "How do I apply for a job?", a: "Visit the Careers page and submit your application with your resume." },
];

export const GALLERY = [
  { cat: "Hospital Building", url: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=900&q=80" },
  { cat: "Hospital Building", url: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=900&q=80" },
  { cat: "ICU", url: "https://images.unsplash.com/photo-1551601651-bc60f254d532?w=900&q=80" },
  { cat: "ICU", url: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=900&q=80" },
  { cat: "Laboratory", url: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=900&q=80" },
  { cat: "Laboratory", url: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=900&q=80" },
  { cat: "Operation Theater", url: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=900&q=80" },
  { cat: "Operation Theater", url: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=900&q=80" },
  { cat: "Doctors", url: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=900&q=80" },
  { cat: "Doctors", url: "https://images.unsplash.com/photo-1638202993928-7267aad84c31?w=900&q=80" },
  { cat: "Pharmacy", url: "https://images.unsplash.com/photo-1576602975754-7423ddf1f5cf?w=900&q=80" },
  { cat: "Wards", url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=900&q=80" },
  { cat: "Emergency", url: "https://images.unsplash.com/photo-1612277795421-9bc7706a4a34?w=900&q=80" },
];
