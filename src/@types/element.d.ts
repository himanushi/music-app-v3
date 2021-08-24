interface Element {
  content: string;
  getScrollElement(): Promise<HTMLElement>;
  present: () => void;
  dismiss: () => void;
  component: string;
  cssClass: string;
}
