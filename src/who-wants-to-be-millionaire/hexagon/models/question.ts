export interface Question {
  id: string;
  label: string;
  answers: Record<string, string>;
}
