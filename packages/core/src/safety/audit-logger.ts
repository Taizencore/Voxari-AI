import { supabase } from '../database/client.js';
export class AuditLogger {
  async log(action: string, details: any) {
    await supabase.from('audit_logs').insert({ action, details });
  }
}
