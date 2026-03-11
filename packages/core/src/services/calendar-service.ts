export interface CalendarEvent { title: string; start: Date; end: Date; }
export class GoogleCalendarService {
  async listSlots() { return []; }
  async bookSlot(event: CalendarEvent) { return true; }
}
