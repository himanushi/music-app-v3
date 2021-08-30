interface Element {
  content: string;
  getScrollElement(): Promise<HTMLElement>;
  present: () => void;
  dismiss: () => void;
  cssClass: string;
}

interface EventTarget {
  value: any;
  checked: boolean;
}
