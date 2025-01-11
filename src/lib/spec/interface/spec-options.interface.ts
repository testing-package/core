export interface SpecOptions {
  category?: string;
  describe?: { id: number, description: string };
  log?: boolean;
  priority?: number;
  tag?: {[index: string]: string};
  template? : 'auto' | 'manual' |  'off';
  timeout?: number;
}
