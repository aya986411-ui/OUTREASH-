export interface Lead {
  id: string;
  full_name: string;
  company_name: string;
  job_title: string;
  email: string;
  linkedin_url?: string;
  status: 'new' | 'contacted' | 'replied' | 'qualified' | 'lost';
  trigger_type: 'job_posting' | 'role_change' | 'funding' | 'manual';
  trigger_date: string;
  pain_points?: string[];
  company_size?: string;
  industry?: string;
}

export interface Campaign {
  id: string;
  name: string;
  target_audience: string;
  status: 'active' | 'paused' | 'draft';
  sent: number;
  replied: number;
  open_rate: number;
}

export interface GeneratedMessage {
  subject: string;
  body: string;
  tone: string;
  analysis: string;
}

export interface ChartData {
  name: string;
  value: number;
  value2?: number;
}
