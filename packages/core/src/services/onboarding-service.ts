import { supabase } from '../database/client.js';
import { Workspace } from '../types/index.js';

export class OnboardingService {
  async provisionWorkspace(data: Partial<Workspace>) {
    const { data: workspace, error } = await supabase
      .from('workspaces')
      .insert({ ...data, settings: { onboarded: true } })
      .select().single();
    if (error) throw error;
    return workspace;
  }
}
