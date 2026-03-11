export class SafetyLayer {
  private emergencyKeywords = ['heart attack', 'emergency', 'stroke', 'dying', 'suicide', 'ambulance'];
  private medicalAdviceKeywords = ['diagnosis', 'prescribe', 'cure', 'medical advice', 'dosage'];

  checkEmergency(text: string): boolean {
    return this.emergencyKeywords.some(keyword => text.toLowerCase().includes(keyword));
  }

  redactPHI(text: string): string {
    return text
      .replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[EMAIL_REDACTED]')
      .replace(/\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g, '[PHONE_REDACTED]');
  }

  detectMedicalAdviceRequest(text: string): boolean {
    return this.medicalAdviceKeywords.some(keyword => text.toLowerCase().includes(keyword));
  }
}
