/**
 * Project Lotus - GDrive Integration Service
 * 
 * This service handles indexing and streaming assets from the 2TB Google Drive.
 * Implementation Note: Requires valid OAuth2 credentials to be set in environment.
 */

export interface LotusAsset {
  id: string;
  name: string;
  type: 'video' | 'pcap' | 'pdf';
  url: string;
  description: string;
}

export const gdriveService = {
  /**
   * Fetches assets for a specific module (e.g., 'labs', 'os').
   * Mocks data if credentials are not present.
   */
  async getAssets(category: string): Promise<LotusAsset[]> {
    console.info(`[GDrive] Fetching assets for category: ${category}`);
    
    // Placeholder logic for future API integration
    // const response = await fetch(`https://www.googleapis.com/drive/v3/files?q=name contains '${category}'`);
    
    const mockAssets: Record<string, LotusAsset[]> = {
      'labs': [
        { 
          id: '1', 
          name: 'Wireshark: Analyzing the Handshake', 
          type: 'video', 
          url: 'https://placeholder.com/handshake.mp4',
          description: 'A deep dive into TCP handshakes using real packet captures.'
        },
        {
          id: '2',
          name: 'vulnerable_sample.pcap',
          type: 'pcap',
          url: 'https://placeholder.com/sample.pcap',
          description: 'Raw capture file for use in Lab 1.'
        }
      ]
    };

    return mockAssets[category] || [];
  }
};
