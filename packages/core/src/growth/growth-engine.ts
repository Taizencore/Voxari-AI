// @ts-ignore
import GoogleSearchResults from 'google-search-results-nodejs';
import * as cheerio from 'cheerio';
import axios from 'axios';

export interface Lead {
  name: string;
  website?: string;
  phone?: string;
  email?: string;
  source: string;
  score?: number;
}

export class GrowthEngine {
  private serpKey: string;
  constructor(serpKey: string) { this.serpKey = serpKey; }

  async searchLeads(query: string): Promise<Lead[]> {
    // @ts-ignore
    const search = new GoogleSearchResults.GoogleSearchResults(this.serpKey);
    return new Promise((resolve, reject) => {
      search.json({ q: query, tbm: 'lcl' }, (data: any) => {
        if (data.error) return reject(data.error);
        const results = data.local_results || [];
        resolve(results.map((r: any) => ({
          name: r.title, website: r.website, phone: r.phone, source: 'google_local'
        })));
      });
    });
  }

  async scoreLead(lead: Lead): Promise<number> {
    let score = 0;
    if (lead.website) score += 50;
    if (lead.phone) score += 50;
    return score;
  }
}
