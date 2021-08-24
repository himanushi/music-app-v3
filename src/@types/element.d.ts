interface Element {
  content: string;
  getScrollElement(): Promise<HTMLElement>;
  present: () => void;
}
